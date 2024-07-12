import React from 'react'
import Footer from "./Footer"
import "./styles/Cartstyles.css"
import CartItems from './CartItems/CartItems'
import Header from "./Header"
import "./styles/Productdisplaystyles.css"
import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"

const Cart = () => {
  const [email, setEmail] = useState('');
const [address, setAddress] = useState('');
const [card, setCard] = useState('');
  const [iban, setIban] = useState('');
  let host = window.location.hostname;
  const navigate = useNavigate();
  async function trySend() {
    let url2 = "https://" + host + ":8443/api/spec_email?email="+email+"&code=Your order has been confirmed";
    const resp2 = await fetch(url2).catch(function(err){console.log(err);return false;});
    navigate('/layout');
  }

  return (
    <>
    <Header />
    <div className='label-input-container' style={{paddingLeft: "40%", paddingTop: "10%"}}>
            
      <input type="text" placeholder="Card Number" id="card" value={card} onChange={(e) => setCard(e.target.value)} name="anunt" />
    </div>
    <div className='label-input-container' style={{paddingLeft: "40%"}}>
            
      <input type="text" placeholder="IBAN" id="iban" value={iban} onChange={(e) => setIban(e.target.value)} name="anunt" />
    </div>
    <div className='label-input-container' style={{paddingLeft: "40%"}}>
            
      <input type="text" placeholder="Full Address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} name="anunt" />
    </div>
    <div className='label-input-container' style={{paddingLeft: "40%"}}>
            
      <input type="text" placeholder="Contact E-mail" id="address" value={email} onChange={(e) => setEmail(e.target.value)} name="anunt" />
    </div>
    <button style={{marginLeft: '48%', marginBottom: '50px'}} onClick={trySend}>Confirm</button>
    <Footer />
    </>
  )
}

export default Cart
