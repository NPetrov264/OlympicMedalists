import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig"
import { Autocomplete, Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import Header from "../../components/Header";
import ScatterPlotAge from "../../components/ScatterPlotAge";

const AgeDistribution = () => {
  const [subtitle, setSubtitle] = useState("Number of participants in the olympic games for the period from 1896 to 2024");
  const [sex, setSex] = useState("M");
  const [sport, setSport] = useState("Gymnastics");
  const [availableSports, setAvailableSports] = useState([]);

  useEffect(() => {
    getAvailableSports();  // Get list of sports
  }, []);

  const handleSportChange = (event) => {
    setSport(event.target.value);
    console.log(event.target.value);
  };

  const getAvailableSports = async () => {
    try {
      const response = await api.get("/sportList"); // Get all the available sports
      console.log(response.data);
      setAvailableSports(response.data);
      setAvailableSports(availableSports => ['All', ...availableSports]);
    } catch (error) {
      console.error('Failed to fetch sports:', error);
    }
  };

  const handlePageChange = (newSport, newSex) => {
    // Updates the data on sport or country change
    setSport(newSport);
    setSex(newSex);
  };

  const handSexChange = (event) => {
    setSex(event.target.value);
  };

  return (
    <Box className="Content-wrapper" height="92vh" overflow="auto" >
      <Box p="20px 160px 0px 160px" sx={{ display: 'flex', justifyContent: "space-between" }}>
        <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
          <Header title="Medal chart" subtitle={subtitle} />
        </Box>
        
        <Box sx={{ display: 'flex', padding: "20px 0 0 30px" }}>
            {/* SPORT SELECT DROPDOWN MENU*/}
            <Autocomplete
              disablePortal
              value={sport}
              options={availableSports}
              sx={{ width: 180 }}
              renderInput={(params) => <TextField {...params} label="sport" />}
              onChange={(event, newValue) => {
                handlePageChange(newValue, sex);
              }}
            />
          </Box>
          <Box m="0 0 0 30px" sx={{ display: 'flex' }} >
          {/* sex select radio buttons */}
          <FormControl sx={{ m: 2 }}>
            <FormLabel id="sport-radio-buttons-group">Gendder</FormLabel>
            <RadioGroup
              aria-labelledby="sport-radio-buttons-group-label"
              name="sport-buttons-group"
              value={sex}
              onChange={handSexChange}
            >
              <FormControlLabel value="M" control={<Radio />} label="male" />
              <FormControlLabel value="F" control={<Radio />} label="female" />
            </RadioGroup>
          </FormControl>
        </Box>
          
      </Box>
      <Box height="72vh">
        <ScatterPlotAge sport={sport} sex={sex} />
      </Box>
    </Box>


  )
}

export default AgeDistribution;