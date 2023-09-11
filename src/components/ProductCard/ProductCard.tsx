import React, { useContext, useState } from 'react';
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
import {
  formatCentsToCurrency,
  truncateStringToSpace,
} from '../../utils/product';
import ProductPrice from '../Price/Price';
import { AuthContext, СartQuantityContext } from '../../context';
import { getAnonToken, updateCart } from '../../views/basket/Api-Cart';

function ProductCard({ item }: { item: IProductCartItem }) {
  const { isAuth } = useContext(AuthContext);
  const { setCartQuantity } = useContext(СartQuantityContext);
  const navigate = useNavigate();
  const [isAddToCart, setIsAddToCart] = useState(false);
  const currencySymbol = item.currencyCode === Currency.USD ? '$' : '';

  async function handleAddToCart(prodactId: string) {
    setIsAddToCart(true),
      isAuth
        ? updateCart(prodactId, setCartQuantity)
        : localStorage.getItem('anonToken')
        ? updateCart(prodactId, setCartQuantity)
        : (await getAnonToken(), updateCart(prodactId, setCartQuantity));
  }

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
          onClick={() => handleAddToCart(item.id)}
          variant="contained"
          style={{ backgroundColor: !isAddToCart ? 'black' : 'lightgrey' }}
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
