import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig"
import { Autocomplete, Box, Button, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

const MedalsBar = () => {
  const [startYear, setStartYear] = useState("1896");
  const [endYear, setEndYear] = useState("2024");
  const [season, setSeason] = useState("Both");
  const [reload, setReload] = useState(false);
  const [games, setGames] = useState([]);
  const [subtitle, setSubtitle] = useState("Total medals by country for the period from 1896 to 2024");

  useEffect(() => {
  }, [reload]);

  useEffect(() => {
    getGames();  // Get list of games
  }, []);

  const getGames = async () => {
    try {
      const response = await api.get("/games");
      console.log(response.data);
      setGames(response.data);
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
  };

  const handleChange = (event) => {
    setSubtitle("Medals by country for the period from " + startYear + " to " + endYear);
    setReload(!reload)
  };

  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };

  const handleGamesChange = (newValue) => {
    if (newValue != null) {
      console.log(newValue);
      setSeason(newValue.season);
      setStartYear(newValue.eventYear);
      setEndYear(newValue.eventYear);
      setSubtitle("Medals by country for the " + newValue.eventYear + " " + newValue.season + " games in " + newValue.city);
      setReload(!reload)
    }
  };

  return (
    <Box className="Content-wrapper" height="92vh" overflow="auto" >
      <Box p="20px 160px 0px 160px" sx={{ display: 'flex', justifyContent: "space-between" }}>
        <Header title="Medal chart" subtitle={subtitle} />
        <Box m="0 0 0 30px" sx={{ display: 'flex' }} >

          {/* Season select radio buttons */}
          <FormControl sx={{ m: 2 }}>
            <FormLabel id="season-radio-buttons-group">Season</FormLabel>
            <RadioGroup
              aria-labelledby="season-radio-buttons-group-label"
              name="season-buttons-group"
              value={season}
              onChange={handleSeasonChange}
            >
              <FormControlLabel value="Summer" control={<Radio  />} label="summer" />
              <FormControlLabel value="Winter" control={<Radio />} label="winter" />
              <FormControlLabel value="Both" control={<Radio  />} label="both" />
            </RadioGroup>
          </FormControl>

          {/* Games SELECT DROPDOWN MENU*/}
          <FormControl sx={{ width: 260, marginTop:2 }}>
          <Autocomplete
            disablePortal
            options={games}
            getOptionLabel={(option) => option.city}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box
                  key={option.id}
                  component="li"
                  sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  {...optionProps}
                >
                  {option.city} ({option.season}) {option.eventYear}
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose city or fill fields manually"
                key={params.id}
              />
            )}
            onChange={(event, newValue) => {
              handleGamesChange(newValue);
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
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
          </Box>
          <Button
              variant="contained"
              onClick={handleChange}
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