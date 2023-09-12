import { Box } from '@mui/material';
import React from 'react';
import { ILineItemData } from '../../../../interfaces/auth.interface';
import { formatCentsToCurrency } from '../../../../utils/format-to-cents';

export default function PriceItem({ item }: ILineItemData) {
  return (
    <div>
      {item.price.discounted ? (
        <Box sx={{ mb: '10px' }}>
          Price:{' '}
          {formatCentsToCurrency(item.price.discounted?.value.centAmount)} $
        </Box>
      ) : (
        <Box sx={{ mb: '10px' }}>
          Price: {formatCentsToCurrency(item.price.value.centAmount)} $
        </Box>
      )}
      <Box sx={{ mb: '10px' }}>
        Sum: {formatCentsToCurrency(item.totalPrice.centAmount)} $
      </Box>
    </div>
  );
}
