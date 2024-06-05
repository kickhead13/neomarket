import React, { useContext } from 'react';
import "../styles/CartItemsstyles.css";
import { ShopContext } from "../Context/ShopContext";

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

    return (
        <>
            <div className='cartitems'>
                <div className='cartitems-format-main'>
                    <p>Products</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr />
                {all_product.map((e) => {
                    if (cartItems[e.id] > 0) {
                        return (
                            <div key={e.id}>
                                <div className='cartitems-format cartitems-format-main'>
                                    <img src={e.image} alt="" className='carticon-product-icon' />
                                    <p>{e.title}</p>
                                    <p>${e.price}</p>
                                    <button className='cartitems-quatity'>{cartItems[e.id]}</button>
                                    <p>{e.price * cartItems[e.id]} RON</p>
                                    <i className='fa fa-trash cartitems-remove-icon' onClick={() => { removeFromCart(e.id) }}> </i>
                                </div>
                                <hr />
                            </div>
                        )
                    }
                    return null;
                })}
                <div className='cartitems-down'>
                    <div className='cartitems-total'>
                        <h1>cart Totals</h1>
                        <div>
                            <div className='cartitems-total-item'>
                                <p>Subtotal</p>
                                <p>{getTotalCartAmount()} RON</p>
                            </div>
                            <hr />
                            <div className='cartitems-total-item'>
                                <p>Shipping Fee</p>
                                <p>Free</p>
                            </div>
                            <hr />
                            <div className='cartitems-total-item'>
                                <h3>Total</h3>
                                <h3>{getTotalCartAmount()} RON</h3>
                            </div>
                        </div>
                        <button>Cumpara</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItems;
