import React, {useEffect, useState} from 'react';
import './Main.css';

const ListItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSublist = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className="main-list-item">
                {item.imageSrc === 'folder.png' && (
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
                <ul style={{listStyleType: "none"}}>
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
        imageSrc: 'file.png',
        text: 'File 1',
    },
    {
        imageSrc: 'folder.png',
        text: 'Folder 1',
        sublist: [
            {
                imageSrc: 'file.png',
                text: 'File 1.1',
            },
            {
                imageSrc: 'file.png',
                text: 'File 1.2',
            },
        ],
    },
    {
        imageSrc: 'folder.png',
        text: 'Folder 2',
        sublist: [
            {
                imageSrc: 'folder.png',
                text: 'Folder 2.1',
                sublist: [
                    {
                        imageSrc: 'file.png',
                        text: 'File 2.1.1',
                    },
                ],
            },
            {
                imageSrc: 'file.png',
                text: 'File 2.1',
            },
        ],
    },
];

const Main = () => {

    return (
        <div className="app">
            <div className="header">
                <div style={{display: "flex", alignItems: "center"}}>
                    <div className="icon-container">
                        <img className="icon" src="logo.png" alt="icon"/>
                    </div>
                    <h3 className="siteName">CodeTogether</h3>
                </div>
                <div className="button-container">
                    <a href="signup"><button className="button" style={{borderRadius: "10px"}} >Sign up</button></a>
                    <a href="login"><button className="button" style={{borderRadius: "10px"}} >Log in</button></a>
                </div>
            </div>
            <div className="main-content">
                <div className="main-left-block">
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

export default Main;