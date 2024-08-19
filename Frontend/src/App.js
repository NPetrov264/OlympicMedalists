import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contact from './pages/Contact';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/contact" element={<Contact/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
