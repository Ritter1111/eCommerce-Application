import React, { useContext, useState } from 'react';
import { Button } from '@mui/material';
import styles from '../DescriptionProduct.module.css';
import { IButton } from '../../../interfaces/detailedPage.interface';
import { useParams } from 'react-router-dom';
import { СartQuantityContext } from '../../../context';
import { removeItem } from '../../Cart/BasketItems/RemoveItem-Api';
import { getLineItemId, handleAddToCart, initializeItemsCart } from '../../../utils/basket';

export default function AddToCart({ name }: IButton) {
  const params = useParams();
  const { setCartQuantity } = useContext(СartQuantityContext);
  const productId = params.id;
  const getIsAuth = localStorage.getItem('isAuth') === 'true';

  const [itemsCart, setItemsCart] = useState(() => initializeItemsCart(getIsAuth));
  const [isAddedToCard, setIsAddedToCard] = useState<boolean>(productId && itemsCart.includes(productId));

  const removeCartItem = async (itemProductId: string) => {
    setIsAddedToCard((prev) => !prev);
    await removeItem(getLineItemId(itemProductId, getIsAuth), setCartQuantity);
  };

  const handleAddItemToCart = () => {
    setIsAddedToCard((prev) => !prev);
    productId && handleAddToCart(productId, getIsAuth, setCartQuantity, setItemsCart)
  }

  return (
    <>
      {isAddedToCard && productId ? (
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          size="small"
          style={{
            backgroundColor:'black',
            color: 'white',
            marginBottom: '25px',
            fontSize: '0.8rem',
          }}
          className={styles.btn}
          onClick={() => productId && removeCartItem(productId)}
        >
          Remove from card
        </Button>) : (
          <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          size="small"
          style={{
            backgroundColor: 'black',
            color: 'white',
            marginBottom: '25px',
            fontSize: '0.8rem',
          }}
          className={styles.btn}
          onClick={handleAddItemToCart}
        >
      {name}
    </Button>
        )
    }
    </>
  );
}
