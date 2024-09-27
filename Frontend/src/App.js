import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './pages/global/Topbar';
import Sidebar from './pages/global/Sidebar';
import Dashboard from './pages/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Contact from './pages/Contact';
import TopAthletes from './pages/ByAthlete/topAthletes';
import MedalsBar from './pages/ByCountry/medalsBar';
import Geography from './pages/ByCountry/georaphy';
import Participants from './pages/ByAthlete/Participants';
import HeightWeightHeatMap from './pages/ByAthlete/HeightWeightHeatMap';
import HeightDistribution from './pages/ByAthlete/heightDistribution';

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
                  <Route path="/" element={<Dashboard/>}/>
                  <Route path="/medals" element={<MedalsBar/>}/>
                  <Route path="/medals-map" element={<Geography/>}/>
                  <Route path="/top-athletes" element={<TopAthletes/>}/>
                  <Route path="/participants" element={<Participants/>}/>
                  <Route path="/height-weight-heatmap" element={<HeightWeightHeatMap/>}/>
                  <Route path="/weight-distribution" element={<HeightDistribution/>}/>
                  <Route path="/height-distribution" element={<HeightDistribution/>}/>

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
