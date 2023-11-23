import React, { useState } from 'react';

const ListItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSublist = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div>
                {item.imageSrc === 'folder.png' && (
                <span><button className="buttonStyle" onClick={toggleSublist}>
                    {isOpen ? '˅' : '>'}
                </button></span>)}
                <div>
                    <img src={item.imageSrc} alt={item.text}  style={{width: '30px', height: '30px', marginRight: '10px'}}/>
                    <span style={{color: "white"}}>{item.text}</span>
                </div>
            </div>
            {isOpen && item.sublist && (
                <ul>
                    {item.sublist.map((subItem, index) => (
                        <li key={index}>
                            {subItem.sublist ? (
                                <ListItem item={subItem} />
                            ) : (
                                <div>
                                    <img src={subItem.imageSrc} alt={subItem.text}  style={{width: '30px', height: '30px', marginRight: '10px'}}/>
                                    <span style={{color: "white"}}>{subItem.text}</span>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
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

    return (
        <div style={{backgroundColor: "black"}}>
            <h2>List with Sublists</h2>
            {data.map((item, index) => (
                <ListItem key={index} item={item} />
            ))}
        </div>
    );
};

export default Test;
/*
import React, { useState } from 'react';

const ListItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSublist = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div>
                <button onClick={toggleSublist}>{isOpen ? '-' : '+'}</button>
                {item.name}
            </div>
            {isOpen && item.sublist && (
                <ul>
                    {item.sublist.map((subItem, index) => (
                        <li key={index}>
                            {subItem.sublist ? (
                                <ListItem item={subItem} />
                            ) : (
                                subItem.name
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const Test = () => {
    const data = [
        {
            name: 'Item 1',
            sublist: [
                { name: 'Subitem 1.1', sublist: [{ name: 'Subitem 1.1.1', sublist: [{ name: 'Subitem 1.1.1.1' }] }] },
                { name: 'Subitem 1.2' },
                { name: 'Subitem 1.3' },
            ],
        },
        {
            name: 'Item 2',
            sublist: [{ name: 'Subitem 2.1' }, { name: 'Subitem 2.2' }],
        },
        {
            name: 'Item 3',
            sublist: [{ name: 'Subitem 3.1' }, { name: 'Subitem 3.2' }],
        },
    ];

    return (
        <div>
            <h2>List with Sublists</h2>
            {data.map((item, index) => (
                <ListItem key={index} item={item} />
            ))}
        </div>
    );
};

export default Test;*/
