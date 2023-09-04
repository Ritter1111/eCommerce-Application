import React, { useContext, useEffect, useState } from 'react';
import {
  ICategoryResp,
  IProductCategories,
} from '../../interfaces/productsCategory.interface';
import {
  Collapse,
  FormControl,
  InputLabel,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
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

  const categoriesTree = createCategoryTree(categoriesData);
  const categories = transformCategoriesIntoObj(categoriesData);
  const mainCategories = getAMainCategoriesArray(categoriesData);

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
      return;
    }

    fetchCategory(categoryId);
    handleCategoryName(categoryId);
    updateBreadcrumbArray(categoryId);
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

  // const [sortFilter, setSortFilter] = React.useState('');
  // const [sortStr, setSortStr] = useState<string>('');

  // const handleChange = (event: SelectChangeEvent) => {
  //   // console.log(event.target.value);
  //   setSortFilter(event.target.value as string);
  //   console.log(sortFilter);
    
  //   setSortStr(`&sort=${sortFilter}`);
  //   // console.log(sortStr);
  // };

  // useEffect(() => {
  //   console.log(sortStr);
  // }, [sortStr]);

  return (
    <>

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
    </>
  );
}

export default ProductsCategories;
