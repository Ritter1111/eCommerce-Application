import { ShoppingBag } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

export default function EmptyCartMessage() {
  return (
    <Box
      sx={{
        mt: '40vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ShoppingBag fontSize="large" sx={{ color: '#212121' }} />
      <Typography align="center" variant="h6">
        Your cart is empty
      </Typography>
    </Box>
  );
}





