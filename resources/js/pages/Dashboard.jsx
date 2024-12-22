import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [productCount, setProductCount] = useState(0); // State for product count
    const [userName, setUserName] = useState(''); // State for the user's name

    useEffect(() => {
        // Fetch product count
        const fetchProductCount = async () => {
            try {
                const response = await fetch('/api/products/count', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProductCount(data.count); // Assuming API returns { count: 10 }
                } else {
                    alert('Failed to fetch product count.');
                }
            } catch (err) {
                alert('Error occurred while fetching product count.');
            }
        };

        // Fetch user name
        const fetchUserName = () => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser?.name) {
                setUserName(storedUser.name);
            }
        };

        fetchProductCount();
        fetchUserName();
    }, []);

    return (
        <div className="container mt-4">
            {/* Welcome Title */}
            <div className="mb-4">
                <h2>Welcome, {userName}!</h2>
                <p className="text-secondary">Here is an overview of your products.</p>
            </div>

            {/* Product Count Widget */}
            <div className="card shadow-sm">
                <div className="card-body d-flex align-items-center">
                    <div className="me-3">
                        <i className="bi bi-box-seam" style={{ fontSize: '2rem', color: '#007bff' }}></i>
                    </div>
                    <div>
                        <h5 className="card-title">Total Products</h5>
                        <p className="card-text fs-4 fw-bold">{productCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
