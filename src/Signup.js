import React, {useState} from 'react';
import './Signup.css';

const Signup = () => {
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
            <div className="content">
                <div className="login-text">Sign up to create projects</div>
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

                    <input
                        type="password"
                        className="login-input"
                        placeholder="Confirm Password"
                    />

                    <button className="login-button" >Sign up</button>
                    <div className="login-text-small"> Already have an account? <a href="login"> Log in here </a></div>

                </div>
            </div>

        </div>
    )
}

export default Signup;