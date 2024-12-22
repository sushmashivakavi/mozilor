import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const links = [
        { href: '/dashboard', label: 'Dashboard', icon: 'bi-list' },
        { href: '/products', label: 'Product List', icon: 'bi-list' },
    ];

    return (
        <div className="d-flex vh-100 flex-column">
            <Topbar title="Dashboard" handleLogout={handleLogout} />
            <div className="d-flex flex-grow-1">
                <Sidebar links={links} />
                <div className="flex-grow-1 p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
