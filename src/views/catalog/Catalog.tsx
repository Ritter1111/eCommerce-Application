import React, { useContext, useEffect, useState } from 'react';
import { AccessTokenContext } from '../../context';
import { CircularProgress, Container, Typography } from '@mui/material';
import { useApi } from '../../hooks/useApi';
import ProductsCategories from '../../components/ProdutsCategories/ProductsCategories';
import ProductsList from '../../components/ProductsList/ProductsList';
import { IProductsResp } from '../../interfaces/product.interface';

function Catalog() {
  const [cards, setCards] = useState<IProductsResp[]>([]);
  const [categories, setCategories] = useState([]);
  const [productCategoryName, setProductCategoryName] = useState('');

  const { token } = useContext(AccessTokenContext);

  const [fetchCards, isLoading, cardsError] = useApi(async () => {
    const apiUrl = `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/product-projections/search?`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const res = data.results;
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
      fetchCards();
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
              fetchCards={fetchCards}
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
