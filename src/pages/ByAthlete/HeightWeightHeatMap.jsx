import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig"
import { Autocomplete, Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import Header from "../../components/Header";
import HeatMapHeightWeight from "../../components/HeatMapHeightWeight";

const HeightWeightHeatMap = () => {
  const [subtitle, setSubtitle] = useState("Height Weight distribution for male athletes in gymnastics");
  const [sex, setSex] = useState("M");
  const [sport, setSport] = useState("Gymnastics");
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

  const handlePageChange = (newSport, newSex) => {
    // Updates the data on sport change
    setSport(newSport);
    setSex(newSex);
    var sex = (newSex === "M")?"male":"female";
    setSubtitle("Height Weight distribution for " + sex +" athletes in "+ newSport);
  };

  const handSexChange = (event) => {
    setSex(event.target.value);
    var sex = (event.target.value === "M")?"male":"female";
    setSubtitle("Height Weight distribution for " + sex +" athletes in "+ sport);
  };

  return (
    <Box className="Content-wrapper" height="92vh" overflow="auto" >
      <Box p="20px 160px 0px 160px" sx={{ display: 'flex', justifyContent: "center" }}>
        <Header title="HeatMap" subtitle={subtitle} />

        <Box sx={{ display: 'flex', padding: "0 0 0 50px" }}>

          {/* SPORT SELECT DROPDOWN MENU*/}
          <Box sx={{padding: "25px 0 0 0px" }}>
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
          {/* sex select radio buttons */}
          <FormControl sx={{ m: 2 }}>
            {/* <FormLabel id="sex-select-radio-buttons-group">Gendder</FormLabel> */}
            <RadioGroup
              aria-labelledby="sex-select-radio-buttons-group-label"
              name="sex-select-buttons-group"
              value={sex}
              onChange={handSexChange}
            >
              <FormControlLabel value="M" control={<Radio size="small" />} label="male" />
              <FormControlLabel value="F" control={<Radio size="small" />} label="female" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
      <Box p="0px 60px 0px 60px" height="74vh" textAlign="center" >
        <HeatMapHeightWeight sport={sport} sex={sex} />
      </Box>
    </Box>
  )
}

export default HeightWeightHeatMap;