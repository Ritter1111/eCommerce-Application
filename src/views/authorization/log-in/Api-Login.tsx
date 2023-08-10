import { IDataCustomer, IDataForm } from '../../../interfaces/auth.interface';

const clientId = process.env.CTP_CLIENT_ID;
const clientSecret = process.env.CTP_CLIENT_SECRET;
const credentials = `${clientId}:${clientSecret}`;
const encodedCredentials = btoa(credentials);

export const getCustomer = async ({
  accessToken,
  email,
  password,
}: Partial<IDataCustomer>) => {
  try {
    scheduleTokenRefresh();
    const object = {
      email: `${email}`,
      password: `${password}`,
    };
    const response = await fetch(
      `${process.env.CTP_API_URL}/chat_gpt_team/me/login`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(object),
      }
    );

    return response.json();
  } catch (error) {
    console.error('Error getting token:', error);
  }
};

export const getToken = async ({ email, password }: IDataForm) => {
  try {
    scheduleTokenRefresh();
    const response = await fetch(
      `${process.env.CTP_AUTH_URL}/oauth/chat_gpt_team/customers/token`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'password',
          username: `${email}`,
          password: `${password}`,
        }),
      }
    );
    return response.json();
  } catch (error) {
    console.error('Error getting token:', error);
  }
};

export const refreshToken = async ({
  refreshToken,
}: Partial<IDataCustomer>) => {
  try {
    const response = await fetch(`${process.env.CTP_AUTH_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: `${refreshToken}`,
      }),
    });
    return response.json();
  } catch (error) {
    console.error('Error getting token:', error);
  }
};

async function scheduleTokenRefresh() {
  const time = localStorage.getItem('expiredIn');
  // const time = '1691691393062';

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
        localStorage.setItem('authToken', refToken);
        return refToken;
      } else {
        console.log('No refreshToken saved');
      }
    }
  } else {
    console.log('No expired in');
  }
}
