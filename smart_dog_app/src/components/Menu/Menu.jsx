import React from 'react';
import Menu from './Menu.css';


const menubar = props => (
    <header className = "menubar">
        <nav className = "menu_nav">
            <div></div>
            <div className = "menu_logo"><a href="/">SmartDog</a></div>
            <div className = "menu_nav_items">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">About</a></li>
                    <li><a href="/">Product</a></li>
                    <li><a href="/">Contact</a></li>
                    <li><a href="/">Log In</a></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default menubar;