import { Box, Button, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { ICartData, ILineItem } from '../../interfaces/auth.interface';
import styles from './BasketItems.module.css';
import PriceItem from './PriceItem/PriceItem';
import { СartQuantityContext } from '../../context';
import { removeItem } from './RemoveItem-Api';

export default function BasketItems({ data }: ICartData) {
  const { setCartQuantity } = useContext(СartQuantityContext);
  
  const returnIdProduct = async (itemProduct: ILineItem) => {
    await removeItem(itemProduct, setCartQuantity)
  }

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
                  width: '190px',
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
                <Button sx={{ mt: 'auto', p: '10px' }} onClick={() => returnIdProduct(item)}>Remove</Button>
              </Box>
            </Box>
          </div>
        );
      })}
    </Box>
  );
}

