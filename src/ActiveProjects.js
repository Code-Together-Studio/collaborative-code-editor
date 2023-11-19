import React, {useState} from 'react';
import './ActiveProjects.css';

const Home = () => {
    const items = [
        {
            text: 'Project 1',
        },
        {
            text: 'Project 2',
        },
        {
            text: 'Project 3',
        },
        {
            text: 'Project 4',
        },
        {
            text: 'Project 5',
        },
    ];

    return(
        <div className="active-projects">
            <div className="active-projects-header">
                <div style={{display: "flex", alignItems: "center"}}>
                    <div className="home-icon-container">
                        <img className="active-projects-icon" src="logo.png" alt="icon" className="icon"/>
                    </div>
                    <h3 className="active-projects-site-name">CodeTogether</h3>
                </div>
            </div>
            <div className="active-projects-content">
                <div className="active-projects-text"> List of active projects </div>
                <ul style={{listStyle: 'none'}}>
                    {items.map((item, index) => (
                        <li key={index} className="active-projects-li">
                            <span className="active-projects-li-text">{item.text}</span>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}

export default Home;