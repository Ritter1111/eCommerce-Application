import React from 'react';
import { Button } from '@mui/material';
import styles from '../DescriptionProduct.module.css';

export default function AddToCart() {
  return (
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
      Add to cart
    </Button>
  );
}
