import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from '../utils/routes';
import NotFound from '../views/not-found/notFound';

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
      <Route
        path="*"
        element={<NotFound/>}
      />
    </Routes>
  );
};

export default AppRouter;