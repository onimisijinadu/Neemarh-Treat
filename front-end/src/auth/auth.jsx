import { useState } from 'react';

import { jwtDecode } from 'jwt-decode';

import { GoogleLogin } from '@react-oauth/google';

import { LoginForm } from '../component/loginForm';
import { Overlay } from '../component/overly';
import { SignUpForm } from '../component/signUpForm';
import { useAuth } from '../context/usecontext';

export const LoginModal = () => {
  const { logIn } = useAuth();

  const [modal, setModal] = useState(true);

  const [screenRendering, setSecreenRendering] = useState(true);

  const handleToggle = () => {
    setModal((prev) => !prev);
  };

  return (
    <>
      {modal && (
        <>
          <Overlay isOpen={modal} toggleOverlay={handleToggle}></Overlay>
          <div
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-brandsurface p-5 w-90 sm:w-90 rounded-xl text-brandtext`}
          >
            {screenRendering ? (
              <>
                <LoginForm />
                <p className=" text-center mb-3">Forgotten Password?</p>
              </>
            ) : (
              <>
                <SignUpForm />
              </>
            )}

            <button
              onClick={() => setSecreenRendering(!screenRendering)}
              className="cursor-pointer"
            >
              {screenRendering ? (
                <>
                  No Account? <span>SignUp</span>
                </>
              ) : (
                <>
                  Already have account? <span>Log In</span>
                </>
              )}
            </button>

            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decoded = jwtDecode(credentialResponse.credential);
                console.log(decoded);
                logIn(decoded);
                setModal(false);
              }}
              // login_uri={}
              useOneTap
              text={`${screenRendering ? "Sign in with Google" : "Sign up with Google"}`}
              onError={() => console.log("Login Failed")}
            ></GoogleLogin>
          </div>
        </>
      )}
    </>
  );
};
