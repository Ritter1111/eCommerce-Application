import { refreshToken } from "../views/authorization/log-in/Api-Login";

export async function scheduleTokenRefresh() {
  const time = localStorage.getItem('expiredIn');

  if (time !== null) {
    const timeNumeric = parseInt(time);
    const currTime = Date.now();
    const timeUntilExpiration = timeNumeric - currTime;
    const refreshTenMinutes = 600;

    if (timeUntilExpiration <= refreshTenMinutes) {
      const refreshTokenSaved = localStorage.getItem('refreshToken');
      if (refreshTokenSaved !== null) {
        const refToken = await refreshToken({
          refreshToken: refreshTokenSaved,
        });
        localStorage.setItem('authToken', refToken.access_token);
        return refToken;
      } else {
        console.log('No refreshToken saved');
      }
    } else {
      console.log('No expired in');
    }
  }
}