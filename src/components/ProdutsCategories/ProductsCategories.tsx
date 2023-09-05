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
import { formatCentsToCurrency } from '../../utils/format-to-cents';

function dollarsToCents(dollars: number) {
  return Math.round(dollars * 100);
}

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
  const [value, setValue] = React.useState<string>('');
  const [colorsArray, setColors] = useState<IColorsArray[]>([]);

  const [highestPriceProduct, setHighestPriceProduct] = useState<number | null>(
    null
  );
  const [lowestPriceProduct, setLowestPriceProduct] = useState<number | null>(
    null
  );
  const [value1, setValue1] = useState<number[]>([0, 1]);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

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

  const handleMainCategoryClick = (categoryId: string) => {
    if (openCategories.includes(categoryId)) {
      setOpenCategories((prev) => prev.filter((item) => item !== categoryId));
    } else {
      openCategories.length = 0;
      setOpenCategories((prev) => [...prev, categoryId]);
    }
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
    setSortFilter('default');
    setTextSeachFilter('');
    fetchAttribites(categoryId);
    setValue('');
    fetchMinMaxCentAmount(categoryId);
    setIsFilterMenuOpen(false);
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

  const [fetchcardsBySort] = useApi(async (id) => {
    const categoryQuery = id ? `&filter.query=categories.id:"${id}"&` : '';
    const sortQuery = sortFilter !== 'default' ? `&${sortFilter}&` : '';
    const textQuery = textSeachFilter ? `&text.en-US=${textSeachFilter}&` : '';
    const fuzzy = textSeachFilter ? `&fuzzy=true&` : '';
    const colorValue = value
      ? `&filter.query=variants.attributes.color:"${value}"&`
      : '';
    const priceRange = `&filter.query=variants.price.centAmount:range(${dollarsToCents(
      value1[0]
    )} to ${dollarsToCents(value1[1])})&`;

    const apiUrl = `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/product-projections/search?${categoryQuery}${fuzzy}${textQuery}${sortQuery}${colorValue}${priceRange}`;
    console.log(apiUrl);
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
    setColors(res);
  });

  const [fetchMinMaxCentAmount, load] = useApi(async (id) => {
    const categoryQuery = id ? `filter.query=categories.id:"${id}"&` : '';
    const apiUrl = `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/product-projections/search?${categoryQuery}&sort=price desc`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const higthPriceData = await response.json();
    const highPrice = Number(
      formatCentsToCurrency(
        higthPriceData.results[0].masterVariant.prices[0].value.centAmount
      )
    );
    setHighestPriceProduct(highPrice);
    const apiUrlLow = `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/product-projections/search?${categoryQuery}&sort=price asc`;
    const responseLow = await fetch(apiUrlLow, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const lowPriceData = await responseLow.json();
    const lowPrice = Number(
      formatCentsToCurrency(
        Number(lowPriceData.results[0].masterVariant.prices[0].value.centAmount)
      )
    );
    setLowestPriceProduct(lowPrice);
    setValue1([lowPrice, highPrice]);
  });


  useEffect(() => {
    if (isCategoryOpen) {
      fetchMinMaxCentAmount(categoryId);
    } else {
      fetchMinMaxCentAmount();
    }
    fetchAttribites();
  }, []);

  useEffect(() => {
    if (textSeachFilter === undefined) return;
    if (isCategoryOpen) {
      fetchcardsBySort(categoryId);
    } else {
      fetchcardsBySort();
    }
  }, [textSeachFilter]);

  function valuetext(value: number) {
    return `${value}`;
  }

  const minDistance = 20;

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const applyFilters = () => {
    if (sortFilter === 'default' && !isCategoryOpen) {
      fetchcards();
    } else if ((sortFilter === 'default' && isCategoryOpen) || isCategoryOpen) {
      fetchcardsBySort(categoryId);
    } else {
      fetchcardsBySort();
    }
  };

  const resetFilters = () => {
    setSortFilter('default');
    setTextSeachFilter('');
    setValue('');
    lowestPriceProduct && highestPriceProduct && setValue1([lowestPriceProduct, highestPriceProduct]);
    if (isCategoryOpen) {
      fetchcardsBySort(categoryId);
    } else {
      fetchcards();
    }
  }

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
            alignItems: 'flex-end'
          }}
        >
          <Box>
            <Tune onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}/>
            <Typography display="block" variant="caption" color="text.secondary">To filter and organize</Typography>
          </Box>
          <TextField
            id="standard-basic"
            label="Search"
            variant="standard"
            margin="normal"
            value={textSeachFilter}
            onChange={(event) => setTextSeachFilter(event.target.value)}
            sx={{ m: 0}}
          />
        </Box>
        <Box sx={{ display: isFilterMenuOpen ? 'block' : 'none', backgroundColor: '#FFFCF7', p: 2 }}>
          <Box sx={{display: 'flex', columnGap: '40px', rowGap: '20px',  alignItems: 'flex-start', mb: 2, flexWrap: 'wrap'}}>
            <Box onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
              <ArrowUpward  sx={{ color: 'text.secondary', width: '20px', height: '20px'}}/>
              <Typography display="block" variant="caption" color="text.secondary">Collapse</Typography>
            </Box>
          <FormControl variant="standard" sx={{ m: 0, minWidth: 120, maxHeight: 40 }}>
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
              <MenuItem value={'sort=name.en-us asc'}>Name asc</MenuItem>
              <MenuItem value={'sort=name.en-us desc'}>Name desc</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
          {colorsArray.length > 0 && (
            <>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Color
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={(event) => setValue(event.target.value)}
              >
                {colorsArray.map((item) => (
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
        <Box >
        {!load && lowestPriceProduct && highestPriceProduct ? (
          <Box sx={{ maxWidth: '300px' }}>
            <InputLabel sx={{ mb: 4 }}>Price range: </InputLabel>
            <Slider
              min={lowestPriceProduct}
              max={highestPriceProduct}
              getAriaLabel={() => 'Minimum distance'}
              value={value1}
              onChange={handleChange1}
              valueLabelDisplay="on"
              getAriaValueText={valuetext}
              disableSwap
              sx={{color: 'black'}}
            />
          </Box>
        ) : null}
        <Button onClick={applyFilters} variant="outlined" sx={{ color: 'black', borderColor: 'black', mr: 3, mb: 1 }}>
          Apply filters
        </Button>
        <Button onClick={resetFilters} variant="outlined" sx={{ color: 'black', borderColor: 'black', mb: 1}}>
          Reset filters
        </Button>
        </Box>
        </Box>
      </Container>
    </>
  );
}

export default ProductsCategories;
