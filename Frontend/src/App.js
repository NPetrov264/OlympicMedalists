import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from './api/axiosConfig';
import Navbar from './components/navbar';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Layout  from './components/Layout';

function App() {

  /*const [events, setEvents] = useState();

  const getEvents = async () => {

    try{
      const response = await api.get("http://localhost:8080/events/medalists");
      console.log(response.data);
      setEvents(response.data);
    } catch(err) {
      console.log(Error)
    }
  }

  useEffect (() => {
    getEvents();
  }, [])*/

  return (
    <div className="App">
      <Navbar />
      <Home />
      <Routes>
        <Route path="/" element={<Layout/>}>

        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
