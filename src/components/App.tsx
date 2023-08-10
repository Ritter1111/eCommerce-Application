import React from 'react';
import AppRouter from './AppRouter';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
       <AppRouter />
    </BrowserRouter>
  );
}
