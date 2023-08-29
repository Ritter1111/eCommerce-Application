import React, { useContext, useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  CssBaseline,
  Box,
  ThemeProvider,
  useTheme,
  Button,
  Paper,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { customInputTheme } from '../../utils/custom-input-theme';
import { useApi } from '../../hooks/useApi';
import { AccessTokenContext } from '../../context';
import { ProductsResp } from '../../interfaces/product.interface';
import ProductPrice from '../../components/Price/Price';
import { formatCentsToCurrency } from '../../utils/format-to-cents';
import { Currency } from '../../enums/product.enum';
import { Slider } from '../../utils/Slider';
import styles from './DetailedProductPage.module.css';

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

  const slides =
    productData?.masterData.staged.masterVariant.images.map((image) => ({
      image: image.url,
    })) || [];

  const itemDiscount =
    productData?.masterData.staged.masterVariant.prices[0].discounted;
  const currencyCode =
    productData?.masterData.staged.masterVariant.prices[0].value.currencyCode;
  const currencySymbol = currencyCode === Currency.USD ? '$' : '';
  const itemPriceInCents =
    productData?.masterData.staged.masterVariant.prices[0].value;

  return (
    <ThemeProvider theme={customInputTheme(outerTheme)}>
      <Grid
        container
        justifyContent="center"
        component="main"
        sx={{ height: '90vh', mt: '10px' }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid item xs={12} sm={12} sx={{ m: '5px' }}>
            <Slider slides={slides} />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
            }}
          >
            {itemDiscount ? (
              <Box
                sx={{
                  backgroundColor: '#da0000',
                  color: 'white',
                  width: '60px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body1">DEAL</Typography>
              </Box>
            ) : (
              <></>
            )}
            <Typography variant="h5" component="h1">
              {productData && productData.masterData.current.name['en-US']}
            </Typography>
            <Typography color="text.secondary" sx={{ mr: 1, mt: '10px' }}>
              PRICE:
            </Typography>
            {itemDiscount && currencyCode && itemPriceInCents ? (
              <>
                <ProductPrice
                  itemDiscount={itemDiscount}
                  currencyCode={currencyCode}
                  itemPriceInCents={itemPriceInCents}
                />
              </>
            ) : (
              <Typography sx={{ fontWeight: 'bold' }}>
                {productData &&
                  itemPriceInCents &&
                  formatCentsToCurrency(itemPriceInCents.centAmount)}
                {currencySymbol}
              </Typography>
            )}
            <Typography
              color="text.secondary"
              sx={{ mr: 1, mt: '10px', mb: '5px' }}
            >
              SIZE:
            </Typography>
            <Box display="flex" color="text.secondary">
              <Box sx={{ mr: 4 }}>XXS</Box>
              <Box sx={{ mr: 4 }}>XS</Box>
              <Box sx={{ mr: 4 }}>S</Box>
              <Box sx={{ mr: 4 }}>M</Box>
              <Box sx={{ mr: 4 }}>L</Box>
              <Box sx={{ mr: 4 }}>XL</Box>
              <Box sx={{ mr: 4 }}>XXL</Box>
            </Box>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
              size="small"
              style={{
                backgroundColor: 'black',
                color: 'white',
                marginBottom: '25px',
                fontSize: '0.8rem',
              }}
              className={styles.btn}
            >
              Add to card
            </Button>
            <Typography sx={{ mr: 1, mt: '10px' }}>Description:</Typography>
            <Paper className={styles.scroll} sx={{ boxShadow: 'none' }}>
              <Typography variant="body2" color="text.secondary">
                {productData &&
                  productData.masterData.current.description['en-US']}
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default DetailedProductPage;
