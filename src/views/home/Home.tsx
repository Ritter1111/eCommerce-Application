import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CardPromoCode from './CardPromoCode';
import Slideshow from './slider/Slider-Home';

const Home = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          mt: 4,
          mb: 4,
          pr: 4,
          pl: 4,
        }}
      >
        <Slideshow />
      </Box>
      <Box margin="40px">
        <Typography variant="h4">Available Promocodes:</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <CardPromoCode
              title="discount for orders over 300$"
              promocode="FormulaOne"
            />
          </Grid>
          <Grid item xs={6}>
            <CardPromoCode
              title="10% for all mens shirts for orders over 400$"
              promocode="Fire"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
