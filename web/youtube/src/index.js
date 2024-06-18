import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from './ScreenMode/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Initial render
root.render(
  <React.StrictMode>
    <BrowserRouter>

    <ThemeProvider>
      <App />
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

