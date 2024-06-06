import "./styles/HomeStyles.css";
import {FaSearch} from "react-icons/fa"
import { useState, useEffect } from 'react';
import Item from "./Item"
import React, { createContext } from 'react';
import { renderToString } from 'react-dom/server';

let host = window.location.hostname;
let apiUrl = "https://" + host + ":8443/api/fetch_prods_from_cat?category=";
async function getItems(cats){
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
                data_products.push(item);
            })
    }
    return data_products;
}

function Home() {
    const [plist, setPlist] = useState([]);
    const updateSearch = () => {
        var optiuni = document.getElementsByName('categ');
        var categoriiVec=["test"];
        for (var i=0; i<optiuni.length; i++) {
            if(optiuni[i].checked) categoriiVec.push(optiuni[i].value);
        }
        getItems(categoriiVec).then(
        data => setPlist(data));
    }
  useEffect(() => {
    getItems(["test"]).then(
    data => setPlist(data));
  }, []);
  
  return (
    <>
     <div className="search-bar-container">
        <div className="input-wrapper">
          <FaSearch id="search-icon" />
          <input placeholder="Type to search..." id="searchText" />
        <input className="chck" name="categ" value="Haine" type="checkbox" id="chkHaine"/>
        <label for="iHaine">Haine</label>
        <input className="chck" name="categ" value="Electronice" type="checkbox" id="chkHaine"/>
        <label for="iElectronice">Electronice</label>
        <input className="chck" name="categ" value="Mobila" type="checkbox"/>
        <label for="iMobila">Mobila</label>
          
        <input type="button" value="Search" onClick={updateSearch} style={{width:"10%", paddingTop: "5px", marginRight:"0px", marginLeft: "10%", fontFamily:"sans", fontSize: "20px"}}/>
    </div>
        
      </div>
    

     <div className="popular" id="produse">
            {plist.map((item,i)=> <Item key={i} id={item.id} title={item.title} image={item.image} price={item.price} link={item.id}/>)}
      </div>
    </>
  );
}

export default Home;
