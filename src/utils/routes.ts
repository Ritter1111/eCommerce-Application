import SignUp from "../views/authorization/sign-up/SignUp";
import Home from "../views/home/Home";
import {  MAIN_ROUTE, REGISTRATION_ROUTE } from "./consts";

const routes = [
  {
    path: MAIN_ROUTE,
    element: Home,
  },
  {
    path: REGISTRATION_ROUTE,
    element: SignUp,
  },
];

export default routes;