import React, { useContext, useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  CssBaseline,
  Box,
  ThemeProvider,
  useTheme,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { customInputTheme } from '../../utils/custom-input-theme';
import { useApi } from '../../hooks/useApi';
import { AccessTokenContext } from '../../context';
import { ProductsResp } from '../../interfaces/product.interface';
import { Slider } from './Slider';

function DetailedProductPage() {
  const outerTheme = useTheme();
  const params = useParams();
  const productId = params.id;
  const { token } = useContext(AccessTokenContext);
  const [productData, setProductData] = useState<ProductsResp | null>(null);

  const [fetchProduct] = useApi(async () => {
    const apiUrl = `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/products/${productId}`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setProductData(data);
  });

  useEffect(() => {
    if (token) {
      fetchProduct();
    }
  }, [token]);

  const slides =
    productData?.masterData.staged.masterVariant.images.map((image) => ({
      image: image.url,
    })) || [];

  return (
    <ThemeProvider theme={customInputTheme(outerTheme)}>
      <Grid container component="main" sx={{ height: '90vh', mt: '10px' }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            ml: '10px',
          }}
        >
          <Grid item xs={12} sm={12} sx={{ m: '5px' }}>
            <Slider slides={slides} />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              {productData && productData.masterData.current.name['en-US']}
            </Typography>
            <Typography variant="body1">
              {productData &&
                productData.masterData.current.description['en-US']}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default DetailedProductPage;
