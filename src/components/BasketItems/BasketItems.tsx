import { Box, Typography } from '@mui/material';
import React from 'react';
import { ICartData } from '../../interfaces/auth.interface';
import styles from './BasketItems.module.css';
import PriceItem from './PriceItem/PriceItem';

export default function BasketItems({ data }: ICartData) {
  console.log(data.lineItems);

  return (
    <Box>
      {data.lineItems.map((item, index) => {
        return (
          <div key={index}>
            <Box display="flex" marginBottom="20px">
              <img
                src={item.variant.images[0].url}
                alt=""
                className={styles.image}
              />
              <Box
                sx={{
                  m: '10px',
                  ml: '30px',
                  width: '28%',
                  display: 'flex',
                  flexDirection: 'column',
                  color: '#555555',
                }}
              >
                <Typography sx={{ mb: '17px' }}>
                  {item.name['en-US']}
                </Typography>
                <PriceItem item={item} />
                <Box>Q-ty: - 1 +</Box>
                <Box sx={{ mt: '100%', p: '10px' }}>Remove</Box>
              </Box>
            </Box>
          </div>
        );
      })}
    </Box>
  );
}
