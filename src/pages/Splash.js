import React from "react";
import logo from "../components/SplashCover.png";
import { Link } from "react-router-dom";
import '../components/Style.css'; 



function Splash() {
    return (
        <div className="splash-container">
            <header>
                <img src={logo} className="splash-logo" alt="logo" />
                <h1 className="splash-title">SmoothShop</h1>
            </header>
            <Link to="/shop">
                <button className="centered-button">SHOP</button>
            </Link>
            
        </div>
    );
}

export default Splash;