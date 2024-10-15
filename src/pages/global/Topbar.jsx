import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import SettingsIcon from '@mui/icons-material/Settings';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";


const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate()

  const handleSearch = async (event) => {
    event.preventDefault();
    if (search === '') return;
    navigate('/search-results', { state: { searchTerm: search } })
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (search === '') return;
      navigate('/search-results', { state: { searchTerm: search } })
    }
  }

  return (<Box display="flex" justifyContent="space-between" p={2}>
    {/* Search bar */}
    <Box
      display="flex"
      backgroundColor={colors.primary[400]}
      borderRadius="3px"
      width="260px"
    >
      <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" onChange={e => setSearch(e.target.value)} onKeyDown={handleKeyPress} />
      <IconButton type="button" sx={{ p: 1 }} onClick={handleSearch} >
        <SearchIcon />
      </IconButton>
    </Box>
    {/* Icons */}
    <Box display="flex">
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "dark" ? (
          <DarkModeOutlined />
        ) : (
          <LightModeOutlined />
        )}
      </IconButton>
      <IconButton>
        <SettingsIcon />
      </IconButton>
      <IconButton href="/contact">
        <PersonOutlineIcon />
      </IconButton>
    </Box>
  </Box>);
}

export default Topbar;