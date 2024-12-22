import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null); 
    const { setUser } = useContext(UserContext); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({ name: data.user.name }));
                setUser({ name: data.user.name });
                navigate('/dashboard');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="text-center mb-4">Login</h3>
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>} {/* Show errors if any */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <p className="text-center mt-3">
                    Don't have an account? <a href="/signup" className="text-primary">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
