import React, { useContext, useEffect, useState } from 'react';
import { AccessTokenContext } from '../../context';
import { CircularProgress, Container, Typography, Grid } from '@mui/material';
import { IProductsResp } from '../../interfaces/product.interface';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useApi } from '../../hooks/useApi';
import ProductsCategories from '../../components/ProdutsCategories/ProductsCategories';
import { ICategoryResp } from '../../interfaces/productsCategory.interface';
import {
  convertProductCartItemAll,
  convertProductCartItemCategory,
} from './productDataConverter';

function Catalog() {
  const [cards, setCards] = useState<IProductsResp[] | ICategoryResp[]>([]);
  const [categories, setCategories] = useState([]);
  const [productCategoryName, setProductCategoryName] = useState('');

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
    setProductCategoryName('All products');
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
    <>
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
            <ProductsCategories
              fetchcards={fetchcards}
              categoriesData={categories}
              setCards={setCards}
              setProductCategoryName={setProductCategoryName}
            />
            {cards && cards.length > 0 ? (
              <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
                {cards.map((card) => {
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
                Sorry, but there are currently no products in this category
              </Typography>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default Catalog;
