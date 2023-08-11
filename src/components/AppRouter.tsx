import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from '../utils/routes';
import NotFound from '../views/not-found/notFound';
import { LOGIN_ROUTE } from '../utils/consts';
import LogIn from '../views/authorization/log-in/LogIn';
const token = localStorage.getItem('authToken');

const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.element />} />
      ))}
      <Route
        path={LOGIN_ROUTE}
        element={token ? <Navigate to="/" /> : <LogIn />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
