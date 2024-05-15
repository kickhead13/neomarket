import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const LoginSignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);
    const navigate = useNavigate(); 

    const tryAuth = (email, password) => {
        let url = "http://localhost:8080/api/fetch_user_password?username=" + email;
        var compareTo;
        fetch(url)
            .then(res => {var obj = res.json()
            obj.then(data => {compareTo = data['password']})
            })
            .catch(function(err){return false;})
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        const enc = encoder.encode(password);
        var compared;
        crypto.subtle.digest("SHA-256", enc).then(result => {compared = decoder.decode(result)});
        console.log(compared);
        return (compared === compareTo);
    }
    
    const tryRegister = (name, password, email) => {
        let url = "http://localhost:8080/api/sign_up?username=" + name + "&password=" + password + "&email=" + email;
        var compareTo;
        fetch(url)
            .then(res => {var obj = res.json()
            obj.then(data => {compareTo = data['response']})
            })
            .catch(function(err){return false;})
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

        // Authentication logic for login here...
        // If successful, redirect the user to HomePage.js
        if (tryAuth(email, password) == true)
        {
        navigate('/layout'); // Navigate to HomePage.js
        }
        else{
            setPasswordError('Invalid credentials');
            return;
        }
        // Hide the login form
        setIsLoginFormVisible(false);
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
        navigate('/layout');
        }
        else
        {
            setEmailError('Register failed, internal error');
        }
        // Hide the signup form
        setIsLoginFormVisible(true);
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
                            value={password}
                           
                        />
                        <label className="errorLabel">{passwordError}</label>
                    </div>
                    <br/>
                    <div className="inputContainer">
                        <input
                            type="region"
                            placeholder="Enter your region"
                            className="inputBox"
                            value={password}
                           
                        />
                        <label className="errorLabel">{passwordError}</label>
                    </div>
                    <br/>
                    <div className="inputContainer">
                        <input
                            type="city"
                            placeholder="Enter your city"
                            className="inputBox"
                            value={password}
                            
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
