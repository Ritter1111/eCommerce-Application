import AboutUs from "../views/about-us/AboutUs";
import Catalog from "../views/catalog/Catalog";
import Home from "../views/home/Home";
import { ABOUTUS_ROUTE, CATALOG_ROUTE, MAIN_ROUTE } from "./consts";

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
  {
    name: 'Catalog',
    path: CATALOG_ROUTE,
    element: Catalog,
    title: "Catalog"
  },
];

export default routes;