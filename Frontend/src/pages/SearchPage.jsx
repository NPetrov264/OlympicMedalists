import React, { useEffect, useState } from 'react'
import { Box, Button, Link, Typography, useTheme } from '@mui/material';
import { tokens } from '../theme';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';

const SearchResults = (() => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [results, setResults] = useState([]);
  const [subtitle,setSubtitle] = useState("");
  const {state} = useLocation();
  const { searchTerm } = state; // Read values passed on state

  const handleSearch = async (search) => {

    const endpoint = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=' + search;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();

    setSubtitle("search results for " + search)
    setResults(json.query.search);
  }

  useEffect(() => {
    handleSearch(searchTerm); 
  }, [searchTerm]);

  return (
    <Box className="Content-wrapper" p="20px 60px 0px 60px" height="92vh" overflow="auto" display="flex" justifyContent="center" >
      <Box maxWidth="800px" >
        <Header title="Wiki Results" subtitle={subtitle} />
        <Box className="searchResults" >

          {results.map((result, index) => {

            const url = "https://en.wikipedia.org/?curid=" + result.pageid;

            return (
              <Box
                className="result"
                key={index}
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                m="20px 0"
              >
                <Box width="100%" m="20px 30px">
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ color: colors.grey[100] }}
                      >
                        {result.title}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mt="2px">
                    <Typography variant="h5" sx={{ color: colors.grey[300] }}>
                      <p dangerouslySetInnerHTML={{ __html: result.snippet }} ></p>
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="end">
                    <Button component={Link} href={url} rel="noreferrer"
                      sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: "12px",
                        fontWeight: "bold",
                        padding: "4px 10px",
                        justifySelf: "end"
                      }}
                    >
                      Read more
                    </Button>
                  </Box>
                </Box>

              </Box>
            )
          })}

        </Box>
      </Box>
    </Box>
  )
});

export default SearchResults;