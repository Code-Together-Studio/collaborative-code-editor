import React, {useState} from 'react';
import './ActiveProjects.css';

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const [currentPage, setCurrentPage] = useState(1);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        paginate(pageNumber);
    };

    const handlePrevClick = () => {
        const prevPage = currentPage - 1;
        if (prevPage >= 1) {
            setCurrentPage(prevPage);
            paginate(prevPage);
        }
    };

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        if (nextPage <= pageNumbers.length) {
            setCurrentPage(nextPage);
            paginate(nextPage);
        }
    };

    return (
        <nav>
            <ul className="active-projects-pagination">
                <li>
                    <button onClick={handlePrevClick}>&lt;</button>
                </li>
                {pageNumbers.map((number) => (
                    <li key={number} className={number === currentPage ? 'active' : ''}>
                        <button onClick={() => handleClick(number)}>{number}</button>
                    </li>
                ))}
                <li>
                    <button onClick={handleNextClick}>&gt;</button>
                </li>
            </ul>
        </nav>
    );
};


const Home = () => {
    const items = [
        {
            text: 'Project 1',
        },
        {
            text: 'Project 2',
        },
        {
            text: 'Project 3',
        },
        {
            text: 'Project 4',
        },
        {
            text: 'Project 5',
        },
        {
            text: 'Project 6',
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Adjust as needed

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return(
        <div className="active-projects">
            <div className="active-projects-header">
                <div style={{display: "flex", alignItems: "center"}}>
                    <div className="home-icon-container">
                        <img className="active-projects-icon" src="logo.png" alt="icon" className="icon"/>
                    </div>
                    <h3 className="active-projects-site-name">CodeTogether</h3>
                </div>
            </div>
            <div className="active-projects-content">
                <div className="active-projects-text"> List of active projects </div>
                <ul style={{listStyle: 'none'}}>
                    {currentItems.map((item, index) => (
                        <li key={index} className="active-projects-li">
                            <span className="active-projects-li-text">{item.text}</span>
                        </li>
                    ))}
                </ul>
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={items.length}
                    paginate={paginate}
                />
            </div>
        </div>
    )
}

export default Home;