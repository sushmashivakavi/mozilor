import React, { useEffect, useState } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [csvFile, setCsvFile] = useState(null);
    const [errors, setErrors] = useState([]); // To store row-specific errors

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                alert('Failed to fetch products.');
            }
        } catch (err) {
            alert('Error occurred while fetching products.');
        }
    };

    useEffect(() => {
        fetchProducts(); // Fetch products on initial render
    }, []);

    const handleFileChange = (e) => {
        setCsvFile(e.target.files[0]);
        setErrors([]); // Clear previous errors when a new file is selected
    };

    const handleFileUpload = async () => {
        if (!csvFile) {
            alert('Please select a CSV file first.');
            return;
        }
    
        const formData = new FormData();
        formData.append('file', csvFile);
    
        try {
            const response = await fetch('/api/import-products', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });
    
            const result = await response.json();
    
            if (response.ok) {
                alert(result.message);
                await fetchProducts(); // Refresh the product list
                setCsvFile(null); // Clear the state
                document.getElementById('file-input').value = ''; // Clear the file input
            } else if (response.status === 422) {
                // Validation errors
                setErrors(result.errors);
                alert(result.message); // "Some rows have validation errors. No data was inserted."
            } else {
                alert('Failed to import products. Please try again.');
            }
        } catch (err) {
            alert('Error occurred while uploading the file.');
        }
    };
    

    const downloadSampleCSV = () => {
        const csvContent = [
            ['product_name', 'price', 'sku', 'description'], // CSV headers
            ['Sample Product', '10.99', 'SKU001', 'This is a sample product description'], // Example row
        ]
            .map((row) => row.join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sample_products.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <h2>Product List</h2>
            <div className="mb-3">
                <button className="btn btn-success me-2" onClick={downloadSampleCSV}>
                    Download Sample CSV
                </button>
                <input type="file" accept=".csv" onChange={handleFileChange} />
                <button className="btn btn-primary ms-2" onClick={handleFileUpload}>
                    Upload CSV
                </button>
            </div>

            {/* Validation Errors Display */}
            {errors.length > 0 && (
                <div className="alert alert-danger">
                    <h5>Validation Errors</h5>
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>
                                Row: {JSON.stringify(error.row)} - Errors: {error.errors.join(', ')}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="card shadow">
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>SKU</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product, index) => (
                                    <tr key={product.id}>
                                        <td>{index + 1}</td>
                                        <td>{product.product_name}</td>
                                        <td>${product.price.toFixed(2)}</td>
                                        <td>{product.sku}</td>
                                        <td>{product.description}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No products available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
