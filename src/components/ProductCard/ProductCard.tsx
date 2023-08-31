import React from 'react';
import {
  Card,
  Typography,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
} from '@mui/material';
import { Currency } from '../../enums/product.enum';
import { IProductCardProps } from '../../interfaces/product.interface';
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

function ProductCard(props: IProductCardProps) {
  const navigate = useNavigate();
  const data = props.data;
  const currencyCode = data.masterVariant.prices[0].value.currencyCode;
  const itemDiscount = data.masterVariant.prices[0].discounted;
  const itemName = data.name['en-US'];
  const itemDeskr = data.description['en-US'];
  const iremPriceInCents = data.masterVariant.prices[0].value;
  const currencySymbol = currencyCode === Currency.USD ? '$' : '';

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
          height: '100%',
        }}
        onClick={() => navigate(`/catalog/${props.id}`)}
      >
        <CardMedia
          component="img"
          height="280"
          image={data.masterVariant.images[0].url}
          alt={itemName}
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
            {itemName}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {truncateStringToSpace(itemDeskr, 70)}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography color="text.secondary" sx={{ mr: 1 }}>
              PRICE:
            </Typography>
            {itemDiscount ? (
              <ProductPrice
                itemDiscount={itemDiscount}
                currencyCode={currencyCode}
                itemPriceInCents={iremPriceInCents}
              />
            ) : (
              <Typography sx={{ fontWeight: 'bold' }}>
                {formatCentsToCurrency(iremPriceInCents.centAmount)}
                {currencySymbol}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
