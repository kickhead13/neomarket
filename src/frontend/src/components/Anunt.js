import React, {useState} from 'react'
import "./styles/Anuntstyles.css"
import Footer from "./Footer"
import Header from "./Header.js"
import getCookie from "./Cookies/Cookies.js"
import {useNavigate} from "react-router-dom"


const Anunt = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState(null);
  const navigate=useNavigate();

  function generateName()
  {
	  var id = "img" + Math.random().toString(16).slice(2);
	  return id;
  }
  async function tryNewProd() {
    console.log('damn');
        let host = window.location.hostname;
		var name=generateName();
		const formData = new FormData();
        formData.append("file", image);
        let url = "https://" + host + ":8443/api/new_prod?title=" + title + "&description=" + description + "&category=" + category + "&price=" + price + "&img=" + (image==null ? "L" : name) + "&id=" + 1 +"&seller=" + getCookie('user');
        let url2 = "https://" + host + ":8991?name=" + name;
		var compareTo;
		if(image != null){
        await fetch(url2,{
			method: "POST",
			body: formData
		}).catch(function(err){compareTo="fail";console.log(err);return false;});
		}
        const resp = await fetch(url).catch(function(err){compareTo="fail";console.log(err);return false;});
        if(!resp){
            return false;
        }
        const data= await resp.json().catch(function(err){compareTo="fail";console.log(err);return false;});
        if(!data){
            return false;
        }
        console.log(data);
        compareTo = data['confirm'];
        return (compareTo === "ok");
  }

  const newProd = (e) => {
    let check = tryNewProd();
    check.then( val => {
      if(val===true){
        navigate('/layout');
      }
      else{
              console.log("L");
      }
    }).catch(err=>console.log(err));
  }

  return (
    <>
    <Header />
    <div className='wrapper'>
    
      
       <div className='label-input-container'>
            
            <input type="text" placeholder="Title" value = {title} onChange={(ev) => setTitle(ev.target.value)} id="anunt" name="anunt" />
      </div>

        <div className='label-input-container'>
        <select name="categories" id="cars" style = {{width: "300px"}} onChange={(ev) => setCategory(ev.target.value)} value={category}>
            <option value="Haine">Haine</option>
            <option value="Electronice">Electronice</option>
            <option value="Mobile">Mobila</option>
            <option value="audi">Audi</option>
        </select>          
        </div>

        <div className='label-input-container'>
           
            <textarea placeholder="Description" value={description} onChange={(ev) => setDescription(ev.target.value)} type="text" id="anunt" name="anunt" />
        </div>
        
        <div className='label-input-container'>
            
            <input type="file" id="poze" name="poze" onChange={(ev) => setImage(ev.target.files[0])} name="poze" />
        </div>
        
        <div className='label-input-container'>
           
            <input placeholder="Price RON" value={price} onChange={(ev) => setPrice(ev.target.value)} type="number" id="anunt" name="anunt" />
        </div>
        
       
        
        <input type="button" value="Create" style = {{width: "10%"}} onClick={newProd}/>
        </div>

        <Footer />
    </>
  )
}

export default Anunt;
