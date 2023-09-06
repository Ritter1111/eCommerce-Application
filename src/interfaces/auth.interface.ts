export interface IDataCustomer {
  accessToken: string,
  refreshToken: string,
  email: string,
  password: string
}

export interface IPasswordInputProps {
  showPassword: boolean;
  handleClickShowPassword: () => void;
}

export interface IDataForm {
  email: string,
  password: string
}

export interface ITokenData {
  access_token: string,
  expires_in: number,
  scope: string,
  refresh_token: string,
  token_type: string,
  statusCode: number,
  message: string
}

export interface IDataCustomer {
  accessToken: string,
  refreshToken: string,
  email: string,
  password: string
}

export interface IDataForm {
  email: string,
  password: string
}

export interface ITokenData {
  access_token: string,
  expires_in: number,
  scope: string,
  refresh_token: string,
  token_type: string,
  statusCode: number,
  message: string
}

export interface IData {
  email: string;
  password: string;
}

export interface ICustomerData {
  email: string;
  password: string;
  accessToken: string,
}
  
export interface IClientRoot {
  customer: ICustomer
  cart: ICart
}

export interface ICustomer {
  id: string
  version: number
  versionModifiedAt: string
  lastMessageSequenceNumber: number
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: ILastModifiedBy
  createdBy: ILastModifiedBy
  email: string
  firstName: string
  lastName: string
  middleName: string
  title: string
  salutation: string
  password: string
  addresses: IAddress[]
  shippingAddressIds: string[]
  billingAddressIds: string[]
  isEmailVerified: boolean
  stores: string[]
  authenticationMode: string
}

export interface ILastModifiedBy {
  isPlatformClient: boolean
  user: IUser
}

export interface IUser {
  typeId: string
  id: string
}

export interface IAddress {
  id: string
  postalCode: string
  city: string
  country: string
  building: string
  apartment: string
}

export interface ICart {
  type: string
  id: string
  version: number
  versionModifiedAt: string
  lastMessageSequenceNumber: number
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: ILastModifiedBy2
  createdBy: ILastModifiedBy2
  customerId: string
  lineItems: string[]
  cartState: string
  totalPrice: ITotalPrice
  shippingMode: string
  shipping: string[]
  customLineItems: string[]
  discountCodes: number[]
  directDiscounts: string[]
  inventoryMode: string
  taxMode: string
  taxRoundingMode: string
  taxCalculationMode: string
  deleteDaysAfterLastModification: number
  refusedGifts: string[]
  origin: string
  itemShippingAddresses: string[]
}

export interface ILastModifiedBy2 {
  clientId: string
  isPlatformClient: boolean
  customer: IUser
}

export interface ITotalPrice {
  type: string
  currencyCode: string
  centAmount: number
  fractionDigits: number
}