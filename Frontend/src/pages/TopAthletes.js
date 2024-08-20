import React, {useEffect, useState} from "react";
import axios from "axios";
import { Layout } from "../components/Layout";

export default function TopAthletes() {

    const [athletes, setAthletes] = useState([]);

    const getAthletes = async () => {

        try{
          const response = await axios.get("http://localhost:8080/top-athletes");
          console.log(response.data);
          setAthletes(response.data);
        } catch(err) {
          console.log(Error)
        }
    }

    useEffect (() => {
        getAthletes();
    }, [])

    return (
        <div className="container">
            <div className="py-4">
                <table className="table shadow">
                    <thead>
                        <tr>
                            <th scope="col">country</th>
                            <th scope="col">Name</th>
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
                        {athletes.content?.map(athlete => (
                            <tr key={athlete.athleteId}>
                                <td scope="row">{athlete.noc}</td>
                                <td>{athlete.athleteName}</td>
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
                <button className="btn btn-primary mx-2">View</button>
            </div>
        </div>
    )
}