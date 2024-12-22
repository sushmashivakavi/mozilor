# **Product Management App**

This full-stack web application was built with **Laravel** (backend) and **React** (frontend). The application allows users to sign up, log in, manage products, and view analytics like product count on the dashboard. Users can also import products via a CSV file and download a sample CSV template.

---

## **Features**

### **1. User Authentication**

-   **Sign Up**: Users can create an account.
-   **Log In**: Users can log in to access the app.
-   **Protected Routes**: Users must be logged in to access the dashboard and product list.

### **2. Dashboard**

-   Displays a personalized **welcome message** with the user's name.
-   Includes a **product count widget** to show the total number of products.

### **3. Product Management**

-   **Product List**: Displays all products in a tabular format.
-   **CSV Import**: Users can upload a CSV file to bulk import products.
-   **Sample CSV Download**: A sample CSV file is available for download to ensure the correct format.

### **4. API-Driven**

-   All functionalities (authentication, product management) are implemented using RESTful APIs.

---

## **Tech Stack**

### **Frontend**

-   **React.js**
    -   React Router for routing.
    -   Bootstrap for styling.
-   **Fetch API** for AJAX requests.

### **Backend**

-   **Laravel**
    -   Sanctum for authentication.
    -   RESTful API structure.
    -   Validation and error handling for CSV imports.

### **Database**

-   **MySQL** for storing user and product data.

---

## **Installation**

### 1. Prerequisites\*\*

-   PHP 7.4 or higher
-   Composer
-   Node.js and npm
-   MySQL

### 2. Backend Setup (Laravel)\*\*

Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

### 3. Set up environment variables:

-   Create a .env file by copying .env.example:

```bash
cp .env.example .env
```

-   Update database credentials in .env:

```php
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mozilor
DB_USERNAME=root
DB_PASSWORD=password
```

### 4. Generate the application key:

```bash
php artisan key:generate
```

### 5. Run migrations:

```bash
php artisan migrate
```

### 6. Start the server:

```bash
php artisan serve
```

## Frontend Setup (React)

-   Navigate to the frontend folder:

```bash
cd resources/js
```

-   Install dependencies:

```bash
npm install
```

-   Build assets for development:

```bash
npm run dev
```

-   For production, build the assets:

```bash
npm run build
```

## Usage

1. Sign Up

-   Open the app in your browser: http://127.0.0.1:8000.
-   Create a new account using the Sign Up page.

2. Log In

-   Use your credentials to log in.
-   Once logged in, you will be redirected to the Dashboard.

3. Dashboard

-   View the total number of products in the Product Count Widget.

4. Product List

-   Navigate to the Product List page to view all products in a tabular format.

5. Import Products

-   Click the "Download Sample CSV" button to download the template.
-   Upload your CSV file to bulk import products.

## API Endpoints

### Authentication

-   POST /api/register: Register a new user.
-   POST /api/login: Log in with email and password.

### Products

-   GET /api/products: Fetch all products.
-   GET /api/products/count: Fetch the total number of products.
-   POST /api/products/import: Import products from a CSV file.

### CSV Format

#### Headers

-   The CSV file should have the following headers:

```bash
product_name,price,sku,description
```

-   Example

```bash
product_name,price,sku,description
Sample Product,10.99,SKU001,This is a sample product.
Another Product,20.50,SKU002,Another product description.
```

## Error Handling

### Backend Validation

-   CSV import validates each row:
    -   product_name: Required, string, max 255 characters.
    -   price: Required, numeric, non-negative.
    -   sku: Required, string, max 50 characters, must be unique.
    -   description: Optional, max 1000 characters.
-   Frontend Validation
    -   Displays error messages for invalid CSV rows.
    -   Alerts users about API failures.
