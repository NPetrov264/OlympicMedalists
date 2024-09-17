import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

const MedalsBar = () => {
  const [startYear, setStartYear] = useState("1896");
  const [endYear, setEndYear] = useState("2024");
  const [season, setSeason] = React.useState("Both");
  const [reload, setReload] = useState(false);
  const [subtitle, setSubtitle] = useState("Total medals by country for the period from 1896 to 2024");

  const handleChange = (event) => {
      setSeason(event.target.value);
  };

  useEffect(() => {
    setSubtitle("Total medals by country for the period from " + startYear + " to " + endYear);
  }, [reload]);

  return (
    <Box className="Content-wrapper" height="92vh" overflow="auto" >
      <Box p="20px 160px 0px 160px" sx={{ display: 'flex', justifyContent: "space-between" }}>
        <Header title="Medal chart" subtitle={subtitle} />
        <Box m="0 0 0 30px" sx={{ display: 'flex' }} >
          
          {/* Season select radio buttons */}
          <FormControl sx={{ m: 1 }}>
            <FormLabel id="season-radio-buttons-group">Season</FormLabel>
            <RadioGroup
              aria-labelledby="season-radio-buttons-group-label"
              defaultValue="Both"
              name="season-buttons-group"
            >
              <FormControlLabel value="Summer" control={<Radio onClick={handleChange}/>} label="summer" />
              <FormControlLabel value="Winter" control={<Radio onClick={handleChange}/>} label="winter" />
              <FormControlLabel value="Both" control={<Radio onClick={handleChange}/>} label="both" />
            </RadioGroup>
          </FormControl>

          {/* Year select text fields */}
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
        </Box>
      </Box>
      <Box height="100%">
        <BarChart startYear={startYear} endYear={endYear} season={season} reload={reload} />
      </Box>
    </Box>


  )
}

export default MedalsBar;