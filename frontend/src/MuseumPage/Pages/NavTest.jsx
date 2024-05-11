import React from 'react';
import './NavTest.css'; // Make sure to import your CSS file
import Logo from '../assets/images/Logo_Artifex.svg';
import Heart from '../assets/images/HEART.svg';
import { Link } from "react-router-dom";
const NavTest = () => {
    return (
        <header className="header">
            <div className="header-content">
            <Link to="/"><img className="logo" src={Logo} alt="logo" /></Link>
                <div className="search-container">
                    <select className="search-category">
                        <option>All categories</option>
                    </select>
                    
                    
                </div>
             
                <nav className="navigation">
                    <ul>
                        <li><a href="#">User</a></li>
                        <li><a href="#">Favorites</a></li>
                        <li><a href="#">Cart</a></li>
                    </ul>
                </nav>
                <div className="cart-info">
                  
                </div>
            </div>
        </header>
    );
};

export default NavTest;
