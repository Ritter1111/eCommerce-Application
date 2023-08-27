import React from 'react';
import { Card, Typography, CardActionArea, CardMedia, CardContent, Box } from '@mui/material';
import { Currency } from '../../enums/product.enum';
import { Current } from '../../interfaces/product.interface';

function truncateStringToSpace(str: string, maxLength: number) {
  if (str.length <= maxLength) {
    return str;
  } else {
    const truncatedSubstring = str.substring(0, maxLength);
    const lastSpaceIndex = truncatedSubstring.lastIndexOf(" ");
    const truncatedString = truncatedSubstring.substring(0, lastSpaceIndex);
    return truncatedString + " ...";
  }
}

function formatCentsToCurrency(cents: number) {
  const dollars = Math.floor(cents / 100);
  const centsPart = cents % 100;

  const formattedCents = centsPart < 10 ? `0${centsPart}` : centsPart;

  return `${dollars}.${formattedCents}`;
}

interface ProductCardProps {
  data: Current;
}

function ProductCard({ data }: ProductCardProps) {
  const currencyCode = data.masterVariant.prices[0].value.currencyCode;
  const discount = data.masterVariant.prices[0].discounted;
  const currencySymbol = currencyCode === Currency.USD ? '$' : '';

  return (
    <Card sx={{ maxWidth: 300, height: '100%', boxShadow: 'none', borderRadius: '30px', border: '1px solid #bdbdbd85' }}>
      <CardActionArea sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        <CardMedia
          component="img"
          height="280"
          image={data.masterVariant.images[0].url}
          alt={data.name['en-US']}
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" sx={{fontSize: '1.1rem', lineHeight: '1.1', mb: 1}}>
            {data.name['en-US']}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
            {truncateStringToSpace(data.description['en-US'], 70)}
          </Typography>
          <Box sx={{display: 'flex'}}>
            <Typography  color="text.secondary" sx={{mr: 1}}>
              PRICE:
            </Typography>
            {discount ? (
              <>
                <Typography sx={{fontWeight: 'bold', color: '#da0000', mr: 1}}>
                  {formatCentsToCurrency(discount.value.centAmount)}{currencySymbol}
                </Typography>
                <Typography sx={{textDecoration: 'line-through', fontSize: '14px', color: '#bdbdbd'}}>
                  {formatCentsToCurrency(data.masterVariant.prices[0].value.centAmount)}{currencySymbol}
                </Typography>
              </>
            ) : (
              <Typography sx={{fontWeight: 'bold'}}>
                {formatCentsToCurrency(data.masterVariant.prices[0].value.centAmount)}{currencySymbol}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;