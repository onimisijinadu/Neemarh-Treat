import { useState } from 'react';

import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router';
// import toast from 'react-hot-toast';
import { toast } from 'react-toastify';

import { GoogleLogin } from '@react-oauth/google';

import { LoginForm } from '../component/loginForm';
import { Overlay } from '../component/overly';
import { SignUpForm } from '../component/signUpForm';
import {
  useAuth,
  useOverlay,
} from '../context/usecontext';
import { ValidateFormInputs } from '../utils/validation';

export const LoginModal = () => {
  const { logIn, createUser, AuthWithGoogle, setShowLoginModal } = useAuth();

  const { isOpenNav, setisOpenNav } = useOverlay();

  const navigate = useNavigate();

  const [modal, setModal] = useState(true);

  const [screenRendering, setSecreenRendering] = useState(true);

  const [loading, setLoading] = useState(false);

  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    auth_method: "local",
  });

  const handleToggle = () => {
    setModal((prev) => !prev);
  };

  const handleChange = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const validate = ValidateFormInputs(
      userDetails.email,
      userDetails.password,
    );
    if (!validate.isValid) {
      toast.error(validate.message);
      return;
    }

    setLoading(true);
    try {
      logIn(userDetails);
      setModal(false);
      setisOpenNav(false);
      navigate("/menu");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = ValidateFormInputs(
      userDetails.email,
      userDetails.password,
    );

    if (!validation.isValid) {
      toast.warning(validation.message);
      return;
    }
    if (userDetails.password !== userDetails.confirmPassword) {
      toast.warning("Passwords do not match. Please re-type your password.");
      return;
    }
    setLoading(true);

    try {
      createUser(userDetails);
      navigate("/menu");
      setModal(false);
      setisOpenNav(false);
      setUserDetails({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Signup request failed:", error);
      toast.error(
        "An error occurred while creating your account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {modal && (
        <div onClick={() => setShowLoginModal(false)}>
          <Overlay
            isOpen={modal}
            toggleOverlay={handleToggle}
            overLayClass={`z-45`}
          ></Overlay>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-brandsurface p-5 w-90 sm:w-90 rounded-xl text-brandtext`}
          >
            {screenRendering ? (
              <>
                <LoginForm
                  handleChange={handleChange}
                  handleOnSubmit={handleLogin}
                  email={userDetails.email}
                  password={userDetails.password}
                />
                <p className=" text-center mb-3">Forgotten Password?</p>
              </>
            ) : (
              <>
                <SignUpForm
                  handleOnSubmit={handleSubmit}
                  handleChange={handleChange}
                  password={userDetails.password}
                  confirmPassword={userDetails.confirmPassword}
                  email={userDetails.email}
                  name={userDetails.name}
                />
              </>
            )}
            <div className="flex items-center justify-center w-full">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  console.log(decoded);
                  AuthWithGoogle(decoded);
                  setModal(false);
                  setisOpenNav(false);
                  navigate("/menu");
                }}
                // login_uri={}
                useOneTap
                text={`${screenRendering ? "continue_with" : "signup_with"}`}
                onError={() => console.log("Login Failed")}
                width="100%"
              ></GoogleLogin>
            </div>

            <div className="w-full items-center mt-2">
              <button
                onClick={() => setSecreenRendering(!screenRendering)}
                className="cursor-pointer w-full text-center "
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};
