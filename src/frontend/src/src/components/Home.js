import "./styles/HomeStyles.css";
import {FaSearch} from "react-icons/fa"

import Item from "./Item"
import React, { createContext } from 'react';
import data_product from "./Assert/all_product"

function Home() {
  bruh();
  return (
    <>
     <div className="search-bar-container">
        <div className="input-wrapper">
          <FaSearch id="search-icon" />
          <input placeholder="Type to seardch..." />
          

        </div>
        
          
     </div>
<input name="iHaine" type="checkbox" checked>
          <label for="iHaine">Haine</label>
          <input name="iElectronice" type="checkbox" checked>
          <label for="iElectronice">Electronice</label>
          <input name="iMobila" type="checkbox" checked>
          <label for="iMobila">Mobila</label>
     <div className="popular">
            {data_product.map((item,i)=>{
              return <Item key={i} id={item.id} title={item.title} image={item.image} price={item.price} />
            })}
      </div>
    </>
  );
}

export default Home;
