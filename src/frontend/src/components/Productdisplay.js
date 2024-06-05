import React, { useContext } from 'react'
import "./styles/Productdisplaystyles.css"
import { Link, useSearchParams } from 'react-router-dom'
import { ShopContext } from './Context/ShopContext';

const Productdisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
  const [sp, setSp] = useSearchParams();
  const wuser = sp.get('user');
  return (
    <div className='productdisplay'>

        <div className='productdisplay-left'>
            <div className='productdisplay-img'>
                <img className="productdisplay-main-img" src = {product.image} alt=""/>
            </div>
        </div>

        <div className='productdisplay-right'>
            <h1>{product.title}</h1>
             <div className='productdisplay-right-price'>
               {product.price} RON 
            </div>
            <div className='productdisplay-right-description'>
                {product.description}
            </div>
            <div className='productdisplay-right-seller'>
                 <Link to={"/account?user="+wuser+"&profile="+product.seller_id} className='text-black'>{product.seller_id} </Link> 
            </div>
            <button onClick={()=>{addToCart(product.id)}}>Adauga in cos</button>
        </div>
    </div>
  )
}

export default Productdisplay
