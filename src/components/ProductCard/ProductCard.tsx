import React, { useState } from 'react';
import {
  Card,
  Typography,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
  Button,
  CardActions,
} from '@mui/material';
import { Currency } from '../../enums/product.enum';
import { IProductCartItem } from '../../interfaces/product.interface';
import { useNavigate } from 'react-router-dom';
import { formatCentsToCurrency } from '../../utils/format-to-cents';
import ProductPrice from '../Price/Price';

export function truncateStringToSpace(str: string, maxLength: number) {
  if (str.length <= maxLength) {
    return str;
  } else {
    const truncatedSubstring = str.substring(0, maxLength);
    const lastSpaceIndex = truncatedSubstring.lastIndexOf(' ');
    const truncatedString = truncatedSubstring.substring(0, lastSpaceIndex);
    return truncatedString + ' ...';
  }
}

function ProductCard({ item }: { item: IProductCartItem }) {
  const navigate = useNavigate();
  const [isAddToCart, setIsAddToCart] = useState(false);
  const currencySymbol = item.currencyCode === Currency.USD ? '$' : '';

  return (
    <Card
      sx={{
        maxWidth: 250,
        height: '100%',
        boxShadow: 'none',
        borderRadius: '10px',
        border: '1px solid #bdbdbd85',
      }}
    >
      <CardActionArea
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '90%',
        }}
        onClick={() => navigate(`/catalog/${item.id}`)}
      >
        <CardMedia
          component="img"
          height="280"
          image={item.imageUrl}
          alt={item.itemName}
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexGrow: 1,
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            sx={{ fontSize: '1.1rem', lineHeight: '1.1', mb: 1 }}
          >
            {item.itemName}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {truncateStringToSpace(item.itemDeskr, 70)}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography color="text.secondary" sx={{ mr: 1 }}>
              PRICE:
            </Typography>
            {item.itemDiscounted ? (
              <ProductPrice
                itemDiscount={item.itemDiscounted}
                currencyCode={item.currencyCode}
                itemPriceInCents={item.itemPriceInCents}
              />
            ) : (
              <Typography sx={{ fontWeight: 'bold' }}>
                {formatCentsToCurrency(item.itemPriceInCents)}
                {currencySymbol}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={() => setIsAddToCart(true)}
          variant="contained"
          style={{ backgroundColor: !isAddToCart ? 'black' : 'lightgrey'}}
          fullWidth
          size="small"
          disabled={!isAddToCart ? false : true}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
