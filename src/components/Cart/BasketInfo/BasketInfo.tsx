import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import AddToCart from '../../DescriptionProduct/AddToCart/AddToCart';
import styles from './BasketInfo.module.css';
import { ICartData } from '../../../interfaces/auth.interface';
import { formatCentsToCurrency } from '../../../utils/format-to-cents';
import RemoveCart from '../RemoveCart/RemoveCart';
// import AlertDialog from '../ConfirmationDialog/ConfirmationDialog';

export default function BasketInfo({ data }: ICartData) {
  return (
    <>
      <Typography variant="h4" sx={{ mb: '20px', mt: '13vh' }}>
        Your Order:
      </Typography>
      <Box
        display="flex"
        sx={{
          color: '#555555',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" sx={{ mb: '10px' }}>
          Quantity of goods:
        </Typography>
        <Typography variant="h5">
          {data && data.totalLineItemQuantity}
        </Typography>
      </Box>
      <Box
        display="flex"
        sx={{
          color: '#555555',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" sx={{ mb: '10px' }}>
          Cost order:
        </Typography>
        <Typography variant="h5">
          {data && formatCentsToCurrency(data.totalPrice.centAmount)} $
        </Typography>
      </Box>
      <TextField
        type="text"
        label="Enter promocode number"
        variant="standard"
        fullWidth
        margin="normal"
        sx={{ mb: '20px' }}
        InputProps={{
          endAdornment: (
            <Button
              variant="text"
              size="small"
              style={{
                color: 'black',
                marginBottom: '5px',
                fontSize: '0.8rem',
              }}
              // onClick={ApplyPromoCode}
            >
              Apply
            </Button>
          ),
        }}
      />
      <Box
        display="flex"
        sx={{
          color: '#555555',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" sx={{ mb: '10px' }}>
          Amount to be paid:
        </Typography>
        <Typography variant="h5">
          {data && formatCentsToCurrency(data.totalPrice.centAmount)} $
        </Typography>
      </Box>
      <AddToCart name="Checkout" />
      <Box
        display="flex"
        sx={{
          color: '#555555',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Link to="/catalog" className={styles.link}>
          Continue shopping
        </Link>
        <RemoveCart />
      </Box>
    </>
  );
}
