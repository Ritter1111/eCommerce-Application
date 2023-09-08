import { Grid, Typography } from '@mui/material';
import React from 'react'
import ProductCard from '../ProductCard/ProductCard';
import { convertProductCartItemAll, convertProductCartItemCategory } from '../../views/catalog/productDataConverter';
import { ICategoryResp } from '../../interfaces/productsCategory.interface';
import { IProductsList, IProductsResp } from '../../interfaces/product.interface';

function ProductsList({ productCards }: IProductsList) {
  return (
    <>
    {productCards && productCards.length > 0 ? (
      <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
        {productCards.map((card) => {
          const isCategoriesCards = card.variants;
          return (
            <Grid
              item
              key={card.id}
              sx={{ maxWidth: 300, margin: '0 auto' }}
            >
              {
                <ProductCard
                  item={
                    isCategoriesCards
                      ? convertProductCartItemCategory(
                          card as ICategoryResp
                        )
                      : convertProductCartItemAll(card as IProductsResp)
                  }
                />
              }
            </Grid>
          );
        })}
      </Grid>
    ) : (
      <Typography variant="h5" align="center">
        Nothing found. Sorry, but there are currently no products.
      </Typography>
    )}
    </>
  )
}

export default ProductsList