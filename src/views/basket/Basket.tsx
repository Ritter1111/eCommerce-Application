import { ThemeProvider } from '@emotion/react';
import { Grid, useTheme, Typography, Box } from '@mui/material';
import React from 'react';
import { customInputTheme } from '../../utils/custom-input-theme';
import BasketItems from '../../components/BasketItems/BasketItems';
import BasketInfo from '../../components/BasketInfo/BasketInfo';
import { ShoppingBag } from '@mui/icons-material';

export default function Basket() {
  const outerTheme = useTheme();
  const data = JSON.parse(localStorage.getItem('cartData') || '');

  return (
    <ThemeProvider theme={customInputTheme(outerTheme)}>
      {data.lineItems.length > 0 ? (
        <Grid
          container
          justifyContent="center"
          component="main"
          sx={{ mt: '30px' }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={7}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
            }}
          >
            <Grid item xs={12} sm={12} sx={{ m: '5px' }}>
              <BasketItems data={data} />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              '@media (max-width: 900px)': {
                alignItems: 'center',
              },
            }}
          >
            <BasketInfo />
          </Grid>
        </Grid>
      ) : (
        <>
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
        </>
      )}
    </ThemeProvider>
  );
}
