export interface ISignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  bd: string;
  billingStreet: string;
  billingCity: string;
  billingPostalCode: string;
  billingCountry: string;
  shippingStreet: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  sameAddress: boolean;
}