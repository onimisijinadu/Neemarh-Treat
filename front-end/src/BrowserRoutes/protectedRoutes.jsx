import { Navigate } from 'react-router';

import { useAuth } from '../context/usecontext';

export const ProtectedRoutes = ({ allowedRole, children }) => {
  const { user, setShowLoginModal } = useAuth();

  //if user is not found
  if (!user) {
    setShowLoginModal(true);

    return <Navigate to="/cart" replace />;
  }

  //if the user have the allowed role but not on the right loginpage
  if (allowedRole && allowedRole !== user.role)
    return <Navigate to="/" replace />;

  return children;
};
