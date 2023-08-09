import React from 'react';
import { Routes, Route, Redirect } from 'react-router-dom';
import routes from '../utils/routes';

const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<route.element />}
        />
      ))}
      {/* <Redirect to={SHOP_ROUTE}/> */}
    </Routes>
  );
};

export default AppRouter;