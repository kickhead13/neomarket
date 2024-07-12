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
                        <div>E-mail confirmation</div>
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
                       Verify your e-mail for the confirmation code.
                    </div>
      </div>
   </>
  )
}

export default Email
