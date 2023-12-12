import React, {useRef, useState} from "react";

const ListItem = ({ item, fetchChildFolders, onCreateFolder, fetchChildFiles, onCreateFile, deleteFile, deleteFolder, setContent }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [subItems, setSubItems] = useState([]);
    const inputFileRef = useRef(null);
    const inputFolderRef = useRef(null);

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
            childFiles.sort(
                function(a,b){
                    let x = a.name.toLowerCase();
                    let y = b.name.toLowerCase();

                    if(x > y){return 1;}
                    if(x < y){return -1;}
                    return 0;});
            childFolders.sort(
                function(a,b){
                    let x = a.name.toLowerCase();
                    let y = b.name.toLowerCase();

                    if(x > y){return 1;}
                    if(x < y){return -1;}
                    return 0;});
            setSubItems(childFolders.concat(childFiles));
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
            <div className="main-list-item" style={{display:"flex", justifyContent:'space-between'}} onClick={() => {
                {item.content !== undefined && (
                    setContent.current.value = item.content
                )}
            }}>
                <div className="main-list-item">
                    {item.content === undefined && (
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
                        {item.content == null && (<a className="create-file">
                            Add file
                            <div className="dropdown-file-form">
                                <form className="file-form" onSubmit={(e) => e.preventDefault()}>
                                    <label htmlFor="fileName">Enter file name:</label>
                                    <input type="text" ref={inputFileRef} id="fileName" name="fileName"/>
                                    <button onClick={() => {
                                        onCreateFile(item.id, inputFileRef.current.value).then((data) => {
                                            setSubItems(() => [...subItems, data].sort(
                                                function(a,b){
                                                    let x = a.name.toLowerCase();
                                                    let y = b.name.toLowerCase();

                                                    if(x > y){return 1;}
                                                    if(x < y){return -1;}
                                                    return 0;})
                                                .sort((a) =>  a.content !== undefined ? 1 : -1));
                                            inputFileRef.current.value = "";
                                    })}} >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </a>)}
                        {item.content == null && (<a className="create-file">
                            Add folder
                            <div className="dropdown-file-form">
                                <form className="file-form">
                                    <label htmlFor="folderName">Enter folder name:</label>
                                    <input type="text" ref={inputFolderRef} id="folderName" name="folderName"/>
                                    <button onClick={() => {
                                        console.log("data");
                                        onCreateFolder(item.id, inputFolderRef.current.value).then((data) => {
                                            console.log(data);
                                            setSubItems(prev => [...subItems, data].sort(
                                                function(a,b){
                                                let x = a.name.toLowerCase();
                                                let y = b.name.toLowerCase();

                                                //compare the word which is comes first
                                                if(x>y){return -1;}
                                                if(x<y){return 1;}
                                                return 0;})
                                                .sort((a) =>  a.content !== undefined ? 1 : -1));
                                            inputFolderRef.current.value = "";
                                        })
                                    }}>
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </a>)}
                        {item.content == null && (
                            <a onClick={() => deleteFolder(item.id)}>Delete</a>
                        )}
                        {item.content != null && (
                            <a onClick={() => {deleteFile(item.id).then((data) => {
                                setSubItems(prev => prev.filter(obj => obj.id !== item.id))
                            }).catch(error => console.log(error))}}>Delete</a>
                        )}
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
                                      fetchChildFiles={fetchChildFiles}
                                      onCreateFile={onCreateFile}
                                      deleteFile={deleteFile}
                                      deleteFolder={deleteFolder}
                                      setContent={setContent}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListItem;