<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    // List all products for the authenticated user
    public function index()
    {
        $products = Products::where('user_id', auth()->id())->get();
        return response()->json($products, 200);
    }

    // Import products from CSV
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:csv,txt|max:2048',
        ]);

        try {
            $file = $request->file('file');
            $handle = fopen($file, 'r');
            $header = true;
            $data = [];
            $errors = []; 

            while (($row = fgetcsv($handle, 1000, ',')) !== false) {
                if ($header) {
                    $header = false;
                    continue;
                }

                $rowData = [
                    'product_name' => $row[0] ?? null,
                    'price' => $row[1] ?? null,
                    'sku' => $row[2] ?? null,
                    'description' => $row[3] ?? null,
                ];

                $validator = Validator::make($rowData, [
                    'product_name' => 'required|string|max:255',
                    'price' => 'required|numeric|min:0',
                    'sku' => 'required|string|max:50|unique:products,sku',
                    'description' => 'nullable|string|max:1000',
                ]);

                if ($validator->fails()) {
                    // Collect errors for this row
                    $errors[] = [
                        'row' => $rowData,
                        'errors' => $validator->errors()->all(),
                    ];
                } else {
                    // Add valid rows to the data array
                    $data[] = array_merge($rowData, ['user_id' => auth()->id()]);
                }
            }

            fclose($handle);

            if (!empty($errors)) {
                return response()->json([
                    'message' => 'Some rows have validation errors. No data was inserted.',
                    'errors' => $errors,
                ], 422);
            }

            DB::beginTransaction();
            Products::insert($data);
            DB::commit();

            return response()->json(['message' => 'All products imported successfully'], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'An unexpected error occurred during the import process.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function count()
    {
        $count = Products::where('user_id', auth()->id())->count();
        return response()->json(['count' => $count]);
    }
}
