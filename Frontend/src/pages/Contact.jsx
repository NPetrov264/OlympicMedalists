import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';

const Contact = (() => {

  return (
    <Box className="Content-wrapper" m="60px" textAlign="center" display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    height="50vh"
    >
      <Typography variant="h4" gutterBottom>
        Contact Me
      </Typography>
      <Box marginTop={2}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Email />}
          href="mailto:n.petrov264@gmail.com"
        >
          Email
        </Button>
      </Box>
      <Box marginTop={2}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<GitHub />}
          href="https://github.com/NPetrov264"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Button>
      </Box>
      <Box marginTop={2}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<LinkedIn />}
          href="https://www.linkedin.com/in/nikola-petrov-134133290/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </Button>
      </Box>
    </Box>
  );
});

export default Contact;
