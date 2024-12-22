import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import ProductList from '../pages/ProductList';
import ProtectedRoute from './Auth/ProtectedRoute';
import Layout from './Layout/Layout';
import Dashboard from '../pages/Dashboard';

const App = () => {
    const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is logged in

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={isAuthenticated ? <Navigate to="/products" /> : <Navigate to="/login" />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="products" element={<ProductList />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
