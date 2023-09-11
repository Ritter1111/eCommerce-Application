import { ThemeProvider } from '@emotion/react';
import { Grid, useTheme } from '@mui/material';
import React, { useContext } from 'react';
import { customInputTheme } from '../../utils/custom-input-theme';
import BasketItems from '../../components/BasketItems/BasketItems';
import BasketInfo from '../../components/BasketInfo/BasketInfo';
import { AuthContext } from '../../context';
import EmptyCartMessage from './EmptyCart/EmptyCart';

export default function Basket() {
  const outerTheme = useTheme();
  const { isAuth } = useContext(AuthContext);
  const cartData = localStorage.getItem('cartData');
  const anonCartData = localStorage.getItem('anonCartData');

  const data = cartData ? JSON.parse(cartData) : null;
  const dataAnonim = anonCartData ? JSON.parse(anonCartData) : null;
  console.log(dataAnonim);

  return (
    <ThemeProvider theme={customInputTheme(outerTheme)}>
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
            alignItems: 'center',
          }}
        >
          <Grid item xs={12} sm={12} sx={{ m: '5px' }}>
            {isAuth ? (
              data.lineItems.length > 0 ? (
                <BasketItems data={data} />
              ) : (
                <EmptyCartMessage />
              )
            ) : (
              anonCartData ? (
                <BasketItems data={dataAnonim} />
              ) : (
                <EmptyCartMessage />
              )
            )}
          </Grid>
        </Grid>
        {anonCartData ? (
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
              padding: '30px'
            },
          }}
        >
          <BasketInfo />
        </Grid>
        ) : (
          <></>
        )}
        
      </Grid>
    </ThemeProvider>
  );
}