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
                        <li><NavLink to="/cart"><strong style={{fontFamily: "Sans", color:"#ffffff"}}><b>Cart</b></strong></NavLink></li>
                        <li><NavLink to="/anunt"><i className="fas fa-plus" style={{color:"#ffffff"}}></i></NavLink></li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Header;
