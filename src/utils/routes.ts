import LogIn from "../views/authorization/log-in/LogIn";
import SignUp from "../views/authorization/sign-up/SignUp";
import Home from "../views/home/Home";
import { LOGIN_ROUTE, MAIN_ROUTE, NOT_FOUND_ROUTE, REGISTRATION_ROUTE } from "./consts";

const routes = [
  {
    path: MAIN_ROUTE,
    element: Home,
  },
  {
    path: REGISTRATION_ROUTE,
    element: SignUp,
  },
  {
    path: LOGIN_ROUTE,
    element: LogIn,
  },
  {
    path: NOT_FOUND_ROUTE,
    element: SignUp,
  },
];

export default routes;