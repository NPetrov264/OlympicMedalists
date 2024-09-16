import { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from 'react-router-dom';
import { tokens } from "../../theme";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AlignHorizontalLeftOutlinedIcon from '@mui/icons-material/AlignHorizontalLeftOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import CalendarTodayOutlineIcon from '@mui/icons-material/CalendarTodayOutlined';
import MonitorWeightOutlinedIcon from '@mui/icons-material/MonitorWeightOutlined';
import HeightOutlinedIcon from '@mui/icons-material/HeightOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}

    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .ps-sidebar-root": {
          border: "none",
        },
        "& .ps-sidebar-container": {
          backgroundColor: `${colors.primary[400]} !important`,
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .ps-menu-button:hover": {
          color: `#868dfb !important`,
          backgroundColor: "transparent !important",
        },
        "& .ps-menu-button.ps-open": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .ps-submenu-content": {
          backgroundColor: "transparent !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="10px"
              >
                <Typography variant="h3" color={colors.grey[100]}>Olympic stats</Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          
          {/* LOGO */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="logo"
                  width="170px"
                  height="100px"
                  src={theme.palette.mode === 'dark' ? "../assets/logo_color_lighter.svg" : "../assets/Olympics-Emblem-smaller.png"}
                  style={{ cursor: "pointer" }}
                />
              </Box> 
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 6px" }}
            >
              By Country
            </Typography>

            <Item
              title="Total Medals"
              to="/medals"
              icon={<AlignHorizontalLeftOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Medals per Capita"
              to="/"
              icon={<PublicOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Country Stats"
              to="/"
              icon={<FlagOutlinedIcon  />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 10px" }}
            >
              By Athlete
            </Typography>
          
            <Item
              title="Top Athletes"
              to="/top-athletes"
              icon={<PeopleOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Age Distribution"
              to="/"
              icon={<CalendarTodayOutlineIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Weight Distribution"
              to="/"
              icon={<MonitorWeightOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Height Distribution"
              to="/"
              icon={<HeightOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;