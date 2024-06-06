import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Email = () => {
  const navigate = useNavigate(); 

  const onEmailButtonClick = () => {

    navigate('/layout'); 
    
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
                           
                        />
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
