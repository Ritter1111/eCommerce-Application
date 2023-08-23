export interface IDataCustomer {
  accessToken: string,
  refreshToken: string,
  email: string,
  password: string
}

export interface PasswordInputProps {
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
  customer: Customer
  cart: Cart
}

export interface Customer {
  id: string
  version: number
  versionModifiedAt: string
  lastMessageSequenceNumber: number
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: LastModifiedBy
  createdBy: LastModifiedBy
  email: string
  firstName: string
  lastName: string
  middleName: string
  title: string
  salutation: string
  password: string
  addresses: Address[]
  shippingAddressIds: string[]
  billingAddressIds: string[]
  isEmailVerified: boolean
  stores: string[]
  authenticationMode: string
}

export interface LastModifiedBy {
  isPlatformClient: boolean
  user: User
}

export interface User {
  typeId: string
  id: string
}

export interface Address {
  id: string
  postalCode: string
  city: string
  country: string
  building: string
  apartment: string
}

export interface Cart {
  type: string
  id: string
  version: number
  versionModifiedAt: string
  lastMessageSequenceNumber: number
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: LastModifiedBy2
  createdBy: LastModifiedBy2
  customerId: string
  lineItems: string[]
  cartState: string
  totalPrice: TotalPrice
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

export interface LastModifiedBy2 {
  clientId: string
  isPlatformClient: boolean
  customer: User
}

export interface TotalPrice {
  type: string
  currencyCode: string
  centAmount: number
  fractionDigits: number
}