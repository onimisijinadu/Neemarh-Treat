import {
  Menu,
  ShoppingCartIcon,
  Sparkles,
  X,
} from 'lucide-react';
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router';

import { CsButton } from '../component/button';
import { Overlay } from '../component/overly';
import {
  useAuth,
  useCart,
} from '../context/usecontext';
import {
  MenuLinks,
  UserNav,
} from '../data/data';

export const NavBar = ({ isOpen, toogleBtn }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cartCount } = useCart();

  const { user, logOut, setShowLoginModal } = useAuth();

  // const [modal, setModal] = useState(true);

  const handleLogin = () => {
    setShowLoginModal(true);
    toogleBtn();
  };

  return (
    <>
      <Overlay isOpen={isOpen} toggleOverlay={toogleBtn} />
      <div className="fixed z-40 w-full flex justify-between items-center gap-3 bg-mist-950 text-white/60 font-medium text-sm px-2.5 py-4 sm:px-10 lg:px-10 sm:py-6 border-y border-y-orange-400/70">
        <div className="flex gap-3">
          <Sparkles className="w-12 h-12 p-2 bg-orange-400 rounded-xl shadow shadow-orange-500 text-black font-semibold" />
          <div className="text-lg flex flex-col relative text-orange-400 shadow-2xl">
            <div className="font-semibold p-0 m-0 tex-lg sm:text-xl">
              Neemah's
            </div>
            <span className="font-light absolute -bottom-0.5 left-0">
              Treat
            </span>
          </div>
        </div>
        {!user && (
          <div className={`hidden lg:flex items-center gap-3.5`}>
            {MenuLinks.map((link) => {
              const isActiveLink =
                location.pathname === link.path ||
                location.pathname.startsWith(`${link.path}/`);

              return (
                <Link
                  key={link.name}
                  className="relative flex flex-col items-center gap-3 hover:bg-orange-500/10 hover:text-orange-400  px-3 py-2 rounded-lg transition-colors duration-300"
                  to={link.path}
                >
                  {link.name}
                  {isActiveLink && (
                    <div className="absolute w-3/4 h-0.5 bg-orange-500 -bottom-0.5" />

                    // <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>
        )}
        <div className="flex gap-5 items-center max-w-full">
          <div
            onClick={() => navigate("/cart")}
            className="relative bg-gray-950 border border-orange-400/60 rounded-lg p-2"
          >
            <ShoppingCartIcon className="w-5 h-5 font-bold text-orange-500/70" />
            {cartCount >= 1 && (
              <span className="absolute -top-1.5 -right-2 font-bold flex items-center justify-center rounded-full text-xs w-6 h-6 text-black/90 p-1.5 bg-orange-400 border-2 border-black/70">
                {cartCount}
              </span>
            )}
          </div>
          {!user && (
            <CsButton
              text={`Login`}
              action={handleLogin}
              className={`hidden lg:flex items-center justify-center bg-orange-400/90 w-full py-1.5 px-4  rounded-xl text-lg text-black/80 hover:bg-orange-400/70 font-semibold`}
            />
          )}

          <div
            className={`flex flex-col justify-center items-center ${user ? "" : "lg:hidden"}`}
          >
            <div onClick={toogleBtn} className="relative">
              <Menu
                className={`w-7 h-7 text-orange-500/70 ${isOpen ? "hidden" : "block"} transition-transform duration-300`}
              />
              <X
                className={`w-7 h-7 text-orange-500/70 ${isOpen ? "block" : "hidden"}`}
              />
            </div>

            {/* Mobile Menu Container */}
            <div
              className={`fixed z-50 bg-white shadow-xl w-full md:w-1/3 lg:w-1/5 h-fit p-6 flex flex-col gap-4 text-black/80 items-start top-18.25 sm:top-22.25 md:top-23.25 lg:top-24.25 right-0 transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {user ? (
                <>
                  {UserNav.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={toogleBtn} // Close menu when a link is clicked
                      className="w-full hover:bg-orange-500/10 hover:text-orange-500 font-semibold rounded-lg p-3 border-b border-gray-100 last:border-0"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      logOut();
                      toogleBtn();
                    }}
                    className="w-full text-left hover:bg-red-500/10 hover:text-red-600 font-semibold rounded-lg p-3"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {MenuLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={toogleBtn} // Close menu when a link is clicked
                      className="w-full hover:bg-orange-500/10 hover:text-orange-500 font-semibold rounded-lg p-3 border-b border-gray-100 last:border-0"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <CsButton
                    text={`Login`}
                    action={handleLogin}
                    className={`flex items-center justify-center bg-orange-400/90 w-full py-1.5 px-4  rounded-xl text-lg text-black/80 hover:bg-orange-400/70 font-semibold`}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
