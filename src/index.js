import React from 'react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

const pathname = '/pokedex'; // Ruta que deseas abrir

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// Agrega el siguiente código al final del archivo para abrir la ruta deseada
if (window.location.pathname === '/') {
  window.location.pathname = pathname;
}
