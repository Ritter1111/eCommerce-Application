import { createContext } from "react";

type IAuthContext = {
  isAuth: boolean;
  setIsAuth: (newState: boolean) => void
}

const initialValue = {
  isAuth: false,
  setIsAuth: () => {}
}

export const AuthContext = createContext<IAuthContext>(initialValue);

type IAccessTolenContext = {
  token: string;
  setToken: (newState: string) => void
}

const IAccessTolenContext = {
  token: '',
  setToken: () => {}
}

export const AccessTokenContext = createContext<IAccessTolenContext>(IAccessTolenContext);