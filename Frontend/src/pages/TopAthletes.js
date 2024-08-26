import React, {useEffect, useState} from "react";
import axios from "axios";
import api from "../api/axiosConfig"


export default function TopAthletes() {
    
    const [data, setData] = useState([]);
    const [availableSports, setAvailableSports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [sport, setSport] = useState("All");


    useEffect(() => {
        getData(currentPage, sport);  // Fetch data when the component mounts or currentPage changes
    }, [currentPage, sport]);


    useEffect(() => {
        getAvailableSports();  // Get all available sports
    }, []);

    const getData = async (page, sport) => {
        setLoading(true);
        try {
            const response = await api.get("/top-athletes", { params: { page: page, sport: sport} }); // Fetch data for the specified page
            console.log(response.data);
            console.log(sport);
            setData(response.data);
            
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
        setLoading(false);
    };

    const getAvailableSports = async () => {
        try {
            const response = await api.get("/sports"); // Get all the available sports
            console.log(response.data);
            setAvailableSports(response.data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const handlePageChange = (newPage, newSport) => {
        setCurrentPage(newPage);  // Update the current page, triggering useEffect to fetch new data
        setSport(newSport);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="py-4">

                <nav aria-label="label">
                    <div className="d-flex justify-content-between">
                        <ul className="pagination">
                            <li className='page-item'>
                                <button className="page-link" onClick={() => handlePageChange(0, sport)}>First</button>
                            </li>
                            <li className={data.first ? 'page-item disabled' : 'page-item'}>
                                <a className="page-link" aria-label="Previous" onClick={() => handlePageChange(currentPage - 1, sport)}>
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li className="page-item" hidden={data.first}>
                                <button className="page-link" disabled={data.first} onClick={() => handlePageChange(currentPage - 1, sport)} >{currentPage}</button>
                            </li>
                            <li className="page-item active" aria-current="page">
                                <button className="page-link" href="#">{currentPage + 1}</button>
                            </li>
                            <li className="page-item" hidden={data.last}>
                                <button className="page-link" disabled={data.last} onClick={() => handlePageChange(currentPage + 1, sport)}>{currentPage + 2}</button>
                            </li>
                            <li className={data.last ? 'page-item disabled' : 'page-item'}>
                                <a className="page-link" aria-label="Next" onClick={() => handlePageChange(currentPage + 1, sport)}>
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                            <li className='page-item'>
                                <button className="page-link" onClick={() => handlePageChange(data.totalPages - 1, sport)}>Last</button>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Find Country" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <div className="dropdown">
                        
                            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Select sport
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" onClick={() => handlePageChange(0, "All")}>All</a></li>
                                {availableSports?.map((sports) => (
                                    <li><a className="dropdown-item" onClick={() => handlePageChange(0, sports)}>{sports}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">country</th>
                            <th scope="col">sex</th>
                            <th scope="col">sport</th>
                            <th scope="col">Olympics atended</th>
                            <th scope="col">gold</th>
                            <th scope="col">silver</th>
                            <th scope="col">bronze</th>
                            <th scope="col">total medals</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.content?.map((athlete, index) => (
                            <tr key={athlete.athleteId}>
                                <td scope="row">{(currentPage*data.size)+index+1}</td>
                                <td>{athlete.athleteName}</td>
                                <td>{athlete.noc}</td>
                                <td>{athlete.sex}</td>
                                <td>{athlete.sport}</td>
                                <td>{athlete.timesParticipated}</td>
                                <td>{athlete.goldMedals}</td>
                                <td>{athlete.silverMedals}</td>
                                <td>{athlete.bronzeMedals}</td>
                                <th>{athlete.medals}</th>
                            </tr>)
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}