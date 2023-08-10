import React from 'react';
import AppRouter from './AppRouter';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar/NavBar';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter />
    </BrowserRouter>
  );
}
