import { blueGrey } from '@mui/material/colors';
import { IDataForm } from '../interfaces/auth.interface';

export const MAIN_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const REGISTRATION_ROUTE = '/registration';
export const ABOUTUS_ROUTE = '/about-us';
export const CATALOG_ROUTE = '/catalog';
export const PRODUCT_ID_ROUTE = 'catalog/:id';
export const USER_PROFILE = '/user-profile';
export const CART_ROUTE = '/cart';

export const grey = blueGrey['A700'];
export const formFieldsDefault: IDataForm = {
  email: '',
  password: '',
};

export const expiredInSeconds = 172800;

export const styleModalWindow = {
  bgcolor: 'background.paper',
  boxShadow: 2,
  width: '515px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (max-width: 600px)': {
    width: '89%',
    height: 'auto'
  },
};

export const images = [
  'https://hypeandhyper.com/content/images/2022/10/bcefw-1.jpg',
  'https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/61f9074b2fb49-moda-11.jpeg/16x9',
  'https://cdn.nwmgroups.hu/s/img/i/2109/20210903budapest-central-european-fashion-week.jpg',
  'https://theglossarymagazine.com/wp-content/uploads/Ukranian-Fashion-Designers.webp',
  'https://static01.nyt.com/images/2023/03/02/multimedia/24UKRAINE-DESIGNERS-vtcq/24UKRAINE-DESIGNERS-vtcq-videoSixteenByNine3000.jpg',
];

export const delay = 2000;

export const array: string[] = [];
