import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Email = () => {
  const [emailError, setEmailError] = useState(''); 
  const navigate = useNavigate(); 

  const onEmailButtonClick = () => {
    const code=document.getElementById("code").value;
    var compareTo="";
    const value = `; ${document.cookie}`;
    const parts = value.split(`; regcode=`);
    if (parts.length === 2) compareTo=parts.pop().split(';').shift();
    if(compareTo === code && compareTo!="")
        navigate('/layout'); 
    else setEmailError("Verification code incorrect or expired, try again.");
    
  };
  return (
    <>
    <div className="mainContainer">
    <div className="titleContainer">
                        <div>Confirmare Email</div>
                    </div>
                    <br />
                    <div className="inputContainer">
                        <input
                            type="input"
                            placeholder="Enter your code here"
                            className="inputBox"
                            id="code"
                        />
                    <label className="errorLabel">{emailError}</label>
                    </div>
                    <br />
                    <div className="inputContainer">
                        <input
                            type="button"
                            value="Verificare"
                            className="inputButton"
                            onClick={onEmailButtonClick}
                           
                        />
                    </div>
                    <br />
                    <div className="sign">
                       Verifica-ti emailul si introdu codul primit.
                    </div>
      </div>
   </>
  )
}

export default Email
