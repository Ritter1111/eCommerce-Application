import { ILineItem } from "../../../interfaces/auth.interface";
import { ICartQuantityContext } from "../../../interfaces/context.interface";
import { scheduleTokenRefresh } from "../../../utils/refreshToken";

export async function removeItem(
  itemProduct: ILineItem,
  quantity: number,
  setCartQuantity: ICartQuantityContext['setCartQuantity']
) {
  const getIsAuth = localStorage.getItem('isAuth') === 'true';
  const cartData = getIsAuth
    ? JSON.parse(localStorage.getItem('cartData') || '')
    : JSON.parse(localStorage.getItem('anonCartData') || '');
    
  try {
    await scheduleTokenRefresh();
    const authToken = getIsAuth
      ? localStorage.getItem('authToken')
      : localStorage.getItem('anonToken');

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me/carts/${cartData.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            version: cartData.version,
            actions: [
              {
                action: 'removeLineItem',
                lineItemId: itemProduct.id,
                quantity: quantity,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setCartQuantity(data.totalLineItemQuantity);

        const itemCart: string[] = [];
        for(let i = 0; i < data.lineItems.length; i+= 1) {
          itemCart.push(data.lineItems[i].productId)
        }

        getIsAuth
        ? (localStorage.setItem('cartData', JSON.stringify(data)), localStorage.setItem('cartItem', JSON.stringify(itemCart)))
        : (localStorage.setItem('anonCartData', JSON.stringify(data)), localStorage.setItem('anonCartItem', JSON.stringify(itemCart)));
      }
    }
  } catch (error) {
    console.error(error);
  }
}