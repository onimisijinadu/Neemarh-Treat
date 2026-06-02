import { useEffect } from 'react';

import { Navigate } from 'react-router';

import { useAuth } from '../context/usecontext';

export const ProtectedRoutes = ({ allowedRole, children }) => {
  const { user, setShowLoginModal } = useAuth();

  // 🛡️ Wrap the side-effect inside a useEffect hook
  useEffect(() => {
    if (!user) {
      setShowLoginModal(true);
    }
  }, [user, setShowLoginModal]); // Runs only if the user status changes

  // 1. If user is not found, immediately redirect to cart safely
  if (!user) {
    return <Navigate to="/cart" replace />;
  }

  // 2. If the user has the wrong role, redirect to home safely
  if (allowedRole && allowedRole !== user.role) {
    return <Navigate to="/" replace />;
  }

  // 3. If everything is perfect, render the protected children screen
  return children;
};
