export const getInitialCartItemsQuantity = () => {
  const getIsAuth = localStorage.getItem('isAuth') === 'true';
  const cartDataString = getIsAuth
    ? localStorage.getItem('cartData')
    : localStorage.getItem('anonCartData');

  if (cartDataString) {
    const cartData = JSON.parse(cartDataString);
    return cartData.totalLineItemQuantity || 0;
  }

  return 0;
}