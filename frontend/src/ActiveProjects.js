import React, {useState, useEffect} from 'react';
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
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/projects/not-required-authentication`);
                console.log(response)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleProjectClick = (projectId) => {
        window.location.href = `/project/${projectId}`;
    };

    return(
        <div className="active-projects">
            <div className="active-projects-header">
                <div style={{display: "flex", alignItems: "center"}}>
                    <div className="home-icon-container">
                        <img className="active-projects-icon icon" src="logo.png" alt="icon"/>
                    </div>
                    <a href="/home" className="siteName">CodeTogether</a>
                </div>
            </div>
            <div className="active-projects-content">
                <div className="active-projects-text"> List of active projects </div>
                <ul style={{listStyle: 'none'}}>
                    {currentItems.map((item) => (
                        <li key={item.id} className="active-projects-li" onClick={() => handleProjectClick(item.id)}>
                            <span className="active-projects-li-text">{item.title}</span>
                        </li>
                    ))}
                </ul>
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={projects.length}
                    paginate={paginate}
                />
            </div>
        </div>
    )
}

export default Home;