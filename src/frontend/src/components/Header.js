import { Component } from "react";
import { NavLink } from 'react-router-dom';
import "./styles/Headerstyles.css";

function Header() {
    return (
        <>
            <nav >
                <NavLink to="/layout" className="text-black">
                    NeoMarket.
                </NavLink>
                <div>
                    <ul id="navbar">
                        <li><NavLink to="/layout/cart">Cart</NavLink></li>
                        <li><NavLink to="/anunt"><i className="fas fa-plus"></i></NavLink></li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Header;
