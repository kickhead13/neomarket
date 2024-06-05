import React from 'react'
import Footer from "./Footer"
import "./styles/Cartstyles.css"
import CartItems from './CartItems/CartItems'
import Header from "./Header"
const Cart = () => {
  return (
    <>
    <Header />
    <CartItems/>
    <Footer />
    </>
  )
}

export default Cart