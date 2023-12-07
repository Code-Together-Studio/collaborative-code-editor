import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './Project.css';

const ListItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSublist = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className="main-list-item">
                {item.imageSrc === '/folder.png' && (
                    <button className="main-list-button" onClick={toggleSublist}>
                        {isOpen ? '˅' : '>'}
                    </button>
                )}
                <div className="main-list-item">
                    <img src={item.imageSrc} alt={item.text}  style={{width: '30px', height: '30px', marginRight: '10px'}}/>
                    <div className="main-list-text">{item.text}</div>
                </div>
            </div>
            {isOpen && item.sublist && (
                <ul style={{listStyleType: "none", margin:"0"}}>
                    {item.sublist.map((subItem, index) => (
                        <li key={index}>
                            {subItem.sublist ? (
                                <ListItem item={subItem} />
                            ) : (
                                <div className="main-list-item">
                                    <img src={subItem.imageSrc} alt={subItem.text}  style={{width: '30px', height: '30px', marginRight: '10px'}}/>
                                    <span className="main-list-text">{subItem.text}</span>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const data = [
    {
        imageSrc: '/file.png',
        text: 'File 1',
    },
    {
        imageSrc: '/folder.png',
        text: 'Folder 1',
        sublist: [
            {
                imageSrc: '/file.png',
                text: 'File 1.1',
            },
            {
                imageSrc: '/file.png',
                text: 'File 1.2',
            },
        ],
    },
    {
        imageSrc: '/folder.png',
        text: 'Folder 2',
        sublist: [
            {
                imageSrc: '/folder.png',
                text: 'Folder 2.1',
                sublist: [
                    {
                        imageSrc: '/file.png',
                        text: 'File 2.1.1',
                    },
                ],
            },
            {
                imageSrc: '/file.png',
                text: 'File 2.1',
            },
        ],
    },
];

const Project = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const projectData = await response.json();
                setProject(projectData);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="app">
            <div className="header">
                <div style={{display: "flex", alignItems: "center"}}>
                    <div className="icon-container">
                        <img className="icon" style={{height: "35px", width:"auto"}} src="/menu.png" alt="icon"/>
                        <img className="icon" src="/logo.png" alt="icon"/>
                    </div>
                    <a href="/home" className="siteName">CodeTogether</a>
                </div>
                <div className="button-container">
                    {!jwtToken && (
                        <>
                            <a href="signup"><button className="home-button" style={{borderRadius: "10px"}} >Sign up</button></a>
                            <a href="login"><button className="home-button" style={{borderRadius: "10px"}} >Log in</button></a>
                        </>
                    )}
                </div>
            </div>
            <div className="main-content">
                <div className="main-left-block">
                    <h1 className="siteName">{project ? project.title : 'Project'}</h1>
                    {data.map((item, index) => (
                        <ListItem key={index} item={item} />
                    ))}
                </div>
                <div className="main-right-block">
                    <textarea className="main-textarea"></textarea>
                </div>
            </div>
        </div>
    );
}

export default Project;