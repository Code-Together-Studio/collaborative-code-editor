import React from 'react';
import './Home.css';

const Home = () => {
    return(
        <div className="home">
            <div className="home-header">
                <div style={{display: "flex", alignItems: "center"}}>
                    <div className="home-icon-container">
                        <img className="home-icon" src="logo.png" alt="icon"/>
                    </div>
                    <h3 className="home-site-name">CodeTogether</h3>
                </div>
                <div className="home-button-container">
                    <a href="signup"><button className="home-button" style={{borderRadius: "10px"}} >Sign up</button></a>
                    <a href="login"><button className="home-button" style={{borderRadius: "10px"}} >Log in</button></a>
                </div>
            </div>
            <div className="home-content">
                <div className="home-text"> Code Together, Create Together:</div>
                <div className="home-text" style={{marginBottom: "100px"}}> Where Collaboration Fuels Innovation.</div>
                <div className="home-button-container">
                    <button className="home-button" style={{width: "436px", height: "96px", borderRadius: "40px",
                        fontFamily: 'JetBrains Mono', fontSize: '3rem', margin: "0 30px"}} disabled>
                        Create Project
                    </button>
                    <a href="activeProjects"><button className="home-button" style={{width: "436px", height: "96px", borderRadius: "40px",
                        fontFamily: 'JetBrains Mono', fontSize: '3rem', margin: "0 30px"}} >
                        Open Project
                    </button></a>
                </div>
            </div>

        </div>
    )
}

export default Home;