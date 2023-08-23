import AboutUs from "../views/about-us/AboutUs";
import Home from "../views/home/Home";
import { ABOUTUS_ROUTE, MAIN_ROUTE } from "./consts";

const routes = [
  {
    name: 'Home',
    path: MAIN_ROUTE,
    element: Home,
    title: "Go to Home"
  },
  {
    name: 'About Us',
    path: ABOUTUS_ROUTE,
    element: AboutUs,
    title: "About Us"
  },
];

export default routes;