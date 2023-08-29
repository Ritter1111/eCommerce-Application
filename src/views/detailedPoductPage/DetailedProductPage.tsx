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
    console.log(data);
  });

  useEffect(() => {
    if (token) {
      fetchProduct();
    }
  }, [token]);

  return (
    <ThemeProvider theme={customInputTheme(outerTheme)}>
      <Grid container component="main" sx={{ height: '100vh', mt: '30px' }}>
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
          }}
        >
          {productData &&
            productData.masterData.staged.masterVariant.images.length > 0 && (
              <img
                src={productData.masterData.staged.masterVariant.images[0].url}
                alt="Image 0"
                style={{ width: '70%', height: 'auto' }}
              />
            )}
          <Box
            sx={{
              m: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {productData &&
              productData.masterData.staged.masterVariant.images.length > 0 && (
                <img
                  src={
                    productData.masterData.staged.masterVariant.images[1].url
                  }
                  alt="Image 1"
                  style={{ width: '45%', height: 'auto', margin: '5px' }}
                />
              )}
            {productData &&
              productData.masterData.staged.masterVariant.images.length > 0 && (
                <img
                  src={
                    productData.masterData.staged.masterVariant.images[2].url
                  }
                  alt="Image 2"
                  style={{ width: '45%', height: 'auto', margin: '5px' }}
                />
              )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
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
