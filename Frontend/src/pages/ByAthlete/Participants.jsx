import React, { useEffect, useState } from "react";
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import Header from "../../components/Header";
import BarChartParticipants from "../../components/BarChartParticipants";

const Participants = () => {
  const [subtitle, setSubtitle] = useState("Number of participants in the modern olympic games divided by gender");
  const [season, setSeason] = useState("Summer");

  useEffect(() => {
  }, []);

  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Box className="Content-wrapper" height="92vh" overflow="auto" p="20px 160px 0px 160px">
      <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
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
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
      <Box height="72vh">
        <BarChartParticipants season={season} />
      </Box>
    </Box>


  )
}

export default Participants;