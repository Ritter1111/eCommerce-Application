import Home from "../views/home/Home";
import {  MAIN_ROUTE } from "./consts";

const routes = [
  {
    name: 'Home',
    path: MAIN_ROUTE,
    element: Home,
    title: "Go to Home"
  },
];

export default routes;