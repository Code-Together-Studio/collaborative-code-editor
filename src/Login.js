import React, {useState} from 'react';
import './Login.css';

const Login = () => {
    return(
        <div className="login-body">
            <div className="header">
                <div style={{display: "flex", alignItems: "center"}}>
                    <div className="icon-container">
                        <img className="icon" src="logo.png" alt="icon" className="icon"/>
                    </div>
                    <h3 className="siteName">CodeTogether</h3>
                </div>
            </div>
            <div className="login-content">
                <div className="login-text"> Log in to return to work</div>
                <div className="login-button-container">
                    <input
                        type="text"
                        className="login-input"
                        placeholder="Email Address"
                    />

                    <input
                        type="password"
                        className="login-input"
                        placeholder="Password"
                    />

                    <button className="login-button" >Log in</button>
                    <div className="login-text-small"> Not registered? <a href="signup"> Sign up here </a></div>

                </div>
            </div>

        </div>
    )
}

export default Login;