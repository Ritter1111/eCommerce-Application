import { Box, Typography } from '@mui/material';
import React from 'react';

export default function Size() {
  return (
    <>
      <Typography color="text.secondary" sx={{ mr: 1, mt: '10px', mb: '5px' }}>
        SIZE:
      </Typography>
      <Box justifyContent="space-evenly" display="flex" color="text.secondary">
        <Box>XXS</Box>
        <Box>XS</Box>
        <Box>S</Box>
        <Box>M</Box>
        <Box>L</Box>
        <Box>XL</Box>
        <Box>XXL</Box>
      </Box>
    </>
  );
}
