import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App.jsx';
import {
  AuthProvider,
  CartProvider,
  OverlayProvider,
} from './context/usecontext.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <OverlayProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
          <CartProvider>
            <App />
            {/* <Toaster position="top-right" reverseOrder={false} /> */}

            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
            />
          </CartProvider>
        </GoogleOAuthProvider>
      </OverlayProvider>
    </AuthProvider>
  </StrictMode>,
);
