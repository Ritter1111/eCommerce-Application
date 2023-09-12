// import { Link } from '@mui/material';
// import React, { useContext } from 'react';
// import { scheduleTokenRefresh } from '../../utils/refreshToken';
// // import { ILineItem } from '../../interfaces/auth.interface';
// import { ICartQuantityContext } from '../../interfaces/context.interface';
// import { СartQuantityContext } from '../../context';
// // import { createNewCart } from '../../views/basket/Create-Cart_Api';

// export async function removeItem(
//   // itemProduct: ILineItem,
//   // quantity: number,
//   setCartQuantity: ICartQuantityContext['setCartQuantity']
// ) {
//   const getIsAuth = localStorage.getItem('isAuth') === 'true';
//   const cartData = getIsAuth
//     ? JSON.parse(localStorage.getItem('cartData') || '')
//     : JSON.parse(localStorage.getItem('anonCartData') || '');
    
//   try {
//     await scheduleTokenRefresh();
//     const authToken = getIsAuth
//       ? localStorage.getItem('authToken')
//       : localStorage.getItem('anonToken');

//     if (authToken) {
//       const response = await fetch(
//         `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me/carts/${cartData.id}?version=${cartData.version}`,
//         {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${authToken}`,
//           },
//           body: new URLSearchParams({
//              version: `${cartData.version}`
//           }),
//         }
//       );

//       const data = await response.json();
//       if (response.ok) {
//         setCartQuantity(data.totalLineItemQuantity);

//         // const itemCart: string[] = [];
//         // for(let i = 0; i < data.lineItems.length; i+= 1) {
//         //   itemCart.push(data.lineItems[i].productId)
//         // }

//         // getIsAuth
//         // ? (localStorage.setItem('cartData', JSON.stringify(data)), localStorage.setItem('cartItem', JSON.stringify(itemCart)))
//         // : (localStorage.setItem('anonCartData', JSON.stringify(data)), localStorage.setItem('anonCartItem', JSON.stringify(itemCart)));
//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// // const array: string[] = [];

// export default function RemoveCart() {
//   const { setCartQuantity } = useContext(СartQuantityContext);

//   const clear = async () => {

//     await removeItem(setCartQuantity)

//     // const cartData = localStorage.getItem('cartData');
//     // const anonCartData = localStorage.getItem('anonCartData');

//     // if (cartData !== null) {
//     //   localStorage.removeItem('cartData');
//     // }
//     // if (anonCartData !== null) {
//     //   localStorage.removeItem('anonCartData');
//     // }

//     // const cartItems = localStorage.getItem('cartItem');
//     // const anonCartItems = localStorage.getItem('anonCartItem');

//     // if (cartItems !== null) {
//     //   localStorage.setItem('cartItem', JSON.stringify(array));
//     // }
//     // if (anonCartItems !== null) {
//     //   localStorage.setItem('anonCartItem', JSON.stringify(array));
//     // }

//     // await createNewCart()
//   }
  
//   return (
//     <Link component="button" sx={{ color: 'black', textDecoration: 'none' }} onClick={clear}>
//       Delete all items
//     </Link>
//   );
// }
