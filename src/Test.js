import React from 'react';

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
    );
};

const Test = () => {
    const data = [
        { text: 'Item 1' },
        {
            text: 'Item 2',
            subitems: [
                { text: 'Subitem 2.1' },
                { text: 'Subitem 2.2' },
            ],
        },
        {
            text: 'Item 3',
            subitems: [
                {
                    text: 'Subitem 3.1',
                    subitems: [{ text: 'Sub-subitem 3.1.1' }],
                },
                { text: 'Subitem 3.2' },
            ],
        },
    ];

    return (
        <div>
            <h1>Nested List Example</h1>
            <NestedList items={data} />
        </div>
    );
};

export default Test;
