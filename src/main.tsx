import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Parse from 'parse';
import App from './App';
import './index.css';

// Initialize Parse
Parse.initialize(
  'YOUR_APPLICATION_ID',
  'YOUR_JAVASCRIPT_KEY'
);
Parse.serverURL = 'https://parseapi.back4app.com/';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);