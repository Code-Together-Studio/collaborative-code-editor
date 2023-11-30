import React, {useState} from 'react';
import './ProjectSetup.css';

const ProjectSetup = () => {
    return(
        <div className="setup-body">
            <div className="setup-header">
                <div style={{display: "flex", alignItems: "center"}}>
                    <div className="icon-container">
                        <img className="icon" src="logo.png" alt="icon" className="icon"/>
                    </div>
                    <a href="/home" className="siteName">CodeTogether</a>
                </div>
            </div>
            <div className="setup-content">
                <div className="setup-text"> Project setup</div>
                <div className="setup-button-container">
                    <input
                        type="text"
                        className="setup-input"
                        placeholder="Project name"
                    />

                    <div style={{display:"flex"}}>
                        <input type="checkbox" id="myCheckbox"/>
                        <label for="myCheckbox">Provide access for anonymous users</label>
                    </div>

                    <button className="setup-button" >Create project</button>

                </div>
            </div>

        </div>
    )
}

export default ProjectSetup;