import React, { useEffect, useState } from 'react';
import AppRouter from './AppRouter';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import { AuthContext } from '../context';

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('authToken')) setIsAuth(true);
  }, [])

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <BrowserRouter>
        <NavBar/>
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
