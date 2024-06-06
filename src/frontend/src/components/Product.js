import React, { useContext } from 'react'

import { useParams } from 'react-router-dom';
import { ShopContext } from './Context/ShopContext';
import Productdisplay from './Productdisplay';
import Footer from "./Footer"
import NavBar from "./Header"
import Comment from "./Comment/Comments"
const Product = () => {

    const {all_product}= useContext(ShopContext);
    const {productId} = useParams();
    const product = all_product[Number(productId)-1];//.find((e)=> e.id === Number(productId));
    console.log(all_product[Number(productId)]);
  return (
    <>
    <NavBar/>
    <div>
      <Productdisplay product={product} />
      <Comment />
      <Footer />
    </div>
    </>
  )
}

export default Product
