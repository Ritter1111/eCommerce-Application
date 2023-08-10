import React from 'react';
import LogIn from '../views/authorization/log-in/LogIn';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../views/home/Home';

export default function RedirectToHome() {
  const token = localStorage.getItem('authToken');

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <LogIn />}
        />
      </Routes>
    </div>
  );
}
