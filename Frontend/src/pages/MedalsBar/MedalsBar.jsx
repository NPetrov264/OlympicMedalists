import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig"
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

const MedalsBar = () => {
  const [startYear, setStartYear] = useState("1896");
  const [endYear, setEndYear] = useState("2024");
  const [season, setSeason] = React.useState("Both");
  const [summer, setSummer] = React.useState(true);
  const [winter, setWinter] = React.useState(true);
  const [reload, setReload] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    // Add your code here
    //handlePageChange = (startYear, endYear, season)
  }, [reload]);

  const handleChange = (event) => {
    setSummer(event.target.checked);
    if(event.target.checked && winter) {
      setSeason("Both");
    } else {
      setSeason(event.target.checked?"Summer":"Winter");
    }
  };

  const handleChangeWinter = (event) => {
    setWinter(event.target.checked);
    if(event.target.checked && summer) {
      setSeason("Both");
    } else {
      setSeason(event.target.checked?"Winter":"Summer");
    }
  };

  // const handlePageChange = (startYear, endYear) => {
  //   // Updates the data on year or season change
  //   setStartYear(startYear);
  //   setEndYear(endYear);
  //   if(summer && winter)
  //     setSeason("Both");
  //   else if(summer)
  //     setSeason("Summer");
  //   else setSeason("Winter");
  // };

  return (
    <Box m="20px" height="92vh" overflow="auto" >
      <Box m="0px 160px 0px 160px" sx={{ display: 'flex', justifyContent: "space-between" }}>
        <Header title="Medal chart" subtitle="Total medals by country for the period from {startYear} to {endYear}" />
        <Box sx={{ display: 'flex' }} >
          {/* Season select radio buttons */}
          {/* <FormControl>
            <FormLabel id="season-radio-buttons-group">Season</FormLabel>
            <RadioGroup
            // aria-labelledby="season-radio-buttons-group"
            // name="season-radio-buttons-group"
            // value={season}
            // onChange={handlePageChange(startYear, endYear, season)}
            >
              <FormControlLabel value="sumemr" control={<Radio />} label="summer" />
              <FormControlLabel value="winter" control={<Radio />} label="winter" />
            </RadioGroup>
          </FormControl> */}

          <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
            {/* <FormLabel component="legend">Season</FormLabel> */}
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={summer} onChange={handleChange} name="summer" />
                }
                label="summer"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={winter} onChange={handleChangeWinter} name="winter" />
                }
                label="winter"
              />
            </FormGroup>
          </FormControl>
          <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
            <TextField
              id="test-field_startYear"
              label="From"
              size="small"
              variant="filled"
              value={startYear}
              onChange={(event) => {
                setStartYear(event.target.value);
              }}
            />
            <TextField
              id="test-field_endYear"
              label="To"
              size="small"
              variant="filled"
              value={endYear}
              onChange={(event) => {
                setEndYear(event.target.value);
              }}
            />
            <Button
              variant="contained"
              onClick={() => setReload(!reload)}
              >Reload</Button>
          </FormControl>
          {/* <Autocomplete
            disablePortal
            value={sport}
            options={availableSports}
            sx={{ width: 180 }}
            renderInput={(params) => <TextField {...params} label="sport" />}
            onChange={(event: any, newValue: string | null) => {
              handlePageChange(newValue, country);
            }}
          /> */}
          {/* Country SELECT DROPDOWN MENU*/}
          {/* <Autocomplete
            disablePortal
            value={country}
            options={countries}
            sx={{ width: 180 }}
            renderInput={(params) => <TextField {...params} label="country" />}
            onChange={(event: any, newValue: string | null) => {
              handlePageChange(sport, newValue);
            }}
          /> */}
        </Box>
      </Box>
      <Box height="9600px" maxWidth="98%">
      <BarChart startYear={startYear} endYear={endYear} season={season} reload={reload}/>
      </Box>
    </Box>


  )
}

export default MedalsBar;