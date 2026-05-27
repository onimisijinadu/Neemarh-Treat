import { useState } from 'react';

import { Outlet } from 'react-router';

import { LoginModal } from '../auth/auth';
import { useAuth } from '../context/usecontext';
import { Footer } from './footer';
import { NavBar } from './navbar';

export const Layout = () => {
  const { showLoginModal } = useAuth();

  const [isOpenNav, setisOpenNav] = useState(false);

  const handletoggle = () => {
    setisOpenNav((prev) => !prev);
  };
  return (
    <>
      <div className="text-brandtext bg-brandsurface w-full overflow-x-hidden min-h-screen">
        {showLoginModal && <LoginModal />}
        <NavBar isOpen={isOpenNav} toogleBtn={handletoggle} />
        <main className="flex-1 pt-20 sm:pt-24">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};
