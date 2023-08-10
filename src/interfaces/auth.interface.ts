export interface IDataCustomer {
  accessToken: string
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
  token_type: string
}