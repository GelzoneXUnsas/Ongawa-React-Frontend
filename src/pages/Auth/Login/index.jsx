import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  getErrorMessage,
} from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContext";

import headerBackgroundImg from "../../../assets/images/headerBackground.png";
import ongawaLogoWithIcon from "../../../assets/icons/ongawa_logo_with_icon.png";

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isFormFilled = email.trim() !== "" && password.trim() !== "";

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password)
        .then((result) => {
          console.log("Email SignIn successful:", result.user.uid);
          console.log("UserID: ", result.user.uid);
          console.log("Stay signed in:", staySignedIn);
        })
        .catch((err) => {
          console.error("Email SignIn error:", err);
          setIsSigningIn(false);
          setErrorMessage(`${getErrorMessage(err.code)}`);
        });
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle()
        .then((result) => {
          console.log("Google SignIn successful:", result.user.uid);
        })
        .catch((err) => {
          console.error("Google SignIn error:", err);
          setIsSigningIn(false);
          setErrorMessage(`Error: ${err.message}`);
        });
    }
  };

  return (
    <div className="loginPage w-full bg-page-accent-gray overflow-hidden text-white text-body-overpass-base font-body-overpass min-h-screen">
      <div className="titleContainer relative h-60 z-0 overflow-hidden lg:h-72">
        <div className="bgImgContainer w-full lg:-mt-64">
          <img
            src={headerBackgroundImg}
            className="headerBackgroundImg w-full relative object-cover"
            alt=""
          />
        </div>
        <div className="absolute w-full h-12 bottom-0 z-3 flex justify-center text-white text-center font-title-lexend text-3xl font-bold">
          WELCOME BACK!
        </div>
        <div className="gradientOverlay absolute bottom-0 w-full h-[70%] bg-gradient-overlay z-1"></div>
      </div>

      <div className="w-full h-screen flex justify-center px-3">
        {userLoggedIn && <Navigate to={"/"} replace={true} />}

        <div className="w-96 flex self-start mt-4 justify-self-center place-items-center flex-col p-6 rounded-3xl shadow-2xl bg-dark-purple">
          {/* Logo */}
          <img className="mt-4" src={ongawaLogoWithIcon} alt="Ongawa Logo" />
          {/* Title */}
          <h2 className="mt-4 font-nova-square text-light-grey font-normal text-2xl">
            Account Login
          </h2>

          <form onSubmit={onSubmit} className="space-y-3 w-full mt-8">
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  backgroundColor: "#6D6D9933",
                  borderRadius: 0,
                }}
                className="
                  peer w-full px-3 pt-5 pb-2 text-white
                  bg-transparent rounded-none
                  focus:outline-none focus:ring-0 focus:border-none
                  !ring-0 !outline-none !border-none !shadow-none
                "
                placeholder="Email/Username"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  backgroundColor: "#6D6D9933",
                  borderRadius: 0,
                }}
                className="
                  peer w-full px-3 pt-5 pb-2 text-white
                  bg-transparent rounded-none
                  focus:outline-none focus:ring-0 focus:border-none
                  !ring-0 !outline-none !border-none !shadow-none
                "
                placeholder="Password"
              />
            </div>

            {errorMessage && (
              <span className="text-yellow-600 font-bold">{errorMessage}</span>
            )}

            {/* Login Button */}
            <button
              onClick={onSubmit}
              disabled={isSigningIn}
              style={{
                backgroundColor:
                  isFormFilled && !isSigningIn ? undefined : "#6D6D9933",
              }}
              className={`
                w-full flex items-center justify-center gap-x-3 py-2.5
                rounded-lg text-sm font-medium transition duration-300
                ${
                  isFormFilled && !isSigningIn
                    ? "bg-yellow-accent text-black hover:opacity-90"
                    : "text-white"
                }
                ${isSigningIn ? "cursor-not-allowed opacity-70" : ""}
              `}
            >
              {isSigningIn ? "Signing In..." : "Login"}
            </button>

            <div className="mt-0 flex justify-between w-full">
              {/* Stay signed in */}
              <label className="m-0 flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={staySignedIn}
                  onChange={(e) => setStaySignedIn(e.target.checked)}
                  className="w-3 h-3 cursor-pointer mt-[2px]"
                />
                <p className="text-sm font-normal">Stay signed in</p>
              </label>
              {/* Forgot Password */}
              <Link
                to="/forgot-password"
                className="text-sm text-yellow-accent underline hover:opacity-80"
              >
                Forgot password?
              </Link>
            </div>
          </form>

          {/* Sign Up for Account Redirect */}
          <p className="text-center text-sm mt-2">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-yellow-accent underline hover:opacity-80"
            >
              Sign up
            </Link>
          </p>

          {/* Google Button */}
          <div className="flex w-full justify-start">
            <button
              disabled={isSigningIn}
              onClick={(e) => onGoogleSignIn(e)}
              className={`
              w-16 flex items-center justify-center gap-x-3 py-2.5
              bg-white text-black rounded-lg text-sm font-medium
              ${
                isSigningIn
                  ? "cursor-not-allowed"
                  : "hover:bg-page-background hover:text-white transition duration-300 active:bg-page-background active:text-white"
              }
            `}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                    fill="#34A853"
                  />
                  <path
                    d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
