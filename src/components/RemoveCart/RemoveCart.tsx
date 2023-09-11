import { Link } from '@mui/material';
import React from 'react';
// import { removeBasket } from './Api-RemoveCart';

export default function RemoveCart() {
  // const handleRemoveCart = async () => {
  //   // await removeBasket();
  // };

  return (
    <Link component="button" sx={{ color: 'black', textDecoration: 'none' }}>
      Delete all items
    </Link>
  );
}
