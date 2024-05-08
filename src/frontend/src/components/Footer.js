import React from 'react'
import "./styles/Footerstyles.css"
import { NavLink } from 'react-router-dom'
const Footer = () => {
  return (
    <footer class="section-p1">
    <div class="col">
        <h4><strong>Contact</strong></h4>
       <p> Email: neomarketapp@gmail.com </p>
        
    </div>
 

    <div class="col">
        <h4>My Account</h4>
        <NavLink to="/anunt">Publica anunt</NavLink>
    </div>
    
</footer>
  )
}

export default Footer;