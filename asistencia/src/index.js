import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CrearModulo from './Paginas/CrearModulo'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <CrearModulo/>
  </React.StrictMode>
);
