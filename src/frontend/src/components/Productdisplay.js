import React, { useContext } from 'react'
import "./styles/Productdisplaystyles.css"
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { ShopContext } from './Context/ShopContext';
import missimg from "./Assert/missing_s.png"

const Productdisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
  const [sp, setSp] = useSearchParams();
  const wuser = sp.get('user');
  const navigate=useNavigate();
  var image=(product.img!="L" ? product.img : missimg);
  return (
    <div className='productdisplay'>

        <div className='productdisplay-left'>
            <div className='productdisplay-img'>
                <img className="productdisplay-main-img" src = {image} alt=""/>
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
                 <Link to={"/account?user="+wuser+"&profile="+product.seller} className='text-black'>{product.seller} </Link> 
            </div>
            <button onClick={()=>{navigate("/chat?user=null&other="+product.seller)}}>Chat with seller</button>
        </div>
    </div>
  )
}

export default Productdisplay
