import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className = "home-container">
            <div className="auth">
                <Link to = "/register" className="auth-btn">Register</Link>
                <Link to = "/login" className="auth-btn">Login</Link>
            </div>
        </div>
    )
};

export default HomePage;