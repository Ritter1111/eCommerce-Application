import { Link } from '@mui/material';
import React from 'react';

export default function RemoveCart() {
  return (
    <Link component="button" sx={{ color: 'black', textDecoration: 'none' }}>
      Delete all items
    </Link>
  );
}
