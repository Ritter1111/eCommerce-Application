import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import './styles/vars.css';
import App from './components/App';
import UserProfile from './views/user-profile/UserProfile';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
    <UserProfile />
  </StrictMode>
);
