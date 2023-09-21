import React from 'react';
import ReactDOM from 'react-dom/client';
import { browserRouter } from 'react-router-dom'
import App from './App';
import './style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <browserRouter>
    <App />
    </browserRouter>
  </React.StrictMode>
);
