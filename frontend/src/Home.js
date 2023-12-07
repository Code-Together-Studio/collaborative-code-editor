import React from 'react';
import './Home.css';

const Home = () => {
    const jwtToken = localStorage.getItem('jwtToken');
    const handleCreateProjectClick = () => {
        window.location.href = '/projectSetup';
    };

    return(
        <div className="home">
            <div className="home-header">
                <div style={{display: "flex", alignItems: "center"}}>
                    <div className="home-icon-container">
                        <img className="home-icon" src="logo.png" alt="icon"/>
                    </div>
                    <a href="/home" className="siteName">CodeTogether</a>
                </div>
                <div className="home-button-container">
                    {!jwtToken && (
                        <>
                            <a href="signup"><button className="home-button" style={{borderRadius: "10px"}} >Sign up</button></a>
                            <a href="login"><button className="home-button" style={{borderRadius: "10px"}} >Log in</button></a>
                        </>
                    )}
                </div>
            </div>
            <div className="home-content">
                <div className="home-text"> Code Together, Create Together:</div>
                <div className="home-text" style={{marginBottom: "30px"}}> Where Collaboration Fuels Innovation.</div>
                <div className="home-button-container">
                    {jwtToken ? (
                        <button className="home-button-center" onClick={handleCreateProjectClick}>
                            Create Project
                        </button>
                    ) : (
                        <button className="home-button-center" disabled>
                            Create Project
                        </button>
                    )}
                    <a href="activeProjects"><button className="home-button-center">
                        Open Project
                    </button></a>
                </div>
            </div>

        </div>
    )
}

export default Home;