import React, {useState} from 'react';
import './ProjectSetup.css';

const ProjectSetup = () => {
    const [projectTitle, setProjectTitle] = useState('');
    const [allowAnonymous, setAllowAnonymous] = useState(false);
    const [error, setError] = useState('');

    const handleCreateProject = async (e) => {
        e.preventDefault();
        setError('');

        const formData = new FormData();
        formData.append('title', projectTitle);
        formData.append('authenticated_only', !allowAnonymous);

        try {
            console.log('Sending request')
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/projects/create`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const project = await response.json();
                console.log(project)
                // Maybe use history
                window.location.href = `/project/${project.id}`;
            } else {
                setError('Failed to create project. Please try again.');
                console.error('Failed to create project');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.error('Error:', error);
        }
    };

    return(
        <div className="setup-body">
            <div className="setup-header">
                <div style={{display: "flex", alignItems: "center"}}>
                    <div className="icon-container">
                        <img className="icon" src="logo.png" alt="icon"/>
                    </div>
                    <a href="/home" className="siteName">CodeTogether</a>
                </div>
            </div>
            <div className="setup-content">
                <form onSubmit={handleCreateProject}>
                    <div className="setup-text"> Project setup</div>
                    <div className="setup-button-container">
                        <input
                            type="text"
                            className="setup-input"
                            placeholder="Project name"
                            value={projectTitle}
                            onChange={(e) => setProjectTitle(e.target.value)}
                        />

                        <div style={{display:"flex"}}>
                            <input 
                                type="checkbox" 
                                id="myCheckbox"
                                checked={allowAnonymous}
                                onChange={(e) => setAllowAnonymous(e.target.checked)}
                            />
                            <label htmlFor="myCheckbox">Provide access for anonymous users</label>
                        </div>

                        <button type="submit" className="setup-button">Create project</button>
                    </div>
                </form>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    )
}

export default ProjectSetup;