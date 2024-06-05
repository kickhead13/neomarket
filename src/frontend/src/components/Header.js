import { Component } from "react";
import { NavLink } from 'react-router-dom';
import "./styles/Headerstyles.css";
import nmimg from "./Assert/neomarket.jpg"

function Header() {
    return (
        <>
            <nav >
                <NavLink to="/layout" className="text-black">
                  <img src={nmimg} width="200"/>
                </NavLink>
                <div>
                    <ul id="navbar">
                        <li><NavLink to="/cart">Cart</NavLink></li>
                        <li><NavLink to="/anunt"><i className="fas fa-plus"></i></NavLink></li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Header;
