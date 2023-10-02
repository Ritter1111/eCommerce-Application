import React from 'react';
import { Box } from '@mui/material';

export interface IPromoCodeData {
  title: string;
  promocode: string;
}

export default function CardPromoCode({ title, promocode }: IPromoCodeData) {
  return (
    <>
      <Box fontSize="20px">{title}:</Box>
      <Box fontSize="25px">{promocode}</Box>
    </>
  );
}

