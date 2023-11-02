import React, {useState} from 'react';
import './Home.css';

const Home = () => {
    return(
        <div className="home">
            <div className="header">
                <div style={{display: "flex", alignItems: "center"}}>
                    <div className="icon-container">
                        <img className="icon" src="logo.png" alt="icon" className="icon"/>
                    </div>
                    <h3 className="siteName">CodeTogether</h3>
                </div>
                <div className="button-container">
                    <button className="button">Sign up</button>
                    <button className="button">Log in</button>
                </div>
            </div>
            <div className="content">
                <div className="text"> Code Together, Create Together:</div>
                <div className="text" style={{marginBottom: "100px"}}> Where Collaboration Fuels Innovation.</div>
                <div className="button-container">
                    <button className="button" style={{width: "436px", height: "96px", borderRadius: "40px",
                        fontFamily: 'JetBrains Mono', fontSize: '3rem', margin: "0 30px"}}>
                        Create Project
                    </button>
                    <button className="button" style={{width: "436px", height: "96px", borderRadius: "40px",
                        fontFamily: 'JetBrains Mono', fontSize: '3rem', margin: "0 30px"}}>
                        Open Project
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Home;