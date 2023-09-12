import { Button} from '@mui/material';
import React, { useContext } from 'react';
import { СartQuantityContext } from '../../context';
import { createNewCart } from '../../views/basket/Create-Cart_Api';
import { removeCart } from '../../views/basket/Api-Busket';
import { array } from '../../utils/consts';

export default function RemoveCart() {
  const { setCartQuantity } = useContext(СartQuantityContext);

  const clear = async () => {
    await removeCart(setCartQuantity);

    const cartData = localStorage.getItem('cartData');
    const anonCartData = localStorage.getItem('anonCartData');
    const cartItems = localStorage.getItem('cartItem');
    const anonCartItems = localStorage.getItem('anonCartItem');

    if (cartData !== null) {
      localStorage.removeItem('cartData');
    }
    if (anonCartData !== null) {
      localStorage.removeItem('anonCartData');
    }

    if (cartItems !== null) {
      localStorage.setItem('cartItem', JSON.stringify(array));
    }

    if (anonCartItems !== null) {
      localStorage.setItem('anonCartItem', JSON.stringify(array));
    }

    await createNewCart();
    setCartQuantity(0);
  };

  return (
    <div>
    <Button
      component="button"
      sx={{ color: 'black', textDecoration: 'none' }}
      onClick={() => clear()}
    >
      Delete all items
    </Button>
    </div>
  );
}
