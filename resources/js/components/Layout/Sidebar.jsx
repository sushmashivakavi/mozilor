import React from 'react';
import { useLocation } from 'react-router-dom';

const Sidebar = ({ links = [] }) => {
    const location = useLocation();

    return (
        <div className="bg-primary text-white p-3" style={{ width: '250px', minHeight: '100vh' }}>
            <ul className="nav flex-column">
                {links.map((link, index) => (
                    <li className="nav-item" key={index}>
                        <a
                            href={link.href}
                            className={`nav-link text-white ${location.pathname === link.href ? 'active bg-light-blue' : ''}`}
                        >
                            <i className={`bi ${link.icon} me-2`}></i>
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
