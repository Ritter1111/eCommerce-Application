import React, { useContext, useEffect, useState } from 'react';
import {
  ICategoryResp,
  IColorsArray,
  IProductCategories,
} from '../../interfaces/productsCategory.interface';
import {
  Box,
  Button,
  Collapse,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import { ArrowUpward, ExpandLess, ExpandMore, Tune } from '@mui/icons-material';
import { useApi } from '../../hooks/useApi';
import { AccessTokenContext } from '../../context';
import {
  createCategoryTree,
  getAMainCategoriesArray,
  transformCategoriesIntoObj,
} from '../../utils/productCategoriesUtils';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { BreadcrumbType } from '../../types/breadcrumb.type';
import {
  currencyToCents,
  formatCentsToCurrency,
} from '../../utils/format-to-cents';

function ProductsCategories({
  fetchcards,
  categoriesData,
  setCards,
  setProductCategoryName,
}: IProductCategories) {
  const [breadcrumb, setBreadcramb] = useState<BreadcrumbType>([
    ['All', 'All'],
  ]);
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [sortFilter, setSortFilter] = useState('');
  const [textSeachFilter, setTextSeachFilter] = useState<undefined | string>(
    undefined
  );

  const categoriesTree = createCategoryTree(categoriesData);
  const categories = transformCategoriesIntoObj(categoriesData);
  const mainCategories = getAMainCategoriesArray(categoriesData);
  const [categoryId, setCtegoryId] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { token } = useContext(AccessTokenContext);
  const [filterColorValue, setFilterColorValue] = useState<string>('');
  const [colorsAttributesArray, setColorsAttributesArray] = useState<
    IColorsArray[]
  >([]);

  const [highestPriceProduct, setHighestPriceProduct] = useState<number | null>(
    null
  );
  const [lowestPriceProduct, setLowestPriceProduct] = useState<number | null>(
    null
  );
  const [priceRangeSliderValues, setPriceRangeSliderValues] = useState<
    number[]
  >([0, 1]);

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const getQueryString = () => {
    const categoryQuery = isCategoryOpen
      ? `&filter.query=categories.id:"${categoryId}"&`
      : '';
    const sortQuery = sortFilter !== 'default' ? `&${sortFilter}&` : '';
    const textQuery = textSeachFilter ? `&text.en-US=${textSeachFilter}&` : '';
    const fuzzy = textSeachFilter ? `&fuzzy=true&` : '';
    const colorValue = filterColorValue
      ? `&filter.query=variants.attributes.color:"${filterColorValue}"`
      : '';
    const priceRange = `&filter.query=variants.price.centAmount:range(${currencyToCents(
      priceRangeSliderValues[0]
    )} to ${currencyToCents(priceRangeSliderValues[1])})&`;

    return `${categoryQuery}${fuzzy}${textQuery}${sortQuery}${colorValue}${priceRange}`;
  };

  const [fetchCategory] = useApi(async (id) => {
    const apiUrl = `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/product-projections/search?filter.query=categories.id:"${id}"`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const carts: ICategoryResp[] = data.results;
    setCards(carts);
  });

  const [fetchcardsBySort] = useApi(async () => {
    const query = getQueryString();

    const apiUrl = `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/product-projections/search?${query}`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const res = data.results;
    setCards(res);
  });

  const [fetchAttribites] = useApi(async (id) => {
    const categoryQuery = id ? `filter.query=categories.id:"${id}"&` : '';
    const apiUrl = `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/product-projections/search?${categoryQuery}&facet=variants.attributes.color`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const res = data.facets['variants.attributes.color'].terms;
    setColorsAttributesArray(res);
  });

  const [fetchMinMaxCentAmount] = useApi(async (id) => {
    const categoryQuery = id ? `filter.query=categories.id:"${id}"&` : '';
    const limit = `&limit=1&`;
    const apiUrl = `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/product-projections/search?${categoryQuery}`;

    const response = await fetch(`${apiUrl}${limit}&sort=price desc`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseLow = await fetch(`${apiUrl}${limit}&sort=price asc`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const higthPriceData = await response.json();
    const lowPriceData = await responseLow.json();
    const highPrice = Number(
      formatCentsToCurrency(
        higthPriceData.results[0].masterVariant.prices[0].value.centAmount
      )
    );
    const lowPrice = Number(
      formatCentsToCurrency(
        Number(lowPriceData.results[0].masterVariant.prices[0].value.centAmount)
      )
    );
    setHighestPriceProduct(highPrice);
    setLowestPriceProduct(lowPrice);
    setPriceRangeSliderValues([lowPrice, highPrice]);
  });

  const handleMainCategoryClick = (categoryId: string) => {
    if (openCategories.includes(categoryId)) {
      setOpenCategories((prev) => prev.filter((item) => item !== categoryId));
    } else {
      openCategories.length = 0;
      setOpenCategories((prev) => [...prev, categoryId]);
    }
  };

  const resetFilters = () => {
    setSortFilter('default');
    setTextSeachFilter('');
    setFilterColorValue('');
  };

  const handleCaregory = (categoryId: string) => {
    if (categoryId === 'All') {
      fetchcards();
      setIsCategoryOpen(false);
      return;
    }

    setIsCategoryOpen(true);
    fetchCategory(categoryId);
    handleCategoryName(categoryId);
    updateBreadcrumbArray(categoryId);
    setCtegoryId(categoryId);
    fetchAttribites(categoryId);
    fetchMinMaxCentAmount(categoryId);
    setIsFilterMenuOpen(false);
    resetFilters;
  };

  const updateBreadcrumbArray = (id: string) => {
    const currentCategoryName = categories[id][0];
    const currentCategoryId = categories[id][2];
    const maxBreadcrumbLength = mainCategories.length + 1;

    if (breadcrumb.length > 1 && mainCategories.includes(currentCategoryName)) {
      setBreadcramb((prev) => [
        ...prev.slice(0, 1),
        [currentCategoryName, currentCategoryId],
      ]);
    } else if (breadcrumb.length >= maxBreadcrumbLength) {
      setBreadcramb((prev) => [
        ...prev.slice(0, breadcrumb.length - 1),
        [currentCategoryName, currentCategoryId],
      ]);
    } else {
      setBreadcramb((prev) => [
        ...prev,
        [currentCategoryName, currentCategoryId],
      ]);
    }
  };

  const handleCategoryName = (id: string) => {
    if (id === 'All') return;
    setProductCategoryName(categories[id][1]);
  };

  useEffect(() => {
    fetchMinMaxCentAmount();
    fetchAttribites();
  }, []);

  useEffect(() => {
    if (textSeachFilter === undefined) return;
    fetchcardsBySort();
  }, [textSeachFilter]);

  const handlePriceRangeSlider = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) return;
    const minDistance = 20;

    if (activeThumb === 0) {
      const min = Math.min(
        newValue[0],
        priceRangeSliderValues[1] - minDistance
      );
      const max = priceRangeSliderValues[1];
      setPriceRangeSliderValues([min, max]);
    } else {
      const min = priceRangeSliderValues[0];
      const max = Math.max(
        newValue[1],
        priceRangeSliderValues[0] + minDistance
      );
      setPriceRangeSliderValues([min, max]);
    }
  };

  const applyFilters = () => {
    if (sortFilter === 'default' && !isCategoryOpen) {
      fetchcards();
    } else {
      fetchcardsBySort();
    }
  };

  const handleresetFilters = () => {
    resetFilters();
    lowestPriceProduct &&
      highestPriceProduct &&
      setPriceRangeSliderValues([lowestPriceProduct, highestPriceProduct]);

    if (isCategoryOpen) {
      fetchcardsBySort();
    } else {
      fetchcards();
    }
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mb: 3 }}>
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            mb: 3,
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Categories
            </ListSubheader>
          }
        >
          {categoriesTree.map((mainCategory) => (
            <React.Fragment key={mainCategory.id}>
              <ListItemButton
                onClick={() => {
                  handleMainCategoryClick(mainCategory.id);
                  handleCaregory(mainCategory.id);
                }}
              >
                <ListItemText primary={mainCategory.name['en-US']} />
                {openCategories.includes(mainCategory.id) ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItemButton>
              <Collapse
                in={openCategories.includes(mainCategory.id)}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {mainCategory.children?.map((childCategory) => {
                    const childCategoryId = childCategory.id;
                    const childCategoryName = childCategory.name['en-US'];
                    return (
                      <ListItemButton
                        key={childCategoryId}
                        sx={{ pl: 4 }}
                        onClick={() => {
                          handleCaregory(childCategoryId);
                        }}
                      >
                        <ListItemText primary={childCategoryName} />
                      </ListItemButton>
                    );
                  })}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
        <Breadcrumb breadcrumb={breadcrumb} handleCaregory={handleCaregory} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 3,
            flexWrap: 'wrap',
            columnGap: '20px',
            ml: 2,
            alignItems: 'flex-end',
          }}
        >
          <Box>
            <Tune onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)} />
            <Typography
              display="block"
              variant="caption"
              color="text.secondary"
            >
              To filter and organize
            </Typography>
          </Box>
          <TextField
            id="standard-basic"
            label="Search"
            variant="standard"
            margin="normal"
            value={textSeachFilter}
            onChange={(event) => setTextSeachFilter(event.target.value)}
            sx={{ m: 0 }}
          />
        </Box>
        <Box
          sx={{
            display: isFilterMenuOpen ? 'block' : 'none',
            backgroundColor: '#FFFCF7',
            p: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              columnGap: '40px',
              rowGap: '20px',
              alignItems: 'flex-start',
              mb: 2,
              flexWrap: 'wrap',
            }}
          >
            <Box onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
              <ArrowUpward
                sx={{ color: 'text.secondary', width: '20px', height: '20px' }}
              />
              <Typography
                display="block"
                variant="caption"
                color="text.secondary"
              >
                Collapse
              </Typography>
            </Box>
            <FormControl
              variant="standard"
              sx={{ m: 0, minWidth: 120, maxHeight: 40 }}
            >
              <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortFilter}
                label="Sort by"
                onChange={(event) => setSortFilter(event.target.value)}
              >
                <MenuItem value={'default'}>Default</MenuItem>
                <MenuItem value={'sort=price asc'}>Price low</MenuItem>
                <MenuItem value={'sort=price desc'}>Price high</MenuItem>
                <MenuItem value={'sort=name.en-us asc'}>Name A-Z</MenuItem>
                <MenuItem value={'sort=name.en-us desc'}>Name Z-A</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              {colorsAttributesArray.length > 0 && (
                <>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Color
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={filterColorValue}
                    onChange={(event) =>
                      setFilterColorValue(event.target.value)
                    }
                  >
                    {colorsAttributesArray.map((item) => (
                      <FormControlLabel
                        key={item.term}
                        value={item.term}
                        control={<Radio />}
                        label={item.term}
                      />
                    ))}
                  </RadioGroup>
                </>
              )}
            </FormControl>
          </Box>
          <Box>
            {lowestPriceProduct && highestPriceProduct ? (
              <Box sx={{ maxWidth: '300px' }}>
                <InputLabel sx={{ mb: 4 }}>Price range: </InputLabel>
                <Slider
                  min={lowestPriceProduct}
                  max={highestPriceProduct}
                  getAriaLabel={() => 'Minimum distance'}
                  value={priceRangeSliderValues}
                  onChange={handlePriceRangeSlider}
                  valueLabelDisplay="on"
                  getAriaValueText={(value: number) => `${value}`}
                  disableSwap
                  sx={{ color: 'black' }}
                />
              </Box>
            ) : null}
            <Button
              onClick={applyFilters}
              variant="outlined"
              sx={{ color: 'black', borderColor: 'black', mr: 3, mb: 1 }}
            >
              Apply filters
            </Button>
            <Button
              onClick={handleresetFilters}
              variant="outlined"
              sx={{ color: 'black', borderColor: 'black', mb: 1 }}
            >
              Reset filters
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default ProductsCategories;
