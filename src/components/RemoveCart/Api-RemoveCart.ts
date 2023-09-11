// import { scheduleTokenRefresh } from "../../utils/refreshToken";

// export async function removeBasket(
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
//           version: cartData.version
//           }),
//         }
//       );

//       const data = await response.json();
//       return data
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }