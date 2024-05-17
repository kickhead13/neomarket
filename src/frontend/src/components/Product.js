import React, { useContext } from 'react'

import { useParams } from 'react-router-dom';
import { ShopContext } from './Context/ShopContext';
import Productdisplay from './Productdisplay';
import Footer from "./Footer"

const Product = () => {

  const {all_product}= useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e)=> e.id === Number(productId));
    
  return (
    <>
    <div>
      <Productdisplay product={product} />
      <Footer />
    </div>
    </>
  )
}

export default Product
