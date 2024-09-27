import React, { useCallback, useEffect, useMemo, useState } from "react";
import api from "../../api/axiosConfig"
import { Autocomplete, Box, Button, MenuItem, Select, TextField } from "@mui/material";
import Header from "../../components/Header";
import SwarmPlotHeight from "../../components/SwarmPlotHeight";

const HeightDistribution = () => {

  const [subtitle, setSubtitle] = useState("Swarm plot showing height distribution in");
  const [sex1, setSex1] = useState("M");
  const [sex2, setSex2] = useState("M");
  const [sport1, setSport1] = useState("Gymnastics");
  const [sport2, setSport2] = useState("Tennis");
  const [reload, setReload] = useState(false);
  const [availableSports, setAvailableSports] = useState([]);

  useEffect(() => {
    getAvailableSports();  // Get list of sports
  }, []);

  const getAvailableSports = async () => {
    try {
      const response = await api.get("/sportList"); // Get all the available sports
      console.log(response.data);
      setAvailableSports(response.data);
    } catch (error) {
      console.error('Failed to fetch sports:', error);
    }
  };

  const handlePageChange = useMemo(() => {
    // Updates the data on reload
    return [sport1, sport2, sex1, sex2];
  },[reload]);

  const handleSport1Change = (newSport) => {
    setSport1(newSport);
  };
  const handleSport2Change = (newSport) => {
    setSport2(newSport);
  };

  const handleSex1Change = (event) => {
    setSex1(event.target.value);
  };

  const handleSex2Change = (event) => {
    setSex2(event.target.value);
  };

  return (
    <Box className="Content-wrapper" height="92vh" overflow="auto" >
      <Box p="20px" sx={{ display: 'flex', justifyContent: "center" }}>
        <Header title="Height distribution" subtitle={subtitle} />

        <Box m="0 0 0 30px" sx={{ display: 'flex' }} >
          <Box sx={{ width: 180, marginTop: 1 }}>
            {/* Sport SELECT DROPDOWN MENU*/}
            <Autocomplete
              disablePortal
              value={sport1}
              options={availableSports}
              sx={{ width: 180 }}
              renderInput={(params) => <TextField {...params} label="sport1" />}
              onChange={(event, newValue) => {
                handleSport1Change(newValue);
              }}
            />
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex'}}>
                {/* Sex SELECT DROPDOWN MENU*/}
                <Select 
                  variant="standard"
                  size="small"
                  id="sex-simple-select"
                  sx={{ width: 180, height: 33}}
                  value={sex1}
                  onChange={handleSex1Change}
                >
                  <MenuItem value="M">Males</MenuItem>
                  <MenuItem value="F">Females</MenuItem>
                </Select>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: 180, margin: 1 }}>
            {/* Sport SELECT DROPDOWN MENU*/}
            <Autocomplete
              disablePortal
              value={sport2}
              options={availableSports}
              sx={{ width: 180 }}
              renderInput={(params) => <TextField {...params} label="sport2" />}
              onChange={(event, newValue) => {
                handleSport2Change(newValue);
              }}
            />
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex'}}>
                {/* Sex SELECT DROPDOWN MENU*/}
                <Select 
                  variant="standard"
                  size="small"
                  id="sex-simple-select"
                  sx={{ width: 112 }}
                  value={sex2}
                  onChange={handleSex2Change}
                >
                  <MenuItem value="M">Males</MenuItem>
                  <MenuItem value="F">Females</MenuItem>
                </Select>
              </Box>
              <Button
                variant="contained"
                onClick={() => setReload(!reload)}
              >Reload</Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box height="82vh" width="800px">
          <SwarmPlotHeight parameters={handlePageChange} />
        </Box>
      </Box>
    </Box>
  )
}

export default HeightDistribution;