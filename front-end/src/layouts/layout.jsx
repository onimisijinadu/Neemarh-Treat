import { Outlet } from 'react-router';

import { LoginModal } from '../auth/auth';
import { Overlay } from '../component/overly';
import {
  useAuth,
  useOverlay,
} from '../context/usecontext';
import { Footer } from './footer';
import { NavBar } from './navbar';

export const Layout = () => {
  const { showLoginModal, user } = useAuth();

  const { isOpenNav, setisOpenNav } = useOverlay();

  const handletoggle = () => {
    setisOpenNav((prev) => !prev);
  };
  return (
    <>
      <div className="text-brandtext bg-brandsurface w-full overflow-x-hidden min-h-screen">
        <Overlay
          isOpen={isOpenNav}
          toggleOverlay={handletoggle}
          // overLayClass={`z-45`}
        ></Overlay>
        {showLoginModal && <LoginModal />}
        <NavBar isOpen={isOpenNav} toogleBtn={handletoggle} />
        <main className="flex-1 pt-20 sm:pt-24">
          <Outlet />
        </main>
        {!user && <Footer />}
      </div>
    </>
  );
};
