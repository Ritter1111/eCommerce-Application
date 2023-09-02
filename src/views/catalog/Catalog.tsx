import React, { useContext, useEffect, useState } from 'react';
import { AccessTokenContext } from '../../context';
import { CircularProgress, Container, Typography, Grid } from '@mui/material';
import { IProductsResp } from '../../interfaces/product.interface';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useApi } from '../../hooks/useApi';
import ProductsCategories from '../../components/ProdutsCategories/ProductsCategories';
import { ICategoryResp } from '../../interfaces/productsCategory.interface';

function convertProductCartItemAll(currentElData: IProductsResp) {
  return {
    id: currentElData.id,
    currencyCode:
      currentElData.masterData.current.masterVariant.prices[0].value
        .currencyCode,
    itemDiscounted:
      currentElData.masterData.current.masterVariant.prices[0].discounted,
    itemPriceInCents:
      currentElData.masterData.current.masterVariant.prices[0].value.centAmount,
    itemName: currentElData.masterData.current.name['en-US'],
    itemDeskr: currentElData.masterData.current.description['en-US'],
    imageUrl: currentElData.masterData.current.masterVariant.images[0].url,
  };
}

function convertProductCartItemCategory(currentElData: ICategoryResp) {
  return {
    id: currentElData.id,
    currencyCode: currentElData.variants[0].prices[0].value.currencyCode,
    itemDiscounted: currentElData.variants[0].prices[0].discounted,
    itemPriceInCents: currentElData.variants[0].prices[0].value.centAmount,
    itemName: currentElData.name['en-US'],
    itemDeskr: currentElData.description['en-US'],
    imageUrl: currentElData.variants[0].images[0].url,
  };
}

function Catalog() {
  const [cards, setCards] = useState<IProductsResp[] | ICategoryResp[]>([]);
  const [categories, setCategories] = useState([]);
  const [productCategoryName, setProductCategoryName] = useState('All products');
  const { token } = useContext(AccessTokenContext);


  const [fetchcards, isLoading, cardsError] = useApi(async () => {
    const apiUrl = `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/products`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const res: IProductsResp[] = data.results;
    setCards(res);
  });

  const [fetchCategories, isLoadingCategories, categoriesError] = useApi(
    async () => {
      const apiUrl = `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/categories`;
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCategories(data.results);
    }
  );

  useEffect(() => {
    if (token) {
      fetchcards();
      fetchCategories();
    }
  }, [token]);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h2"
        align="center"
        sx={{ fontSize: '48px', mt: 4, mb: 4 }}
      >
        {productCategoryName}
      </Typography>
      {(cardsError || categoriesError) && (
        <Typography align="center" variant="h4">
          Oops, something went wrong. Please try again later.
        </Typography>
      )}
      {isLoading || isLoadingCategories ? (
        <CircularProgress
          style={{ width: '70px', height: '70px' }}
          color="inherit"
          sx={{ margin: '0 auto', display: 'block' }}
        />
      ) : (
        <>
          <ProductsCategories allCategories={categories} setCards={setCards} setProductCategoryName={setProductCategoryName}/>
          {cards.length > 0 ? (
            <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
              {cards.map((el) => (
                <Grid item key={el.id} sx={{ maxWidth: 300, margin: '0 auto' }}>
                  {
                    <ProductCard
                      item={
                        el.variants
                          ? convertProductCartItemCategory(el as ICategoryResp)
                          : convertProductCartItemAll(el as IProductsResp)
                      }
                    />
                  }
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="h4" align="center">
              Sorry, but there are currently no products in this category
            </Typography>
          )}
        </>
      )}
    </Container>
  );
}

export default Catalog;
