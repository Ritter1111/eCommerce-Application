import React, { useContext, useEffect, useState } from 'react';
import { AccessTokenContext } from '../../context';
import { CircularProgress, Container, Typography } from '@mui/material';
import { IProductsResp } from '../../interfaces/product.interface';
import { useApi } from '../../hooks/useApi';
import ProductsCategories from '../../components/ProdutsCategories/ProductsCategories';
import { ICategoryResp } from '../../interfaces/productsCategory.interface';
import ProductsList from '../../components/ProductsList/ProductsList';

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
            <ProductsList productCards={cards}/>
          </>
        )}
      </Container>
    </>
  );
}

export default Catalog;
