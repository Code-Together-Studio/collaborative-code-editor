import React, {useEffect, useState} from 'react';
import './Main.css';

const NestedList = ({ items }) => {
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index}>
                    {item.text}
                    {item.subitems && item.subitems.length > 0 && (
                        <NestedList items={item.subitems} />
                    )}
                </li>
            ))}
        </ul>
        /*<ul style={{listStyle: 'none', padding: 0}}>
            {items.map((item, index) => (
                <li key={index} style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                    <button className="buttonStyle" onClick={toggleList}> ></button>
                    <img
                        src={item.imageSrc}
                        style={{width: '30px', height: '30px', marginRight: '10px'}}
                    />
                    <span style={{color: "white"}}>{item.text}</span>
                    {/!*{isOpen && (
                        <ul>
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                        </ul>
                    )}*!/}
                </li>
            ))}
        </ul>*/
    );
};

const Main = () => {

    const [isOpen, setIsOpen] = useState(false);
    const items = [
        {
            imageSrc: 'folder.png',
            text: 'Folder 1',
        },
        {
            imageSrc: 'file.png',
            text: 'File 1',
        },
    ];
    const toggleList = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="app">
            <div className="header">
                <div className="icon-container">
                    <img className="icon" src="logo.png" alt="icon" className="icon"/>
                </div>
                <div className="button-container">
                    <button className="button" disabled>
                        Disabled
                    </button>
                    <button className="button">Normal</button>
                    <button className="button focused">Focused</button>
                    <button className="button pressed">Pressed</button>
                </div>
            </div>
            <div className="main-content">
                <div className="left-block">
                    <div>
                        {/*<button onClick={toggleList}>Toggle List</button>
                        {isOpen && (
                            <ul>
                                <li>Item 1</li>
                                <li>Item 2</li>
                                <li>Item 3</li>
                            </ul>
                        )}*!/*/}
                        <ul style={{listStyle: 'none', padding: 0}}>
                            {items.map((item, index) => (
                                <li key={index} style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                                    <button className="buttonStyle" onClick={toggleList}> ></button>
                                    <img
                                        src={item.imageSrc}
                                        style={{width: '30px', height: '30px', marginRight: '10px'}}
                                    />
                                    <span style={{color: "white"}}>{item.text}</span>
                                    {isOpen && (
                                        <ul>
                                            <li>Item 1</li>
                                            <li>Item 2</li>
                                            <li>Item 3</li>
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="right-block">
                    <textarea className="textarea"></textarea>
                </div>
            </div>
        </div>
    );
}

export default Main;