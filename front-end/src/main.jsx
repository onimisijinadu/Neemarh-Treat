import './index.css';

import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';

import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App.jsx';
import {
  AuthProvider,
  CartProvider,
} from './context/usecontext.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <CartProvider>
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </CartProvider>
      </GoogleOAuthProvider>
    </AuthProvider>
  </StrictMode>,
);
