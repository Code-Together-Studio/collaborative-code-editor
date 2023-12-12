import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import './Project.css';

const ListItem = ({ item, fetchChildFolders, onCreateFolder, onCreateFile, fetchChildFiles, onFileSelect, openFolders, setOpenFolders }) => {
    //const isOpen = openFolders.has(item.id);
    const [isOpen, setIsOpen] = useState(false);
    const [subItems, setSubItems] = useState([]);

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
            // setOpenFolders(new Set(openFolders).add(item.id));
        } else {
            /*
            const newOpenFolders = new Set(openFolders);
            newOpenFolders.delete(item.id);
            setOpenFolders(newOpenFolders);
            */
        }
    };

    const handleItemClick = () => {
        if (item.content !== undefined) {
            onFileSelect(item);
        }
    };

    return (
        <div onClick={handleItemClick}>
            <div className="main-list-item" style={{ display: "flex", justifyContent: 'space-between' }}>
                <div className="main-list-item">
                    {item.content == undefined && (
                        <button className="main-list-button" onClick={toggleSublist}>
                            {isOpen ? '˅' : '>'}
                        </button>
                    )}
                    <div className="main-list-item">
                        {item.content === undefined && (
                            <img src='/folder.png' alt={item.name} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                        )}
                        {item.content !== undefined && (
                            <img src='/file.png' alt={item.name} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                        )}
                        <div className="main-list-text">{item.name}</div>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="create-folder-button">⋮</button>
                    <div className="dropdown-content">
                        {item.content === undefined && (<a onClick={() => onCreateFile(item.id, subItems.length)}>Add file</a>)}
                        {item.content === undefined && (<a onClick={() => onCreateFolder(item.id, subItems.length)}>Add folder</a>)}
                        <a onClick={() => onCreateFolder(item.id, subItems.length)}>Delete</a>
                    </div>
                </div>

            </div>
            {isOpen && subItems && (
                <ul style={{ listStyleType: "none", margin: "0" }}>
                    {subItems.map((subItem, index) => (
                        <li key={index}>
                            <ListItem item={subItem}
                                fetchChildFolders={fetchChildFolders}
                                onCreateFolder={onCreateFolder}
                                onCreateFile={onCreateFile}
                                fetchChildFiles={fetchChildFiles}
                                onFileSelect={onFileSelect}
                                openFolders={openFolders}
                                setOpenFolders={setOpenFolders} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const Project = () => {
    const { projectId, fileId } = useParams();
    const navigate = useNavigate();
    const [rootFolders, setRootFolders] = useState([]);
    const [rootFiles, setRootFiles] = useState([]);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [openFolders, setOpenFolders] = useState(new Set());
    const jwtToken = localStorage.getItem('jwtToken');
    const [textareaContent, setTextareaContent] = useState("");

    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8081/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log('Connected');

                client.subscribe('/topic/updates', message => {
                    const parsedMessage = JSON.parse(message.body);
                    if (parsedMessage.fileId && parsedMessage.fileId === fileId) {
                        setTextareaContent(parsedMessage.content);
                    }
                });
            },
            onDisconnect: () => {
                console.log('Disconnected');
            }
        });

        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, []);

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

    const fetchFileDetails = async (fileId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/code-snippet/${fileId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.log('Error fetching file:', error);
            return null;
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
        if (selectedFile === null && fileId) {
            fetchFileDetails(fileId).then(file => {
                if (file) {
                    setSelectedFile(file);
                    setTextareaContent(file.content);
                }
            });
        }
    }, [projectId, fileId]);

    useState(() => {
        const fetchRootFiles = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/code-snippet/project/${projectId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const files = await response.json();
                setRootFiles(files);
            } catch (error) {
                console.log('Error fetching project root files:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRootFiles();
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

    useEffect(() => {
        const fetchFolderPath = async (fileId) => {
            let folderPath = [];

            const fetchParentFolder = async (folderId) => {
                if (folderId === null) {
                    return;
                }

                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/folders/${folderId}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const folder = await response.json();
                    folderPath.unshift(folder.id); // Add folder id to the path

                    if (folder.parentFolderId) {
                        await fetchParentFolder(folder.parentFolderId); // Recursively fetch parent
                    }
                } catch (error) {
                    console.error('Error fetching folder:', error);
                }
            };

            try {
                const fileResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/code-snippet/${fileId}`);
                if (!fileResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const file = await fileResponse.json();
                await fetchParentFolder(file.folderId);
            } catch (error) {
                console.error('Error fetching file:', error);
            }

            return folderPath;
        };

        if (fileId) {
            fetchFolderPath(fileId).then(folderPath => {
                setOpenFolders(new Set(folderPath));
            });
        }
    }, [fileId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const createFolder = async (parentId, name) => {
        try {
            const formData = new FormData();
            var url = `${process.env.REACT_APP_BACKEND_URL}/folders/create`
            if (parentId !== null) {
                formData.append('parentFolderId', parentId);
            }
            else {
                formData.append('parentProjectId', projectId);
                url = `${process.env.REACT_APP_BACKEND_URL}/folders/project/create`
            }
            formData.append('name', name);

            const response = await fetch(url, {
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

    const createFile = async (parentId, name) => {
        try {
            var url = `${process.env.REACT_APP_BACKEND_URL}/code-snippet/folder`
            const formData = new FormData();
            if (parentId !== null) {
                formData.append('parentFolderId', parentId);
            }
            else {
                formData.append('parentProjectId', projectId);
                url = `${process.env.REACT_APP_BACKEND_URL}/code-snippet/project`
            }
            formData.append('name', name);

            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                console.log('File created successfully');
            } else {
                console.error('Failed to create file');
            }
        } catch (error) {
            console.error('Error creating file:', error);
        }
    };

    const handleFileSelect = (file) => {
        setSelectedFile(file);
        setTextareaContent(file.content);

        navigate(`/project/${projectId}/file/${file.id}`);
    };

    const handleTextareaChange = (event) => {
        const content = event.target.value;

        if (stompClient && stompClient.connected) {
            setTextareaContent(content);   
            const message = JSON.stringify({ fileId: fileId, content: content });
            stompClient.publish({ destination: '/app/change', body: message });
        }
    };

    return (
        <div className="app">
            <div className="header">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="icon-container">
                        <img className="icon" style={{ height: "35px", width: "auto" }} src="/menu.png" alt="icon" />
                        <img className="icon" src="/logo.png" alt="icon" />
                    </div>
                    <a href="/home" className="siteName">CodeTogether</a>
                </div>
                <div className="button-container">
                    {!jwtToken && (
                        <>
                            <a href="signup"><button className="home-button" style={{ borderRadius: "10px" }} >Sign up</button></a>
                            <a href="login"><button className="home-button" style={{ borderRadius: "10px" }} >Log in</button></a>
                        </>
                    )}
                </div>
            </div>
            <div className="main-content">
                <div className="main-left-block">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h1 className="siteName">{project ? project.title : 'Project'}</h1>
                        <div className="dropdown">
                            <button className="create-folder-button">⋮</button>
                            <div className="dropdown-content">
                                <a className="create-file">
                                    Add file
                                    <div className="dropdown-file-form">
                                        <form className="file-form" onSubmit={(e) => e.preventDefault()}>
                                            <label htmlFor="name">Enter file name:</label>
                                            <input type="text" id="name" name="name" />
                                            <button onClick={() => createFile(null, document.getElementById('name').value)}>
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </a>
                                <a className="create-file">
                                    Add folder
                                    <div className="dropdown-file-form">
                                        <form className="file-form" onSubmit={(e) => e.preventDefault()}>
                                            <label htmlFor="name">Enter folder name:</label>
                                            <input type="text" id="name" name="name" />
                                            <button onClick={() => createFolder(null, document.getElementById('name').value)}>
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    {rootFolders.concat(rootFiles).map((item, index) => (
                        <ListItem key={index} item={item}
                            fetchChildFolders={fetchChildFolders}
                            onCreateFolder={createFolder}
                            onCreateFile={createFile}
                            fetchChildFiles={fetchChildFiles}
                            onFileSelect={handleFileSelect}
                            openFolders={openFolders}
                            setOpenFolders={setOpenFolders} />
                    ))}

                </div>
                <div className="main-right-block">
                    {selectedFile && selectedFile.content !== undefined ? (
                        <textarea className="main-textarea" value={textareaContent} onChange={handleTextareaChange}></textarea>
                    ) : (
                        <textarea className="main-textarea" disabled placeholder="Select a file to view/edit its content"></textarea>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Project;