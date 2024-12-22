import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { UserProvider } from './context/UserContext';


const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<UserProvider>
    <App />
    </UserProvider>);
