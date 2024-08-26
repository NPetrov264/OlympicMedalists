import React, {useEffect, useState} from "react";
import axios from "axios";
import api from "../api/axiosConfig"
import { Layout } from "../components/Layout";

export default function Home() {

    const [events, setEvents] = useState([]);

    const getEvents = async () => {

        try{
          const response = await api.get("/events");
          console.log(response.data);
          setEvents(response.data);
        } catch(err) {
          console.log(Error)
        }
    }

    useEffect (() => {
        getEvents();
    }, [])

    return (
        <div className="container">
            <div className="py-4">
                <table className="table shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">athleteName</th>
                            <th scope="col">games</th>
                            <th scope="col">medal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                            <tr key={event.id}>
                                <th scope="row">{event.id}</th>
                                <td>{event.athleteName}</td>
                                <td>{event.games}</td>
                                <td>{event.medal}</td>
                            </tr>)
                        )}
                    </tbody>
                </table>
                <button className="btn btn-primary mx-2">View</button>
            </div>
        </div>
    )
}