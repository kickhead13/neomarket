import React from 'react'
import "./styles/Anuntstyles.css"
import Footer from "./Footer"
import Header from "./Header.js"
const Anunt = () => {
  return (
    <>
    <Header />
    <div className='wrapper'>
    
      
       <div className='label-input-container'>
            
            <input type="text" placeholder="Titlul" id="anunt" name="anunt" />
      </div>
        
        <div className='label-input-container'>
           
            <textarea placeholder="Descriere" type="text" id="anunt" name="anunt" />
        </div>
        
        <div className='label-input-container'>
            
            <input type="file" id="poze" name="poze" />
        </div>
        
        <div className='label-input-container'>
           
            <input placeholder="Pret RON" type="number" id="anunt" name="anunt" />
        </div>
        
       
        
        <button className='buton'>Creeaza anunt</button>
        </div>

        <Footer />
    </>
  )
}

export default Anunt;
