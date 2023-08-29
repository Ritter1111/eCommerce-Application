import React from 'react';
import Typography from '@mui/material/Typography';
import { formatCentsToCurrency } from '../../utils/format-to-cents';
import { Currency } from '../../enums/product.enum';
import { ProductPriceProps } from '../../interfaces/product.interface';

const ProductPrice: React.FC<ProductPriceProps> = ({
  itemDiscount,
  currencyCode,
  itemPriceInCents,
}) => {
  const currencySymbol = currencyCode === Currency.USD ? '$' : '';

  return (
    <>
      <Typography sx={{ fontWeight: 'bold', color: '#da0000', mr: 1 }}>
        {formatCentsToCurrency(itemDiscount.value.centAmount)}
        {currencySymbol}
      </Typography>
      <Typography
        sx={{
          textDecoration: 'line-through',
          fontSize: '14px',
          color: '#bdbdbd',
        }}
      >
        {formatCentsToCurrency(itemPriceInCents.centAmount)}
        {currencySymbol}
      </Typography>
    </>
  );
};

export default ProductPrice;
