import { blueGrey } from '@mui/material/colors';
import { IDataForm } from '../interfaces/auth.interface';

export const MAIN_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const REGISTRATION_ROUTE = '/registration';
export const ABOUTUS_ROUTE = '/about-us';
export const CATALOG_ROUTE = '/catalog';
export const PRODUCT_ID_ROUTE = '/:id';

export const grey = blueGrey['A700'];
export const formFieldsDefault: IDataForm = {
  email: '',
  password: '',
};

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 2,
  display: 'flex',
  alignItems: 'center'
};
