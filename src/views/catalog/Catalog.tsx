import React, { useContext, useEffect, useState } from 'react';
import { AccessTokenContext } from '../../context';
import { CircularProgress, Container, Typography, Grid } from '@mui/material';
import { IProductsResp } from '../../interfaces/product.interface';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useApi } from '../../hooks/useApi';

function Catalog() {
  const [carts, setCarts] = useState<IProductsResp[]>([]);
  const { token } = useContext(AccessTokenContext);

  const [fetchCarts, isLoading, cartsError] = useApi(async () => {
    const apiUrl = `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/products`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setCarts(data.results);
  });

  useEffect(() => {
    if (token) {
      fetchCarts();
    }
  }, [token]);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h1"
        align="center"
        sx={{ fontSize: '48px', mt: 4, mb: 4 }}
      >
        Our products
      </Typography>
      {cartsError && (
        <Typography align="center" variant="h4">
          Oops, something went wrong. Please try again later.
        </Typography>
      )}
      {isLoading ? (
        <CircularProgress
          style={{ width: '70px', height: '70px' }}
          color="inherit"
          sx={{ margin: '0 auto', display: 'block' }}
        />
      ) : (
        <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
          {carts.map((el) => (
            <Grid item key={el.id} sx={{ maxWidth: 300, margin: '0 auto' }}>
              {<ProductCard id={el.id} data={el.masterData.current} />}
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Catalog;
