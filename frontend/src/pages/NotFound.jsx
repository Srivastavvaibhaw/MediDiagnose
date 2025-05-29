// src/pages/NotFound.jsx
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          textAlign: 'center',
          py: 8
        }}
      >
        <Typography variant="h1" component="h1" sx={{ fontSize: '6rem', fontWeight: 700, color: '#4361ee' }}>
          404
        </Typography>
        <Typography variant="h4" component="h2" sx={{ mb: 3, color: '#1e293b' }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: '#475569', maxWidth: '500px' }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2 }}
        >
          Return to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
