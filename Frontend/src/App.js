import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
// import Dashboard from './scenes/dashboard';
// import Contries from './scenes/dashboard';
// import TopAthletes from './scenes/dashboard';
// import Geography from './scenes/dashboard';
// import Weight from './scenes/dashboard';
// import Height from './scenes/dashboard';

import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Contact from './pages/Contact';
import TopAthletes from './pages/TopAthletes';

function App() {
  const [theme, colorMode] = useMode();
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <BrowserRouter>
            <Sidebar/>
            <main className="content">
                <Topbar />
                <Routes>
                  {/* <Route path="/" element={<Dashboard/>}/>
                  <Route path="/contries" element={<Contries/>}/>
                  <Route path="/top-athletes" element={<TopAthletes/>}/>
                  <Route path="/geography" element={<Geography/>}/>
                  <Route path="/weight" element={<Weight/>}/>
                  <Route path="/height" element={<Height/>}/> */}

                  <Route exact path="/" element={<Home/>}/>
                  {/* <Route exact path="/top-athletes" element={<TopAthletes/>}/> */}
                  <Route path="/top-athletes" element={<TopAthletes/>}/>
                  <Route exact path="/contact" element={<Contact/>}/>
                </Routes>
            </main>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
