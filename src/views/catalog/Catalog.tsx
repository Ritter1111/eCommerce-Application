import React, { useContext, useEffect, useState } from 'react';
import { AccessTokenContext } from '../../context';
import { CircularProgress, Container, Typography, Grid } from '@mui/material';
import { Root } from '../../interfaces/product.interface';
import ProductCard from '../../components/Card/ProductCard';


function Catalog() {
  const [carts, setCarts]= useState<Root[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(AccessTokenContext);

  useEffect(() => {
    setIsLoading(true);
    if (token) {
      const apiUrl = `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/products`;
      fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => setCarts(data.results))
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => setIsLoading(false))
    }
  }, [token]);

  /* useEffect(() => {
    if (carts && carts.length > 0) {
      carts.forEach(element => {
        console.log(element);
      });
    }
  }, [carts]); */

  return (
    <Container maxWidth="lg">
      <Typography variant="h1" align="center" sx={{ fontSize: '48px', mt: 4, mb: 4 }}>Our products</Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {
            carts.map((el: Root) => (
              <Grid item xs={12} sm={4} md={4} key={el.lastVariantId}>
                {<ProductCard data={el.masterData.current}/>}
              </Grid>
            ))
          }
        </Grid>
      )
      }
    </Container>
  );
}

export default Catalog;


