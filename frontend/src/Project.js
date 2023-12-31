import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import './Project.css';
import ListItem from "./ListItem";
import axiosInstance from './AxiosSetup';

const Project = () => {
    const navigate = useNavigate();

    const { projectId, fileId } = useParams();
    const [rootFolders, setRootFolders] = useState([]);
    const [rootFiles, setRootFiles] = useState([]);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const inputFileNameRef = useRef(null);
    const inputFolderNameRef = useRef(null);
    const labelFolderErrorRef = useRef(null);
    const labelFileErrorRef = useRef(null);
    const jwtToken = localStorage.getItem('jwtToken');
    const [isClicked, setIsClicked] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);

    const [textareaContent, setTextareaContent] = useState(null);
    const textareaRef = useRef(null);
    const cursorPositionRef = useRef(null);
    const [dataVersion, setDataVersion] = useState(0);
    const [stompClient, setStompClient] = useState(null);


    const fileSelect = async (file) => {
        window.location.href = `/project/${projectId}/file/${file.id}`;
    }


    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
    };

    const fetchChildFolders = async (folderId) => {
        try {
            const response = await axiosInstance.get(`/folders/${folderId}/child-folders`);
            return response.data;
        } catch (error) {
            alert('Occured some error. Reload page or return later');
            return [];
        }
    };

    const fetchChildFiles = async (folderId) => {
        try {
            const response = await axiosInstance.get(`/code-snippet/folder/${folderId}`);
            return response.data;
        } catch (error) {
            alert('Occured some error. Reload page or return later');
            return [];
        }
    };

    const fetchFileDetails = async (fileId) => {
        try {
            const response = await axiosInstance.get(`/code-snippet/${fileId}`);
            return response.data;
        } catch (error) {
            alert('Occured error openening file. Reload page or return later');
            window.location.href = `/project/${projectId}`
            return null;
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchRootFolders = async () => {
            try {
                const response = await axiosInstance.get(`/folders/${projectId}/project-root-folders`);
                const folders = await response.data;
                setRootFolders(folders.sort(
                    function (a, b) {
                        let x = a.name.toLowerCase();
                        let y = b.name.toLowerCase();

                        if (x > y) { return 1; }
                        if (x < y) { return -1; }
                        return 0;
                    }));
            } catch (error) {
                alert('Occured some error. Reload page or return later');
            } finally {
                setLoading(false);
            }
        };

        fetchRootFolders();
    }, [projectId]);

    useEffect(() => {
        if (selectedFile) {
            setDataVersion(selectedFile.dataVersion);
        }
    }, [selectedFile]);

    useEffect(() => {
        const fetchRootFiles = async () => {
            try {
                const response = await axiosInstance.get(`/code-snippet/project/${projectId}`);
                const files = response.data;
                setRootFiles(files.sort(
                    function (a, b) {
                        let x = a.name.toLowerCase();
                        let y = b.name.toLowerCase();

                        if (x > y) { return 1; }
                        if (x < y) { return -1; }
                        return 0;
                    }));
            } catch (error) {
                alert('Occured some error. Reload page or return later');
            } finally {
                setLoading(false);
            }
        };

        fetchRootFiles();

        if (selectedFile === null && fileId) {
            fetchFileDetails(fileId).then(file => {
                if (file) {
                    setSelectedFile(file);
                    setTextareaContent(file.content);
                }
            });
        }
    }, [projectId, fileId]);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axiosInstance.get(`/projects/${projectId}`);
                const projectData = response.data;
                setProject(projectData);
            } catch (error) {
                alert('Occured some error. Reload page or return later');
                window.location.href = '/';
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    useEffect(() => {
        if (fileId) {
            const socket = new SockJS(`${process.env.REACT_APP_BACKEND_URL}/ws?token=AAA`);
            const client = new Client({
                webSocketFactory: () => socket,
                onConnect: () => {
                    console.log('Connected');
                    client.publish({ destination: '/app/init', body: JSON.stringify({ fileId: fileId, projectId: projectId }) });
                    client.subscribe('/topic/updates', message => {
                        const parsedMessage = JSON.parse(message.body);
                        var id = +fileId;
                        if (selectedFile) {
                            id = +selectedFile.id
                        }
                        if (parsedMessage.fileId && parsedMessage.fileId === id) {
                            setDataVersion(parsedMessage.originalDataVersion);
                            setTextareaContent(parsedMessage.content);
                            setLoading(false);
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
        }
    }, []);

    useEffect(() => {
        if (textareaRef.current && cursorPositionRef.current !== null) {
            textareaRef.current.selectionStart = cursorPositionRef.current;
            textareaRef.current.selectionEnd = cursorPositionRef.current;
        }
    }, [textareaContent]);


    const createFolderInProject = async (name) => {
        let isExist = false;
        const formData = new FormData();
        formData.append('parentProjectId', projectId);
        formData.append('name', name);
        rootFolders.map((item) => {
            if (item.name === name) {
                labelFolderErrorRef.current.innerText = "folder exists";
                isExist = true;
            }
        })
        if (isExist === false) {
            inputFolderNameRef.current.value = "";
            labelFolderErrorRef.current.innerText = "";

            const response = await axiosInstance.post(`/folders/project/create`, formData);

            const dataFolder = response.data;
            setRootFolders(prev => [...rootFolders].sort(
                function (a, b) {
                    let x = a.name.toLowerCase();
                    let y = b.name.toLowerCase();

                    if (x > y) { return 1; }
                    if (x < y) { return -1; }
                    return 0;
                }))
            setRootFolders(prev => [...rootFolders, dataFolder]);
            return (dataFolder);
        }
    };

    const createFileInProject = async (name) => {
        try {
            const formData = new FormData();
            let isExist = false;
            formData.append('parentProjectId', projectId);
            formData.append('name', name);
            rootFiles.map((item) => {
                if (item.name === name) {
                    labelFileErrorRef.current.innerText = "file exists";
                    isExist = true;
                }
            })
            if (isExist === false) {
                inputFileNameRef.current.value = "";
                labelFileErrorRef.current.innerText = "";
                const response = await axiosInstance.post(`/code-snippet/project`, formData);

                setRootFiles(prev => [...rootFiles, response.data].sort(
                    function (a, b) {
                        let x = a.name.toLowerCase();
                        let y = b.name.toLowerCase();

                        if (x > y) { return 1; }
                        if (x < y) { return -1; }
                        return 0;
                    }));

                return (response.data);
            }
        } catch (error) {
            console.error('Error creating file:', error);
        }
    };

    const createFileInFolder = async (parentId, name) => {
        try {
            const formData = new FormData();
            let isExist = false;
            formData.append('parentFolderId', parentId);
            formData.append('name', name);

            rootFiles.map((item) => {
                if (item.name === name) {
                    labelFileErrorRef.current.innerText = "file exists";
                    isExist = true;
                }
            })

            if (isExist === false) {
                labelFileErrorRef.current.innerText = "";
                const response = await axiosInstance.post(`/code-snippet/folder`, formData);
                return (response.data);
            }

        } catch (error) {
            console.error('Error creating file:', error);
        }
    };

    const deleteFile = async (id) => {
        const formData = new FormData();
        formData.append('id', id);
        await axiosInstance.delete(`/code-snippet/${id}`, formData);
    };

    const deleteFolder = async (id) => {
        const formData = new FormData();
        formData.append('id', id);
        await axiosInstance.delete(`/folders/${id}`, formData);
    };

    const rootFilesView = useMemo(() => rootFiles.map((item, index) => (
        <ListItem key={index} item={item}
            fetchChildFolders={fetchChildFolders}
            fetchChildFiles={fetchChildFiles}
            onCreateFile={createFileInFolder}
            deleteFile={deleteFile}
            deleteFolder={deleteFolder}
            fileSelect={fileSelect}
            labelFileExist={labelFileErrorRef}
        />
    )), [rootFiles]);

    const handleChange = () => {
        setIsClicked(!isClicked);
    };
    const leftBlockClassName = isClicked ? "main-left-block" : "main-left-block-absent"

    const handleTextareaChange = (event) => {
        if (loading) return;

        setLoading(true);
        const content = event.target.value;
        cursorPositionRef.current = event.target.selectionStart;

        if (stompClient && stompClient.connected) {
            const message = JSON.stringify({ fileId: fileId, originalDataVersion: dataVersion, content: content });
            stompClient.publish({ destination: '/app/change', body: message });
        }
    };
    // useEffect(() => {
    //     return () => {
    //         axiosInstance.put(`/code-snippet/${fileId}/unlock`)
    //     };
    //   }, [navigate]); 

    // useEffect(() => {
    //     const handleBeforeUnload = async (e) => {
    //         try {
    //             console.log("here")
    //             await axiosInstance.put(`/code-snippet/${fileId}/unlock`);
    //         } catch (error) {
    //             console.error("Error during beforeunload Axios request", error);
    //         }
    //     };

    //     window.addEventListener('beforeunload', handleBeforeUnload);

    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, []);

    return (
        <div className="app">
            <div className="header">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="icon-container">

                        <img className="icon" style={{ height: "35px", width: "auto" }} src="/menu.png" alt="icon" onClick={handleChange} />
                        <img className="icon" src="/logo.png" alt="icon" />

                    </div>
                    <a href="/home" className="siteName">CodeTogether</a>
                </div>
                <div className="button-container">
                    {jwtToken && (
                        <>
                            <a href="/logout"><button className="home-button" style={{ borderRadius: "10px" }} onClick={handleLogout} >Logout</button></a>
                        </>
                    )}
                    {!jwtToken && (
                        <>
                            <a href="/signup"><button className="home-button" style={{ borderRadius: "10px" }} >Sign up</button></a>
                            <a href="/login"><button className="home-button" style={{ borderRadius: "10px" }} >Log in</button></a>
                        </>
                    )}
                </div>
            </div>
            <div className="main-content">
                <div className={leftBlockClassName}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h1 className="siteName" onClick={() => window.location.href=`/project/${projectId}`}>{project ? project.title : 'Project'}</h1>
                        <div className="dropdown">
                            <button className="create-folder-button">⋮</button>
                            <div className="dropdown-content">
                                <a className="create-file">
                                    Add file
                                    <div className="dropdown-file-form">
                                        <form className="file-form" onSubmit={(e) => e.preventDefault()}>
                                            <label htmlFor="name">Enter file name:</label>
                                            <input type="text" ref={inputFileNameRef} id="name" name="name" />
                                            <label ref={labelFileErrorRef}></label>
                                            <button onClick={() => createFileInProject(inputFileNameRef.current.value)
                                                                    .catch((error) => alert(`Did not create file in project`))}>
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
                                            <input type="text" ref={inputFolderNameRef} id="name" name="name" />
                                            <label ref={labelFolderErrorRef}></label>
                                            <button onClick={() => createFolderInProject(inputFolderNameRef.current.value)
                                                                    .catch((error) => alert(`Did not create folder in project`))}>
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    {rootFolders.concat(rootFiles).map((item, index) => (
                        <ListItem key={index} axiosInstance={axiosInstance} item={item}
                            fetchChildFolders={fetchChildFolders}
                            fetchChildFiles={fetchChildFiles}
                            onCreateFile={createFileInFolder}
                            deleteFile={deleteFile}
                            deleteFolder={deleteFolder}
                            fileSelect={fileSelect}
                            rootFiles={rootFiles}
                        />
                    ))}
                </div>
                <div className="main-right-block">
                    {textareaContent !== null ? (
                        <textarea className="main-textarea" value={textareaContent} onChange={handleTextareaChange} ref={textareaRef}></textarea>
                    ) : (
                        <textarea className="main-textarea" disabled placeholder="Select a file to view/edit its content"></textarea>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Project;