// src/components/common/Loading.jsx
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import '../../styles/components/common/Loading.css';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <Box className="loading-container">
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h6" className="loading-text">
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;
