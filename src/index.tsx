import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);
const num1 = 5;
const num2 = 10;

root.render(
  <StrictMode>
    <App num1={num1} num2={num2} />;
  </StrictMode>
);
