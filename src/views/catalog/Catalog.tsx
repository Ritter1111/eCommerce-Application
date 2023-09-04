import React, { useContext, useEffect, useState } from 'react';
import { AccessTokenContext } from '../../context';
import { CircularProgress, Container, Typography, Grid, FormControl,
  InputLabel, MenuItem,
  Select, } from '@mui/material';
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
  const [sortFilter, setSortFilter] = React.useState('');
  const [sortStr, setSortStr] = useState<string[]>([]);

  const { token } = useContext(AccessTokenContext);

  const [fetchcards, isLoading, cardsError] = useApi(async () => {
    // setSortStr(`&sort=${sortFilter}`);
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

  const [fetchcardsBySort] = useApi(async () => {
      const apiUrl = `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/product-projections/search?${sortStr.join('&')}`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const res: IProductsResp[] = data.results;
    setCards(res);
  });
  ///product-projections/search?sort=price asc
  //color array
  // const attributeValues = new Set();
  // cards.forEach((product) => {
  //   console.log(product.variants);
  //   if (product.variants) {
  //     const colorAttributeValue = product.variants[0].attributes.find(
  //       (attr) => attr.name === "color"
  //     );
  //     if (colorAttributeValue) {
  //       attributeValues.add(colorAttributeValue.value);
  //     }
  //   } else {
  //     const colorAttributeValue = product.masterData.current.variants[0].attributes.find(
  //       (attr) => attr.name === "color"
  //     );
  //     if (colorAttributeValue) {
  //       attributeValues.add(colorAttributeValue.value);
  //     }
  //   }
  // });
  // console.log(attributeValues);
  
  useEffect(() => {
  }, [cards]);

  useEffect(() => {
    if (token) {
      fetchcards();
      fetchCategories();
    }
  }, [token]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === 'default') {
      fetchcards();
    } else {
      setSortFilter(selectedValue);
    }
  };

  useEffect(() => {
    setSortStr([`${sortFilter}`]);
  }, [sortFilter]);

  useEffect(() => {
    sortStr.length > 0 && fetchcardsBySort();
  }, [sortStr]);


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
          <FormControl sx={{ m: 1, minWidth: 180}}>
            <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortFilter}
              label="Sort by"
              onChange={handleChange}
            >
              <MenuItem value={'default'}>Dafault</MenuItem>
              <MenuItem value={'sort=price asc'}>Price low</MenuItem>
              <MenuItem value={'sort=price desc'}>Price high</MenuItem>
              <MenuItem value={'sort=name.en-us asc'}>Name asc</MenuItem>
              <MenuItem value={'sort=name.en-us desc'}>Name desc</MenuItem>
            </Select>
          </FormControl>
          {cards && cards.length > 0 ? (
            <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
              {cards.map((card) => {
                const isCategoriesCards = card.variants;
                return (
                  <Grid item key={card.id} sx={{ maxWidth: 300, margin: '0 auto' }}>
                    {
                      <ProductCard
                        item={
                          isCategoriesCards
                            ? convertProductCartItemCategory(card as ICategoryResp)
                            : convertProductCartItemAll(card as IProductsResp)
                        }
                      />
                    }
                  </Grid>
                )
              })}
            </Grid>
          ) : (
            <Typography variant="h4" align="center">
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
