import React from 'react'
import "./styles/Footerstyles.css"
import { NavLink } from 'react-router-dom'
const Footer = () => {
  return (
    <footer class="section-p1">
    <div class="col">
        <h4><strong style= {{color: "#ffffff", paddingBottom: "0px"}}>Contact</strong></h4>
       <h4><strong style =  {{color: "#ffffff", paddingBottom: "0px"}}> Email: neomarketapp@gmail.com</strong> </h4>
        
    </div>
 

    <div class="col">
        <h4><strong style = {{color: "#ffffff", paddingBottom: "0px"}}>My Account</strong></h4>
        <NavLink to="/anunt"><strong style = {{color: "#ffffff", paddingBottom: "0px"}}>Publica anunt</strong></NavLink>
    </div>
    
</footer>
  )
}

export default Footer;
