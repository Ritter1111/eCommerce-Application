import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { statusCodes } from '../../../enums/auth.enum';
import {
  IData,
  IDataCustomer,
  IDataForm,
  ITokenData,
} from '../../../interfaces/auth.interface';
import { notify } from './ErrorPupUp';

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
    console.error('Error getting customer:', error);
  }
};

export const getToken = async ({
  email,
  password,
}: IDataForm): Promise<ITokenData> => {
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
    throw error;
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
    console.error('Error getting refresh token:', error);
    throw error;
  }
};

async function scheduleTokenRefresh() {
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

async function saveToken(token: ITokenData) {
  localStorage.setItem('authToken', token.access_token);
  localStorage.setItem('refreshToken', token.refresh_token);
  localStorage.setItem('expiredIn', `${Date.now() + 172800}`);
}

export async function getCustometWithToken(data: IData, navigate: NavigateFunction, setIsAuth: (newState: boolean) => void, setError?: Dispatch<SetStateAction<boolean>>, setErrorMessage?: Dispatch<SetStateAction<IDataForm>>) {
  try {
    const token = await getToken({
      email: data.email,
      password: data.password,
    });
    const myCustomer = await getCustomer({
      accessToken: token.access_token,
      email: data.email,
      password: data.password,
    });

    if (token.statusCode === statusCodes.BAD_REQUEST) {
      notify(token.message);
      if (setError && setErrorMessage) {
        setError(true);
        setErrorMessage({
          email: '',
          password: 'Incorect password or email',
        });
      }
    }

    if (myCustomer.customer.id) {
      navigate('/');
      saveToken(token);
      setIsAuth(true);
    }

    return myCustomer;
  } catch (error) {
    console.error(error);
  }
}