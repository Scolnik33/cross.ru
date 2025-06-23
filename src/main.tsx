import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/utils/ScrollToTop';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <ScrollToTop />
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
            <Toaster 
              position="top-right"
              toastOptions={{
                style: {
                  background: '#2D2D2D',
                  color: '#E0E0E0',
                  border: '1px solid #333333',
                },
              }}
            />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);