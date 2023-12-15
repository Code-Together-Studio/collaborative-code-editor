import React, {useRef, useState} from "react";

const ListItem = ({ axiosInstance, item, fetchChildFolders, fetchChildFiles, onCreateFile, deleteFile, deleteFolder, fileSelect, labelFileExist, rootFiles }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [subItems, setSubItems] = useState([]);
    const inputFileRef = useRef(null);
    const inputFolderRef = useRef(null);
    const labelFileErrorRef = useRef(null);
    const labelFolderErrorRef = useRef(null);

    const createFileInFolder = async (parentId, name) => {
        const formData = new FormData();
        let isExist = false;
        formData.append('parentFolderId', parentId);
        formData.append('name', name);

        subItems.map((item) => {
            if (item?.content !== undefined && item?.name === name) {
                labelFileErrorRef.current.innerText = "file exists";
                isExist = true;
            }
        })

        if (isExist === false) {
            labelFileErrorRef.current.innerText = "";
            const response = await axiosInstance.post(`/code-snippet/folder`, formData);
            setSubItems(() => [...subItems, response.data].sort((a, b) => {
                const aIsFolder = a.content === undefined;
                const bIsFolder = b.content === undefined;
                if (aIsFolder && !bIsFolder) return -1;
                if (!aIsFolder && bIsFolder) return 1;
        
                const x = a.name.toLowerCase();
                const y = b.name.toLowerCase();
                return x.localeCompare(y);
            }));
            inputFileRef.current.value = "";
            return (response.data);
        }
    };


    const createFolder = async (parentId, name) => {
        const formData = new FormData();
        let isExist = false;
        var url = `/folders/create`
        formData.append('parentFolderId', parentId);
        formData.append('name', name);

        subItems.map((item) => {
            if (item?.content === undefined && item?.name === name) {
                labelFolderErrorRef.current.innerText = "folder exists";
                isExist = true;
            }
        })

        if (isExist === false) {
            labelFolderErrorRef.current.innerText = "";
            const response = await axiosInstance.post(url, formData);
            setSubItems(() => [...subItems, response.data].sort((a, b) => {
                const aIsFolder = a.content === undefined;
                const bIsFolder = b.content === undefined;
                if (aIsFolder && !bIsFolder) return -1;
                if (!aIsFolder && bIsFolder) return 1;
        
                const x = a.name.toLowerCase();
                const y = b.name.toLowerCase();
                return x.localeCompare(y);
            }));
            inputFolderRef.current.value = "";
            return (response.data);
        }
    };


    const toggleSublist = async () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            const childFolders = await fetchChildFolders(item?.id);
            const childFiles = await fetchChildFiles(item?.id);
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

    return (
        <div>
            <div className="main-list-item" style={{display:"flex", justifyContent:'space-between'}} onClick={() => {
                {item?.content !== undefined && (
                    fileSelect(item)
                )}
            }}>
                <div className="main-list-item">
                    {item?.content === undefined && (
                        <button className="main-list-button" onClick={toggleSublist}>
                            {isOpen ? '˅' : '>'}
                        </button>
                    )}
                    <div className="main-list-item" onClick={toggleSublist}>
                        {item?.content == null && (
                            <img src='/folder.png' alt={item?.name}  style={{width: '30px', height: '30px', marginRight: '10px'}}/>
                        )}
                        {item?.content != null && (
                            <img src='/file.png' alt={item?.name}  style={{width: '30px', height: '30px', marginRight: '10px'}}/>
                        )}
                        <div className="main-list-text">{item?.name}</div>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="create-folder-button">⋮</button>
                    <div className="dropdown-content">
                        {item?.content == null && (<a className="create-file">
                            Add file
                            <div className="dropdown-file-form">
                                <form className="file-form" onSubmit={(e) => e.preventDefault()}>
                                    <label htmlFor="fileName">Enter file name:</label>
                                    <input type="text" ref={inputFileRef} id="fileName" name="fileName"/>
                                    <label ref={labelFileErrorRef}></label>
                                    <button onClick={() => {
                                        createFileInFolder(item?.id, inputFileRef.current.value)
                                        .catch((error) => alert(`Did not create file in '${item?.name}' folder`))}} >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </a>)}
                        {item?.content == null && (<a className="create-file">
                            Add folder
                            <div className="dropdown-file-form">
                                <form className="file-form" onSubmit={(e) => e.preventDefault()}>
                                    <label htmlFor="folderName">Enter folder name:</label>
                                    <input type="text" ref={inputFolderRef} id="folderName" name="folderName"/>
                                    <label ref={labelFolderErrorRef}></label>
                                    <button onClick={() => {
                                        createFolder(item?.id, inputFolderRef.current.value)
                                        .catch((error) => alert(`Did not create folder'${item?.name}' folder`))}}>
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </a>)}
                        {item?.content == null && (
                            <a onClick={() => deleteFolder(item?.id)
                                .then((data) => alert(`Deleted folder '${item?.name}' succesfully`))
                                .catch((error) => alert(`Did not delete folder '${item?.name}'`))}>Delete</a>
                        )}
                        {item?.content != null && (
                            <a onClick={(event) => {
                                deleteFile(item?.id)
                                .then((data) => alert(`Deleted file '${item?.name}' succesfully`))
                                .catch((error) => alert(`Did not delete file '${item?.name}'. Someone has opened it`));
                                
                                event.stopPropagation();}}>
                                    Delete</a>
                        )}
                    </div>
                </div>

            </div>
            {isOpen && subItems && (
                <ul style={{listStyleType: "none", margin:"0"}}>
                    {subItems.map((subItem, index) => (
                        <li key={index}>
                            <ListItem key={index}
                                      item={subItem}
                                      axiosInstance={axiosInstance}
                                      fetchChildFolders={fetchChildFolders}
                                      fetchChildFiles={fetchChildFiles}
                                      onCreateFile={onCreateFile}
                                      deleteFile={deleteFile}
                                      deleteFolder={deleteFolder}
                                      fileSelect={fileSelect}
                                      labelFileExist = {labelFileExist}
                                      rootFiles={rootFiles}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListItem;