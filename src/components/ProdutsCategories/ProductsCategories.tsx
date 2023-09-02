import React, { useContext, useEffect, useState } from 'react';
import {
  IAllCategories,
  IAllCategoriesPlusDeskr,
  ICategoryResp,
  IProductCategories,
} from '../../interfaces/productsCategory.interface';
import {
  Breadcrumbs,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useApi } from '../../hooks/useApi';
import { AccessTokenContext } from '../../context';

function createCategoryTree(
  categories: IAllCategories[],
  parentId: string | null = null
): IAllCategories[] {
  return categories
    .filter(
      (category) =>
        (category.parent && category.parent.id === parentId) ||
        (!category.parent && !parentId)
    )
    .map((category) => ({
      id: category.id,
      name: { 'en-US': category.name['en-US'] },
      children: createCategoryTree(categories, category.id),
    }));
}

function transformIntoAllActegoryObj(categories: IAllCategoriesPlusDeskr[]) {
  return categories.reduce<{ [key: string]: [string, string] }>((result, el) => {
    result[el.id] = [el.name['en-US'], el.description["en-US"]];
    return result;
  }, {});
}

function getAMainCategoriesObj(categories: IAllCategories[]) {
  return categories.reduce((arr: string[], el) => {
    if (!el.parent) {
      arr.push(el.name['en-US']);
    }
    return arr;
  }, []);
}

function ProductsCategories({ allCategories, setCards, setProductCategoryName }: IProductCategories) {
  const categoriesTree = createCategoryTree(allCategories);
  const categories = transformIntoAllActegoryObj(allCategories);
  const mainCategories = getAMainCategoriesObj(allCategories);
  const [breadcrumb, setBreadcramb] = useState<string[]>([]);
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const { token } = useContext(AccessTokenContext);

  const handleClick = (categoryId: string) => {
    if (openCategories.includes(categoryId)) {
      setOpenCategories(openCategories.filter((id) => id !== categoryId));
    } else {
      setOpenCategories([...openCategories, categoryId]);
    }
  };

  const [fetchCategory] = useApi(async (id) => {
    const apiUrl = `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/product-projections/search?filter.query=categories.id:"${id}"`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const res: ICategoryResp[] = data.results;
    setCards(res);
  });

  const handleCaregory = (id: string) => {
    fetchCategory(id);
    handleCategoryName(id);

    if (breadcrumb.length > 0 && mainCategories.includes(categories[id][0])) {
      setBreadcramb((prev) => [...prev.slice(breadcrumb.length), categories[id][0]]);
    } else {
      setBreadcramb((prev) => [...prev, categories[id][0]]);
    }
    // если главные категории до удалять все до них
    // если содержит удалять все до него
    // не содеожит пушить
  };

  const handleCategoryName = (id: string) => {
    setProductCategoryName(categories[id][1]);
  }

  useEffect(() => {
    console.log(breadcrumb);
  }, [breadcrumb]);

  return (
    <>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mb: 3 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Categories
        </ListSubheader>
      }
    >
      {categoriesTree.map((el) => (
        <React.Fragment key={el.id}>
          <ListItemButton
            onClick={() => {
              handleClick(el.id);
              handleCaregory(el.id);
            }}
          >
            <ListItemText primary={el.name['en-US']} />
            {openCategories.includes(el.id) ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            in={openCategories.includes(el.id)}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {el.children?.map((child) => (
                <ListItemButton
                  key={child.id}
                  sx={{ pl: 4 }}
                  onClick={() => {
                    handleCaregory(child.id)
                  }}
                >
                  <ListItemText primary={child.name['en-US']} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
    <Breadcrumbs aria-label="breadcrumb" sx={{mb: 3}} onClick={(e) => e.preventDefault()}>
      {/* <Button onClick={() => navigate("/catalog")}> All</Button> */}
      {/* <Link href="/catalog">All</Link> */}
    </Breadcrumbs>
  </>
  );
}

export default ProductsCategories;
