import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig"
import { Box, useTheme, Autocomplete, TextField, Toolbar } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";

const TopAthletes = () => {
  const [data, setData] = useState([]);
  const [availableSports, setAvailableSports] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sport, setSport] = useState("All");
  const [country, setCountry] = useState("All");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    //{ field: "id", headerName: "ID" },
    {
      field: 'lineNo', headerName: '#', flex: 0.01, editable: false,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1
    },
    { field: "athleteName", headerName: "Name", flex: 1, cellClassName: "name-column--cell", },
    { field: "sex", headerName: "sex", flex: .04 },
    { field: "noc", headerName: "noc", flex: .08 },
    { field: "team", headerName: "team", flex: .2 },
    { field: "sport", headerName: "sport", flex: .2 },
    { field: "timesParticipated", headerName: "times atended", flex: .12 },
    { field: "goldMedals", headerName: "gold", flex: .06 },
    { field: "silverMedals", headerName: "silver", flex: .06 },
    { field: "bronzeMedals", headerName: "bronze", flex: .06 },
    { field: "medals", headerName: "total medals", flex: .06, cellClassName: "medals-column--cell", },
  ];

  useEffect(() => {
    getAvailableSports();  // Get list of sports
  }, []);

  useEffect(() => {
    getCountries();  // Get list of countries
  }, []);

  useEffect(() => {
    getData(sport, country);  // Fetch data when the component mounts or currentPage changes
  }, [sport, country]);

  const getData = async (sport, country) => {
    setLoading(true);
    try {
      const response = await api.get("/top-athletes", { params: { sport: sport, country: country } }); // Fetch data for the specified page
      console.log(response.data);
      console.log(sport);
      console.log(country);
      setData(response.data);

    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
    setLoading(false);
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

  const getCountries = async () => {
    try {
      const response = await api.get("/countriesList"); // Get all the available sports
      console.log(response.data);
      setCountries(response.data);
      setCountries(countries => ['All', ...countries]);
    } catch (error) {
      console.error('Failed to fetch countries:', error);
    }
  };

  const handlePageChange = (newSport, newCountry) => {
    // Updates the data on sport or country change
    setSport(newSport);
    setCountry(newCountry);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Box m="20px">
      <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
        <Header title="Top Athletes" subtitle="Best athletes from the modern olympics ordered by number of medals" />

        <Box sx={{ display: 'flex', padding: "20px" }}>
          {/* SPORT SELECT DROPDOWN MENU*/}
          <Autocomplete
            disablePortal
            options={availableSports}
            sx={{ width: 180 }}
            renderInput={(params) => <TextField {...params} label="sport" />}
            onChange={(event: any, newValue: string | null) => {
              handlePageChange(newValue, country);
            }}
          />
          {/* Country SELECT DROPDOWN MENU*/}
          <Autocomplete
            disablePortal
            options={countries}
            sx={{ width: 180 }}
            renderInput={(params) => <TextField {...params} label="country" />}
            onChange={(event: any, newValue: string | null) => {
              handlePageChange(sport, newValue);
            }}
          />
        </Box>
      </Box>

      {/* DATA GRID */}
      <Box
        m="10px 0 0 0"
        height="79vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          // "& .name-column--cell": {
          //   color: colors.greenAccent[200],
          // },
          "& .medals-column--cell": {
            fontWeight: 700
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-scrollbarFiller": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiButtonBase-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          //paginationMode="server"
          rows={data}
          columns={columns}
          //density="compact"
          pageSizeOptions={[25, 50, 100]}
          initialState={{
            ...data.initialState,
            pagination: { paginationModel: { pageSize: 25 } },
            density: "compact",
          }}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </Box>
    </Box>
  )
}

export default TopAthletes;