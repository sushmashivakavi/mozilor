import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Topbar = ({ title = 'Dashboard', handleLogout }) => {
    const { user } = useContext(UserContext);
    const getUserInitials = (name) => {
        if (!name) return 'U';
        const initials = name
            .split(' ')
            .map((word) => word[0]?.toUpperCase())
            .join('');
        return initials;
    };

    return (
        <div className="bg-white shadow d-flex justify-content-between align-items-center px-4 py-2">
            <h4 className="mb-0">Mozilor</h4>
            <div className="dropdown">
                <button
                    className="btn btn-secondary rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '40px', height: '40px' }}
                    type="button"
                    id="userMenu"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {getUserInitials(user?.name)}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                    <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Topbar;
