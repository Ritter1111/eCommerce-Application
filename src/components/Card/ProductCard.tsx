import React from 'react';
import { Card, Typography, CardActionArea, CardMedia, CardContent } from '@mui/material';

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

interface ProductData {
  name: { 'en-US': string };
  description: { 'en-US': string };
  masterVariant: {
    images: { url: string }[];
  };
}

interface ProductCardProps {
  data: ProductData;
}

function ProductCard({ data }: ProductCardProps) {
  return (
    <Card sx={{ maxWidth: 300, height: '100%' }}>
      <CardActionArea sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        <CardMedia
          component="img"
          height="300"
          image={data.masterVariant.images[0].url}
          alt={data.name['en-US']}
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" >
              {data.name['en-US']}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {truncateStringToSpace(data.description['en-US'], 100)}
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;