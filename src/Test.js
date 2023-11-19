import React, {useEffect, useState} from 'react';
import './Main.css';

/*const NestedList = ({ items }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNestedList = () => {
        setIsOpen(!isOpen);
    };

    return (
        <ul style={{listStyle: 'none'}}>
            {items.map((item, index) => (
                <li key={index} style={{ marginBottom: '10px'}}>
                    {item.imageSrc === 'folder.png' && (
                        <button className="buttonStyle" onClick={toggleNestedList}>
                            {isOpen ? '-' : '>'}
                        </button>
                    )}
                    <img src={item.imageSrc} alt={item.text}  style={{width: '30px', height: '30px', marginRight: '10px'}}/>
                    <span style={{color: "white"}}>{item.text}</span>
                    {item.subitems && item.subitems.length > 0 && isOpen && (
                        <NestedList items={item.subitems} />
                    )}
                </li>
            ))}
        </ul>
    );
};

const Test = () => {
    const data = [
        {
            imageSrc: 'file.png',
            text: 'File 1',
        },
        {
            imageSrc: 'folder.png',
            text: 'Folder 1',
            subitems: [
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
            subitems: [
                {
                    imageSrc: 'folder.png',
                    text: 'Folder 2.1',
                    subitems: [
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

    return (
        <div style={{backgroundColor: "black"}}>
            <h1>Nested List Example</h1>
            <NestedList items={data} />
        </div>
    );
};

export default Test;*/

const NestedList = ({ items }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNestedList = () => {
        setIsOpen(!isOpen);
    };

    return (
        <ul style={{listStyle: 'none'}}>
            {items.map((item, index) => (
                <li key={index} style={{ marginBottom: '10px'}}>
                    {item.imageSrc === 'folder.png' && (
                        <button className="buttonStyle" onClick={item.toggleNestedList}>
                            {item.isOpen ? '-' : '>'}
                        </button>
                    )}
                    <img src={item.imageSrc} alt={item.text} style={{width: '30px', height: '30px', marginRight: '10px'}}/>
                    <span style={{color: "white"}}>{item.text}</span>
                    {item.subitems && item.subitems.length > 0 && item.isOpen && (
                        <NestedList items={item.subitems} />
                    )}
                </li>
            ))}
        </ul>
    );
};

const App = () => {
    const [data, setData] = useState([
        {
            imageSrc: 'file.png',
            text: 'File 1',
        },
        {
            imageSrc: 'folder.png',
            text: 'Folder 1',
            isOpen: false, // Initially closed
            subitems: [
                {
                    imageSrc: 'file.png',
                    text: 'File 1.1',
                },
                {
                    imageSrc: 'file.png',
                    text: 'File 1.2',
                },
            ],
            toggleNestedList: () => {
                setData((prevData) => {
                    const updatedData = [...prevData];
                    updatedData[1].isOpen = !updatedData[1].isOpen;
                    return updatedData;
                })
            },
        },
        {
            imageSrc: 'folder.png',
            text: 'Folder 2',
            isOpen: false, // Initially closed
            subitems: [
                {
                    imageSrc: 'folder.png',
                    text: 'Folder 2.1',
                    isOpen: false, // Initially closed
                    subitems: [
                        {
                            imageSrc: 'file.png',
                            text: 'File 2.1.1',
                        },
                    ],
                    toggleNestedList: () => {
                        setData((prevData) => {
                            const updatedData = [...prevData];
                            updatedData[2].subitems[0].isOpen = !updatedData[2].subitems[0].isOpen;
                            return updatedData;
                        })
                    },
                },
                {
                    imageSrc: 'file.png',
                    text: 'File 2.1',
                },
            ],
            toggleNestedList: () => {
                setData((prevData) => {
                    const updatedData = [...prevData];
                    updatedData[2].isOpen = !updatedData[2].isOpen;
                    return updatedData;
                })
            },
        },
    ]);

    return (
        <div style={{backgroundColor: "black"}}>
            <h1>Nested List Example</h1>
            <NestedList items={data} />
        </div>
    );
};

export default App;
