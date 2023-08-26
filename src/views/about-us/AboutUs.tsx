import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const AboutUs = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h1" align="center" sx={{ fontSize: '48px', mt: 4 }}>
        About Us
      </Typography>
      <Box
        sx={{ maxWidth: '900px', textAlign: 'center', margin: '0 auto', mt: 2 }}
      >
        <Typography paragraph>
          Welcome to EthnoWear, your ultimate destination for authentic
          Ukrainian national clothing and accessories.
        </Typography>
        <Typography paragraph>
          Our passion for preserving the rich cultural heritage of Ukraine
          drives us to bring you the finest collection of traditional attire
          that reflects the history, craftsmanship, and spirit of this beautiful
          nation.
        </Typography>
        <Typography paragraph sx={{ fontStyle: 'italic' }}>
          Thank you for choosing EthnoWear as your destination for Ukrainian
          national clothing and accessories. Explore our collection and let us
          help you make history a part of your wardrobe.
        </Typography>
        <Typography>Be Brave Like Ukraine!</Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
