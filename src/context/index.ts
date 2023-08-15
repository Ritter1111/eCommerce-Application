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