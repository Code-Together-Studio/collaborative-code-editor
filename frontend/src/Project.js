import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './Project.css';

const ListItem = ({ item, fetchChildFolders, onCreateFolder, fetchChildFiles }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [subItems, setSubItems] = useState([]);

/*
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
*/

   /* const createFolder = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/folders/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ , password }),
            });

            if (response.ok) {
                window.location.href = '/login';
            } else {
                console.log(response)
                console.error('Signup failed');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };*/




    const toggleSublist = async () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            const childFolders = await fetchChildFolders(item.id);
            const childFiles = await fetchChildFiles(item.id);
            setSubItems(childFolders.concat(childFiles));
            // const folderFiles = await fetchFiles(item.id);
            // setFiles(folderFiles);
        }
    };

/*
    const handleContextMenu = (e) => {
        e.preventDefault();
        setShowContextMenu(true);
        setContextMenuPosition({ x: e.pageX, y: e.pageY });
    };

    const handleCreateFolder = () => {
        // createFolder(item.id);
        console.log('Creating folder' + `${item.id}`)
        setShowContextMenu(false);
    };
*/
    return (
        <div>
            <div className="main-list-item" style={{display:"flex", justifyContent:'space-between'}}>
                <div className="main-list-item">
                    {item.content == null && (
                        <button className="main-list-button" onClick={toggleSublist}>
                            {isOpen ? '˅' : '>'}
                        </button>
                    )}
                    <div className="main-list-item">
                        {item.content == null && (
                         <img src='/folder.png' alt={item.name}  style={{width: '30px', height: '30px', marginRight: '10px'}}/>
                        )}
                        {item.content != null && (
                            <img src='/file.png' alt={item.name}  style={{width: '30px', height: '30px', marginRight: '10px'}}/>
                        )}
                        <div className="main-list-text">{item.name}</div>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="create-folder-button">⋮</button>
                    <div className="dropdown-content">
                        {!item.isFile && (<a onClick={() => onCreateFolder(item.id, subItems.length)}>Add file</a>)}
                        {!item.isFile && (<a onClick={() => onCreateFolder(item.id, subItems.length)}>Add folder</a>)}
                        <a onClick={() => onCreateFolder(item.id, subItems.length)}>Delete</a>
                    </div>
                </div>

            </div>
            {isOpen && subItems && (
                <ul style={{listStyleType: "none", margin:"0"}}>
                    {subItems.map((subItem, index) => (
                        <li key={index}>
                            <ListItem item={subItem}
                                      fetchChildFolders={fetchChildFolders}
                                      onCreateFolder={onCreateFolder}
                                      fetchChildFiles={fetchChildFiles} />
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
    const [rootFolders, setRootFolders] = useState([]);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const jwtToken = localStorage.getItem('jwtToken');

    const fetchChildFolders = async (folderId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/folders/${folderId}/child-folders`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.log('Error fetching child folders:', error);
            return [];
        }
    };

    const fetchChildFiles = async (folderId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/code-snippet/folder/${folderId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.log('Error fetching child folders:', error);
            return [];
        }
    };
    
    useState(() => {
        const fetchRootFolders = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/folders/${projectId}/project-root-folders`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const folders = await response.json();
                setRootFolders(folders);
            } catch (error) {
                console.log('Error fetching project root folders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRootFolders();
    }, [projectId]);

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

    const createFolder = async (parentId, length) => {
        try {
            const formData = new FormData();
            formData.append('parentFolderId', parentId);
            formData.append('name', 'New folder ' + `${length + 1}`);

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/folders/create`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                console.log('Folder created successfully');
            } else {
                console.error('Failed to create folder');
            }
        } catch (error) {
            console.error('Error creating folder:', error);
        }
    };

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
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <h1 className="siteName">{project ? project.title : 'Project'}</h1>
                        <div className="dropdown">
                            <button className="create-folder-button">⋮</button>
                            <div className="dropdown-content">
                               <a onClick={() => createFolder(null, "New folder")}>Add file</a>
                                <a onClick={() => createFolder(null, "New folder")}>Add folder</a>
                            </div>
                        </div>
                    </div>
                    {rootFolders.map((item, index) => (
                        <ListItem key={index} item={item}
                                  fetchChildFolders={fetchChildFolders}
                                  onCreateFolder={createFolder}
                                  fetchChildFiles={fetchChildFiles} />
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