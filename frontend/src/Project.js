import React, {useState, useEffect, useMemo, useRef} from 'react';
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
    const jwtToken = localStorage.getItem('jwtToken');
    const [isClicked, setIsClicked] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);

    const [textareaContent, setTextareaContent] = useState(null);
    const textareaRef = useRef(null);
    const cursorPositionRef = useRef(null); 
    const [dataVersion, setDataVersion] = useState(0);
    const [stompClient, setStompClient] = useState(null);


    const fileSelect = async (file) => {
        const newFile = await fetchFileDetails(file.id);
        if (newFile) {
            setSelectedFile(newFile);
            setTextareaContent(newFile.content);
        }
        else {
            setSelectedFile(file);
            setTextareaContent(file.content);
        }
        navigate(`/project/${projectId}/file/${file.id}`);
    }


    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
    };

    const fetchChildFolders = async (folderId) => {
        try {
            const response = await axiosInstance.get(`/folders/${folderId}/child-folders`);
            return response.data;
        } catch (error) {
            console.log('Error fetching child folders:', error);
            return [];
        }
    };

    const fetchChildFiles = async (folderId) => {
        try {
            const response = await axiosInstance.get(`/code-snippet/folder/${folderId}`);
            return response.data;
        } catch (error) {
            console.log('Error fetching child folders:', error);
            return [];
        }
    };

    const fetchFileDetails = async (fileId) => {
        try {
            const response = await axiosInstance.get(`/code-snippet/${fileId}`);
            return response.data;
        } catch (error) {
            console.log('Error fetching file:', error);
            return null;
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchRootFolders = async () => {
            try {
                const response = await axiosInstance.get(`/folders/${projectId}/project-root-folders`);
                const folders = await response.data;
                setRootFolders(folders.sort(
                    function(a,b){
                        let x = a.name.toLowerCase();
                        let y = b.name.toLowerCase();

                        if(x>y){return 1;}
                        if(x<y){return -1;}
                        return 0;}));
            } catch (error) {
                console.log('Error fetching project root folders:', error);
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
                    function(a,b){
                        let x = a.name.toLowerCase();
                        let y = b.name.toLowerCase();

                        if(x>y){return 1;}
                        if(x<y){return -1;}
                        return 0;}));
            } catch (error) {
                console.log('Error fetching project root files:', error);
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
                console.log(error);
                window.location.href = '/';
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    useEffect(() => {
        const socket = new SockJS(`${process.env.REACT_APP_BACKEND_URL}/ws`);
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log('Connected');

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
    }, []);

    useEffect(() => {
        if (textareaRef.current && cursorPositionRef.current !== null) {
            textareaRef.current.selectionStart = cursorPositionRef.current;
            textareaRef.current.selectionEnd = cursorPositionRef.current;
        }
    }, [textareaContent]);


    const createFolder = async (parentId, name) => {
        try {
            const formData = new FormData();
            var url = `/folders/create`
            if (parentId !== null) {
                formData.append('parentFolderId', parentId);
            }
            else {
                formData.append('parentProjectId', projectId);
                url = `/folders/project/create`
            }
            formData.append('name', name);

            const response = await axiosInstance.post(url, formData);

            return(response.dat);
        } catch (error) {
            console.error('Error creating folder:', error);
        }
    };

    const createFolderInProject = async (name) => {
        try {
            let url = `${process.env.REACT_APP_BACKEND_URL}/code-snippet/folder`;
            let isExist = false;
            const formData = new FormData();
            formData.append('parentProjectId', projectId);
            formData.append('name', name);
            rootFolders.map((item) => {
                if(item.name === name) {
                    labelFolderErrorRef.current.innerText  = "folder exists";
                    isExist = true;
                }
            })
            if(isExist === false) {
                inputFolderNameRef.current.value = "";
                labelFolderErrorRef.current.innerText = "";

                const response = await axiosInstance.post(`/folders/project/create`, formData);

                const dataFolder = response.data;
                setRootFolders(prev => [...rootFolders].sort(
                    function(a,b){
                        let x = a.name.toLowerCase();
                        let y = b.name.toLowerCase();

                        if(x > y){return 1;}
                        if(x < y){return -1;}
                        return 0;}))
                setRootFolders(prev => [...rootFolders, dataFolder]);
                return (dataFolder);
            }
        } catch (error) {
            console.error('Error creating file:', error);
        }
    };
  
    const createFileInProject = async (name) => {
        try {
            const formData = new FormData();
            formData.append('parentProjectId', projectId);
            formData.append('name', name);
            inputFileNameRef.current.value = "";

            const response = await axiosInstance.post(`/code-snippet/project`, formData);
            return(response.data);
        } catch (error) {
            console.error('Error creating file:', error);
        }
    };

    const createFileInFolder = async (parentId, name) => {
        try {
            const formData = new FormData();
            formData.append('parentFolderId', parentId);
            formData.append('name', name);

            const response = await axiosInstance.post(`/code-snippet/folder`, formData);
            return(response.data);
        } catch (error) {
            console.error('Error creating file:', error);
        }
    };

    const deleteFile = async (id) => {
        try {
            const formData = new FormData();
            formData.append('id', id);
            await axiosInstance.delete(`/code-snippet/${id}`, formData);
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    const deleteFolder = async (id) => {
        try {
            const formData = new FormData();
            formData.append('id', id);
            await axiosInstance.delete(`/folders/${id}`, formData);
        } catch (error) {
            console.error('Error whilst deleting folder:', error);
        }
    };

    const rootFilesView = useMemo(() => rootFiles.map((item, index) => (
        <ListItem key={index} item={item}
                  fetchChildFolders={fetchChildFolders}
                  onCreateFolder={createFolder}
                  fetchChildFiles={fetchChildFiles}
                  onCreateFile={createFileInFolder}
                  deleteFile={deleteFile}
                  deleteFolder={deleteFolder}
                  fileSelect={fileSelect}
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

    return (
        <div className="app">
            <div className="header">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="icon-container">

                        <img className="icon" style={{height: "35px", width:"auto"}} src="/menu.png" alt="icon" onClick={handleChange}/>
                        <img className="icon" src="/logo.png" alt="icon"/>

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
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <h1 className="siteName">{project ? project.title : 'Project'}</h1>
                        <div className="dropdown">
                            <button className="create-folder-button">⋮</button>
                            <div className="dropdown-content">
                                <a className="create-file">
                                    Add file
                                    <div className="dropdown-file-form">
                                        <form className="file-form" onSubmit={(e) => e.preventDefault()}>
                                            <label htmlFor="name">Enter file name:</label>
                                            <input type="text" ref={inputFileNameRef} id="name" name="name" />
                                            <button onClick={() => createFileInProject(inputFileNameRef.current.value).then((data) => {
                                                setRootFiles(prev => [...rootFiles, data].sort(
                                                    function(a,b){
                                                        let x = a.name.toLowerCase();
                                                        let y = b.name.toLowerCase();

                                                        if(x > y){return 1;}
                                                        if(x < y){return -1;}
                                                        return 0;}));
                                                inputFileNameRef.current.value = "";
                                            })}>
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
                                            <button onClick={() => createFolderInProject(inputFolderNameRef.current.value)}>
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
                                  fetchChildFiles={fetchChildFiles}
                                  onCreateFile={createFileInFolder}
                                  deleteFile={deleteFile}
                                  deleteFolder={deleteFolder}
                                  fileSelect={fileSelect}
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