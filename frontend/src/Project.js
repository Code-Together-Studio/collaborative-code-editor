import React, {useState, useEffect, useMemo, useRef} from 'react';
import { useParams } from 'react-router-dom';
import './Project.css';
import ListItem from "./ListItem";

const Project = () => {
    const { projectId } = useParams();
    const [rootFolders, setRootFolders] = useState([]);
    const [rootFiles, setRootFiles] = useState([]);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const inputFileNameRef = useRef(null);
    const inputFolderNameRef = useRef(null);
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
    
    useEffect(() => {
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

    /*if (loading) {
        return <div>Loading...</div>;
    }*/

    const createFolder = async (parentId, name) => {
        try {
            const formData = new FormData();
            formData.append('parentFolderId', parentId);
            formData.append('name', name);

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/folders/create`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const date = await response.json()
                console.log('Folder created successfully');
                return(date);
            } else {
                console.error('Failed to create folder');
            }
        } catch (error) {
            console.error('Error creating folder:', error);
        }
    };

    const createFolderInProject = async (name) => {
        try {
            const formData = new FormData();
            formData.append('parentProjectId', projectId);
            formData.append('name', name);
            inputFolderNameRef.current.value = "";

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/folders/project/create`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const date = await response.json()
                console.log('Folder created successfully');
                return(date);
            } else {
                console.error('Failed to create folder');
            }
        } catch (error) {
            console.error('Error creating folder:', error);
        }
    };

    const createFileInProject = async (name) => {
        try {
            const formData = new FormData();
            formData.append('parentProjectId', projectId);
            formData.append('name', name);
            inputFileNameRef.current.value = "";

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/code-snippet/project`, {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                response.json().then((date)=>{
                    setRootFiles((prev)=>[...prev, date])
                })
                console.log('File created successfully');
            } else {
                console.error('Failed to create file');
            }
        } catch (error) {
            console.error('Error creating file:', error);
        }
    };

    const createFileInFolder = async (parentId, name) => {
        try {
            const formData = new FormData();
            formData.append('parentFolderId', parentId);
            formData.append('name', name);

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/code-snippet/folder`, {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                const date = await response.json()
                console.log('File created successfully');
                return(date);
            } else {
                console.error('Failed to create file');
            }
        } catch (error) {
            console.error('Error creating file:', error);
        }
    };

    const deleteFile = async (id) => {
        try {
            const formData = new FormData();
            formData.append('id', id);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/code-snippet/${id}`, {
                method: 'DELETE',
                body: formData
            });
            if (response.ok) {
                console.log('File deleted successfully');
            } else {
                console.error('Failed to delete file');
            }
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    const rootFilesView = useMemo(() => rootFiles.map((item, index) => (
        <ListItem key={index} item={item}
                  fetchChildFolders={fetchChildFolders}
                  onCreateFolder={createFolder}
                  fetchChildFiles={fetchChildFiles}
                  onCreateFile={createFileInFolder}
                  deleteFile={deleteFile}
        />
    )), [rootFiles]);

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
                                <a className="create-file">
                                    Add file
                                    <div className="dropdown-file-form">
                                        <form className="file-form" onSubmit={(e) => e.preventDefault()}>
                                            <label htmlFor="name">Enter file name:</label>
                                            <input type="text" ref={inputFileNameRef} id="name" name="name" />
                                            <button onClick={() => createFileInProject(inputFileNameRef.current.value)}>
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
                                            <button onClick={() => createFolderInProject(inputFolderNameRef.current.value).then((data) => {
                                                setRootFolders(prev => [...rootFolders, data].sort(
                                                    function(a,b){
                                                        let x = a.name.toLowerCase();
                                                        let y = b.name.toLowerCase();

                                                        if(x>y){return -1;}
                                                        if(x<y){return 1;}
                                                        return 0;})
                                                    .sort((a) =>  a.content !== undefined ? 1 : -1));
                                                inputFolderNameRef.current.value = "";
                                            })}>
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    {rootFolders.map((item, index) => (
                        <ListItem key={index} item={item}
                                  fetchChildFolders={fetchChildFolders}
                                  onCreateFolder={createFolder}
                                  fetchChildFiles={fetchChildFiles}
                                  onCreateFile={createFileInFolder}
                                  deleteFile={deleteFile}
                        />
                    ))}
                    {/*{rootFiles.map((item, index) => (
                        <ListItem key={index} item={item}
                        fetchChildFolders={fetchChildFolders}
                        onCreateFolder={createFolder}
                        fetchChildFiles={fetchChildFiles}
                        onCreateFile={createFileInFolder}
                        />
                    ))}*/}
                    {rootFilesView}
                </div>
                <div className="main-right-block">
                    <textarea className="main-textarea"></textarea>
                </div>
            </div>
        </div>
    );
}

export default Project;