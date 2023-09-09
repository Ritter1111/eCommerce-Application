import { scheduleTokenRefresh } from '../../utils/refreshToken';

export async function getActiveCart(productId: string) {
  try {
    await scheduleTokenRefresh();
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me/active-cart`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        localStorage.setItem('cartData', JSON.stringify(data));
        updateCart(productId);
      } else if (data.statusCode === 404) {
        createNewCart(productId);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function createNewCart(productId: string) {
  try {
    await scheduleTokenRefresh();
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me/carts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            currency: 'USD',
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        // successNotify(`Your passwor has been successfully changed`);
        localStorage.setItem('cartData', JSON.stringify(data));
        updateCart(productId);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export function createNewAnonCart() {
  console.log('anon');
}

async function updateCart(productId: string) {
  const cartData = JSON.parse(localStorage.getItem('cartData') || '');
  try {
    await scheduleTokenRefresh();
    const authToken = localStorage.getItem('authToken');

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
                action: 'addLineItem',
                productId: productId,
                variantId: 1,
                quantity: 1,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        // successNotify(`Your passwor has been successfully changed`);
        localStorage.setItem('cartData', JSON.stringify(data));
        localStorage.setItem('isCartCreate', JSON.stringify(true));
      }
    }
  } catch (error) {
    console.error(error);
  }
}
