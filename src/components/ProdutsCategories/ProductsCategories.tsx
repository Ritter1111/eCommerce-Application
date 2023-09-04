import React, { useContext, useEffect, useState } from 'react';
import {
  ICategoryResp,
  IProductCategories,
} from '../../interfaces/productsCategory.interface';
import {
  Box,
  Collapse,
  Container,
  FormControl,
  InputLabel,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useApi } from '../../hooks/useApi';
import { AccessTokenContext } from '../../context';
import {
  createCategoryTree,
  getAMainCategoriesArray,
  transformCategoriesIntoObj,
} from '../../utils/productCategoriesUtils';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { BreadcrumbType } from '../../types/breadcrumb.type';

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
  const [textSeachFilter, setTextSeachFilter] = useState<undefined | string>(undefined);

  const categoriesTree = createCategoryTree(categoriesData);
  const categories = transformCategoriesIntoObj(categoriesData);
  const mainCategories = getAMainCategoriesArray(categoriesData);
  const [categoryId, setCtegoryId] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const { token } = useContext(AccessTokenContext);


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
    const categoryQuery = id ? `filter.query=categories.id:"${id}"&` : '';
    const sortQuery = sortFilter !== 'default' ? `&${sortFilter}` : '';
    const textQuery = textSeachFilter ? `&text.en-US=${textSeachFilter}` : '';
    const fuzzy = textSeachFilter ? `&fuzzy=true` : '';

    const apiUrl = `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/product-projections/search?${
      categoryQuery}${fuzzy}${textQuery}${sortQuery}`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const res = data.results;
    setCards(res);
  });

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSortFilter(selectedValue);
  };

  useEffect(() => {
    if (!sortFilter) return;
    if (sortFilter === 'default' && !isCategoryOpen) {
      fetchcards();
    } else if ((sortFilter === 'default' && isCategoryOpen) || isCategoryOpen) {
      fetchcardsBySort(categoryId);
    } else {
      fetchcardsBySort();
    }
  }, [sortFilter]);

  const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextSeachFilter(event.target.value);
  }

  useEffect(() => {
    if (textSeachFilter === undefined) return;
    if (isCategoryOpen) {
      fetchcardsBySort(categoryId);
    } else {
      fetchcardsBySort();
    }
  }, [textSeachFilter]);

  return (
    <>
    <Container maxWidth="lg">
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
      <Box sx={{display:'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', columnGap: '20px', ml: 2}}>
        <FormControl sx={{ m: 1, minWidth: 120, maxHeight: 40}}>
          <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortFilter}
            label="Sort by"
            onChange={handleChange}
          >
            <MenuItem value={'default'}>Default</MenuItem>
            <MenuItem value={'sort=price asc'}>Price low</MenuItem>
            <MenuItem value={'sort=price desc'}>Price high</MenuItem>
            <MenuItem value={'sort=name.en-us asc'}>Name asc</MenuItem>
            <MenuItem value={'sort=name.en-us desc'}>Name desc</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          margin="normal"
          value={textSeachFilter}
          onChange={handleTextInput}
          sx={{ml: 1.5}}
          />
      </Box>
    </Container>
    </>
  );
}

export default ProductsCategories;