import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig"
import { Autocomplete, Box, FormControl, TextField } from "@mui/material";
import Header from "../../components/Header";
import GeographyChart from "../../components/GeographyChart";

const Geography = () => {
  const [startYear, setStartYear] = useState("2016");
  const [endYear, setEndYear] = useState("2016");
  const [season, setSeason] = useState("Summer");
  const [reload, setReload] = useState(false);
  const [games, setGames] = useState([]);
  const [subtitle, setSubtitle] = useState("Map of total number of medals per country for the 2016 summer games in Rio");

  useEffect(() => {
  }, [reload]);

  useEffect(() => {
    getGames();  // Get list of games
  }, []);

  const getGames = async () => {
    try {
      const response = await api.get("/games");
      setGames(response.data);
      setGames(games => [{id: 57, eventYear: null, season: "Summer", city: 'Total'}, ...games]);
      setGames(games => [{id: 58, eventYear: null, season: "Winter", city: 'Total'}, ...games]);
      setGames(games => [{id: 59, eventYear: null, season: "Both", city: 'Total'}, ...games]);
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
  };

  const handleGamesChange = (newValue) => {
    if (newValue != null) {
      console.log(newValue);
      setSeason(newValue.season);
      if(newValue.city==="Total"){
        setSubtitle("Total medals by country for the period from 1896 to 2024");
        setStartYear(1896);
        setEndYear(2024);
      } else {
        setSubtitle("Map of total number of medals per country for the " + newValue.eventYear + " " + newValue.season + " games in " + newValue.city);
        setStartYear(newValue.eventYear);
        setEndYear(newValue.eventYear);
      }
      setReload(!reload)
    }
  };

  return (
    <Box className="Content-wrapper" height="92vh" overflow="hidden" >
      <Box p="20px 160px 0px 160px" sx={{ display: 'flex', justifyContent: "space-between" }}>
        <Header title="Medal map" subtitle={subtitle} />
        <Box m="0 0 0 30px" sx={{ display: 'flex' }} >

          {/* Games SELECT DROPDOWN MENU*/}
          <FormControl sx={{ width: 260, marginTop: 2 }}>
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
                    {...optionProps}
                  >
                    {option.city} ({option.season}) {option.eventYear}
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose games"
                  key={params.id}
                />
              )}
              onChange={(event, newValue) => {
                handleGamesChange(newValue);
              }}
            />
          </FormControl>

        </Box>
      </Box>
      <Box overflow="hidden">
        <Box height="92vh">
          <GeographyChart startYear={startYear} endYear={endYear} season={season} reload={reload} isDashboard={false} />
        </Box>
      </Box>
    </Box>


  )
}

export default Geography;