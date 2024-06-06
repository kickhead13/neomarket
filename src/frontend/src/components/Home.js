import "./styles/HomeStyles.css";
import {FaSearch} from "react-icons/fa"

import Item from "./Item"
import React, { createContext } from 'react';
import data_product from "./Assert/all_product"

function Home() {
  return (
    <>
     <div className="search-bar-container">
        <div className="input-wrapper">
          <FaSearch id="search-icon" />
          <input placeholder="Type to search..." />
<input name="iHaine" type="checkbox"/>
        <label for="iHaine">Haine</label>
        <input name="iElectronice" type="checkbox"/>
        <label for="iElectronice">Electronice</label>
        <input name="iMobila" type="checkbox"/>
        <label for="iMobila">Mobila</label>
        </div>
        
      </div>
    

     <div className="popular">
            {data_product.map((item,i)=>{
              return <Item key={i} id={item.id} title={item.title} image={item.image} price={item.price} />
            })}
      </div>
    </>
  );
}

export default Home;
