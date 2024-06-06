import React, { useContext, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';
import { ShopContext } from './Context/ShopContext';
import Productdisplay from './Productdisplay';
import Footer from "./Footer"
import NavBar from "./Header"
import Comment from "./Comment/Comments"



async function getItems(pId){
    let host = window.location.hostname;
    let apiUrl = "https://" + host + ":8443/api/fetch_spec_prod?category=";
    let split = pId.split('+');
    apiUrl += split[0] + "&code=" + split[1];
    console.log(apiUrl);
    var api_data;
    var data;
    api_data = await fetch(apiUrl).catch(function(err){console.log(err);});
    if(!api_data){
        return false;
    }
    data= await api_data.json().catch(function(err){console.log(err);return false;});
    if(!data){
        return false;
    }
    console.log(data);
    return data;
}

const Product = () => {
    
    const {all_product}= useContext(ShopContext);
    const {productId} = useParams();
    const [product, setProduct] = useState('');
    useEffect(() => {getItems(productId).then(
      data => setProduct(data));
    }, []);//all_product[Number(productId)-1];//.find((e)=> e.id === Number(productId));
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
