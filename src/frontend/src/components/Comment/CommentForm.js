import React from 'react'
import "./Comment.css"
import { useState } from "react";
import getCookie from "../Cookies/Cookies.js"
import {useNavigate} from "react-router-dom"
import { useParams } from 'react-router-dom';


const CommentForm = ({submitLabel, pId, state, setState, initialText = ""}) => {
   const navigate=useNavigate();
   const [text, setText] = useState(initialText);
    const {prodId} = useParams();
    console.log('!!!!'+pId);
    async function tryComm() {
      console.log('damn');
      let host = window.location.hostname;
      let url = "https://" + host + ":8443/api/new_comm?body="+text+"&post=" + pId.pId.replace("+","!") +"&user=" + getCookie('user');
        var compareTo;
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
    const sendComm = () =>  {
      console.log('damn');
      let check = tryComm();
      check.then( val => {
        if(val===true){
          setState('');
          navigate('/product/' + pId.pId);
        }
        else{
              console.log("L");
        }
      }).catch(err=>console.log(err));
  }
    return (
       <>
       <div className='commentform'>
      <input
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="comment-form-button" onClick={sendComm}>
        {submitLabel}
      </button>
      </div>
       </>
      );
}

export default CommentForm
