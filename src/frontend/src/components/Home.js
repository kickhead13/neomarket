import "./styles/HomeStyles.css";
import {FaSearch} from "react-icons/fa"
import { useState, useEffect } from 'react';
import Item from "./Item"
import React, { createContext } from 'react';
import { renderToString } from 'react-dom/server';
import missimg from "./Assert/missing_s.png"
const images = require.context('../../prod_images', true);
const imageList = images.keys().map(image => images(image));
let host = window.location.hostname;
let apiUrl = "https://" + host + ":8443/api/fetch_prods_from_cat?category=";
function getImage(name)
{
	const result = imageList.filter((img) => img.includes(name));
	return result[0];
}
async function getItems(cats, searchText){
    var data_products=[];
    var api_data;
    var data;
    for(var i = 0; i < cats.length; i++){
    let cat=cats[i];
    api_data = await fetch(apiUrl+cat).catch(function(err){console.log(err);});
    if(!api_data){
        return false;
    }
    data= await api_data.json().catch(function(err){console.log(err);return false;});
    if(!data){
        return false;
    }
    let products=data['list'];
    let productsSection=document.getElementById("produse");
    products.map((item,i)=>{
                if(item.img=="L")
                    item.img=missimg;
				else item.img=getImage(item.img);
                if(searchText==="" || item.title.toLowerCase().includes(searchText.toLowerCase()))
                    data_products.push(item);
            })
    }
    return data_products;
}

function Home() {
    const [plist, setPlist] = useState([]);
    const updateSearch = () => {
        var optiuni = document.getElementsByName('categ');
        var categoriiVec=[];
        for (var i=0; i<optiuni.length; i++) {
            if(optiuni[i].checked) categoriiVec.push(optiuni[i].value);
        }
        var searchText=document.getElementById("searchText").value;
        getItems(categoriiVec, searchText).then(
        data => setPlist(data));
    }
  useEffect(() => {
    getItems(["Haine", "Electronice", "Mobile"], "").then(
    data => setPlist(data));
  }, []);
  
  return (
    <>
     <div className="search-bar-container">
        <div className="input-wrapper">
          <FaSearch id="search-icon" />
          <input placeholder="Type to search..." id="searchText" />
        <input className="chck" name="categ" value="Haine" type="checkbox"/>
        <label for="iHaine">Haine</label>
        <input className="chck" name="categ" value="Electronice" type="checkbox"/>
        <label for="iElectronice">Electronice</label>
        <input className="chck" name="categ" value="Mobile" type="checkbox"/>
        <label for="iMobila">Mobila</label>
          
        <input type="button" value="Search" onClick={updateSearch} style={{width:"10%", paddingTop: "5px", marginRight:"0px", marginLeft: "10%", fontFamily:"sans", fontSize: "20px"}}/>
    </div>
        
      </div>
    

     <div className="popular" id="produse">
            {plist.map((item,i)=> <Item key={i} id={item.id} title={item.title} image={item.img} price={item.price} link={item.id}/>)}
      </div>
    </>
  );
}

export default Home;
