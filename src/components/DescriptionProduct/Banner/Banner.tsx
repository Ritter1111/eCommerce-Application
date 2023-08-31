import { Typography, Box } from '@mui/material';
import React from 'react';
interface Model {
  color: string;
  label: string;
}
export default function Banner({ color, label }: Model) {
  return (
    <>
      <Box
        sx={{
          backgroundColor: color,
          color: 'white',
          width: '60px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body1">{label}</Typography>
      </Box>
    </>
  );
}
