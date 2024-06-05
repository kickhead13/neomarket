import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const LoginSignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [city, setCity] = useState('');
    const [name, setName] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

    const [lstatus, setLstatus] = useState('waiting');
    //const [credentials, setCredentials] = useState(false);
    const navigate = useNavigate(); 
    const superContext = "sha512 reallly really secret context";
    
    async function tryAuth(name, password){
        const encoder = new TextEncoder();
        const enc = encoder.encode(password + superContext); //trollface :3
        const hash = await crypto.subtle.digest("SHA-256", enc);
        const hashArray = Array.from(new Uint8Array(hash));
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
        let host = window.location.hostname;
        //host = "10.144.131.142";
        let url = "https://" + host + ":8443/api/check_user_password?username=" + name + "&password_hash=" + hashHex;
        var compareTo;
        const api_data = await fetch(url).catch(function(err){compareTo="fail";console.log(err);return false;});
        if(!api_data){
            return false;
        }
        const data= await api_data.json().catch(function(err){compareTo="fail";console.log(err);return false;});
        if(!data){
            return false;
        }
        compareTo = data['confirm'];
		console.log(compareTo);
        if(!compareTo){
            return false;
        }
        setLstatus(compareTo === "nok" ? 'false' : 'true');
		if(compareTo === "nok") {
            return false;
		}
		document.cookie="user=" + name + "; path=/";
		document.cookie="accountType=" + compareTo + "; path=/";
        return true;
    }
    
    async function tryRegister(name, password, email){
        let host = window.location.hostname;
        let url = "https://" + host + ":8443/api/sign_up?username=" + name + "&password=" + password + "&email=" + email;
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
        compareTo = data['response'];
        return (compareTo === "ok");
    }
    
    const onLoginButtonClick = () => {
        // Reset error messages
        setEmailError('');
        setPasswordError('');

        // Perform validation checks
        if (email === '') {
            setEmailError('Please enter your email');
            return;
        }
        if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email');
            //return;
        }
        if (password === '') {
            setPasswordError('Please enter a password');
            return;
        }
        if (password.length < 8) {
            setPasswordError('The password must be 8 characters or longer');
            return;
        }
		console.log("Test");
        // Authentication logic for login here...
        // If successful, redirect the user to HomePage.js
        let check = tryAuth(email, password);
        //while(lstatus === 'waiting') {}
        check.then(val => {
          if(val === true) {
            console.log(check);
            navigate('/layout?user=' + email); // Navigate to HomePage.js
          } else {
            setPasswordError('Invalid credentials');
          }
        }
        ).catch(err => console.log(err));
        // Hide the login form
        //setIsLoginFormVisible(false);
    };

    const onSignupButtonClick = () => {
        // Reset error messages
        setEmailError('');
        setPasswordError('');

        // Perform validation checks
        if (email === '') {
            setEmailError('Please enter your email');
            return;
        }
        if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email');
            return;
        }
        if (password === '') {
            setPasswordError('Please enter a password');
            return;
        }
        if (password.length < 8) {
            setPasswordError('The password must be 8 characters or longer');
            return;
        }

        // Sign-up logic here...
        // If successful, redirect the user to HomePage.js
        if(tryRegister(name, password, email))
        {
          navigate('/email');
        }
        else
        {
            setEmailError('Register failed, internal error');
        }
        // Hide the signup form
        //setIsLoginFormVisible(true);
    };

    return (
        <div className="mainContainer">
            {isLoginFormVisible ? (
                <>
                    <div className="titleContainer">
                        <div>Login</div>
                    </div>
                    <br />
                    <div className="inputContainer">
                        <input
                            type="email"
                            placeholder="Enter your email here"
                            className="inputBox"
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                        />
                        <label className="errorLabel">{emailError}</label>
                    </div>
                    <br />
                    <div className="inputContainer">
                        <input
                            type="password"
                            placeholder="Enter your password here"
                            className="inputBox"
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                        />
                        <label className="errorLabel">{passwordError}</label>
                    </div>
                    <br />
                    <div className="inputContainer">
                        <input
                            type="button"
                            value="Log in"
                            className="inputButton"
                            onClick={onLoginButtonClick}
                        />
                    </div>
                    <br />
                    <div className="sign">
                        <Link to="#" onClick={() => setIsLoginFormVisible(false)}>Create account.</Link>
                    </div>
                </>
            ) : (
                <>
                    <div className="titleContainer">
                        <div>Sign Up</div>
                    </div>
                    <br />
                    <div className="inputContainer">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="inputBox"
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                        />
                        <label className="errorLabel">{emailError}</label>
                    </div>
                    <br />
                    <div className="inputContainer">
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="inputBox"
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                        />
                        <label className="errorLabel">{passwordError}</label>
                    </div>
                    <br />
                    <div className="inputContainer">
                        <input
                            type="name"
                            placeholder="Enter your name"
                            className="inputBox"
                            value={name}
                            onChange={(ev) => setName(ev.target.value)}
                        />
                        <label className="errorLabel">{passwordError}</label>
                    </div>
                    <br />
                    <div className="inputContainer">
                        <input
                            type="country"
                            placeholder="Enter your country"
                            className="inputBox"
                            value={country}
                            onChange={(ev) => setCountry(ev.target.value)}
                        />
                        <label className="errorLabel">{passwordError}</label>
                    </div>
                    <br/>
                    <div className="inputContainer">
                        <input
                            type="region"
                            placeholder="Enter your region"
                            className="inputBox"
                            value={region}
                            onChange={(ev)=>setRegion(ev.target.value)}
                        />
                        <label className="errorLabel">{passwordError}</label>
                    </div>
                    <br/>
                    <div className="inputContainer">
                        <input
                            type="city"
                            placeholder="Enter your city"
                            className="inputBox"
                            value={city}
                            onChange={(ev)=>setCity(ev.target.value)}
                        />
                        <label className="errorLabel">{passwordError}</label>
                    </div>
                    <br/>
                    <div className="inputContainer">
                        <input
                            type="button"
                            value="Sign Up"
                            className="inputButton"
                            onClick={onSignupButtonClick}
                        />
                    </div>
                    <br />
                    <div className="sign">
                        <Link to="#" onClick={() => setIsLoginFormVisible(true)}>Already have an account? Login.</Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default LoginSignupPage;