import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { MovieProvider } from './context/MovieContext';
import { UserProvider } from './context/UserContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <MovieProvider>
          <App />
        </MovieProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);