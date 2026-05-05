import React, { useState, useEffect } from "react"
import { Navigate, Link } from 'react-router-dom'
import { signIn, signInWithRedirect } from 'aws-amplify/auth'
import { useAuth } from "../../../contexts/authContext"
import outputs from '../../../../amplify_outputs.json'
import { Amplify } from "aws-amplify"
import BackgroundCarousel from '../../../components/BackgroundCarousel/BackgroundCarousel'
import ongawaLogoWithIcon from '../../../assets/icons/ongawa_logo_with_icon.svg'

// Configure Amplify
Amplify.configure(outputs)

// Helper function to convert Amplify errors to user-friendly messages
const getErrorMessage = (error) => {
    const errorMap = {
        'UserNotFoundException': 'No account found with this email.',
        'NotAuthorizedException': 'Incorrect email or password.',
        'UserNotConfirmedException': 'Please verify your email before signing in.',
        'InvalidParameterException': 'Invalid email or password format.',
        'TooManyRequestsException': 'Too many failed attempts. Please try again later.',
    }
    
    if (error.name && errorMap[error.name]) {
        return errorMap[error.name]
    }
    
    return error.message || 'An error occurred during sign in.'
}

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Animation State
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Trigger the slide-in animation after component mounts
    setIsMounted(true);
  }, []);

  const isFormFilled = email.trim() !== "" && password.trim() !== "";

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            setErrorMessage('')
            
            try {
                const { isSignedIn, nextStep } = await signIn({
                    username: email,
                    password
                })
                
                if (isSignedIn) {
                    const { getCurrentUser } = await import('aws-amplify/auth')
                    const user = await getCurrentUser()
                    console.log("Email SignIn successful:", user.userId)
                    console.log("UserID: ", user.userId)
                    // User is now signed in, authContext will handle the redirect
                }
                
                setIsSigningIn(false)
                
            } catch (err) {
                console.error("Email SignIn error:", err)
                setIsSigningIn(false)
                setErrorMessage(getErrorMessage(err))
            }
        }
    }

    const onGoogleSignIn = async (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            console.log("trying to call google signin")
            setIsSigningIn(true)
            setErrorMessage('')
            
            try {
                await signInWithRedirect({ provider: 'Google' })
                // User will be redirected to Google login
                // After successful auth, they'll be redirected back to your app
                
            } catch (err) {
                console.error("Google SignIn error:", err)
                setIsSigningIn(false)
                setErrorMessage(`Error: ${err.message}`)
            }
        }
    }

  return (
    <div className="loginPage relative w-full bg-page-accent-gray overflow-hidden text-white text-body-overpass-base font-body-overpass min-h-screen">
      {userLoggedIn && <Navigate to={"/"} replace={true} />}

      {/* Background Carousel */}
      <div className="absolute inset-0 h-full w-full z-10">
        <BackgroundCarousel />
      </div>

      {/* Login Modal */}
      <div
        className={`
          fixed top-0 left-0 h-full z-20 w-full sm:w-[480px] bg-multi-off-black shadow-2xl
          flex flex-col justify-center px-8 sm:px-12 py-6 transform transition-transform duration-700 ease-out
          ${isMounted ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="w-full flex flex-col items-center sm:items-start">
          {/* Logo */}
          <img
            className="w-auto h-16 self-center mb-8"
            src={ongawaLogoWithIcon}
            alt="Ongawa Logo"
          />

          {/* Title */}
          <h2 className="mt-6 font-nova-square text-light-grey font-normal text-3xl">
            Account Login
          </h2>

          <form onSubmit={onSubmit} className="space-y-4 w-full mt-8">
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ backgroundColor: "#2A2724" }}
                className="
                  peer w-full px-4 py-3 text-white
                  bg-transparent border-l-4 border-transparen
                  focus:outline-none transition-colors
                  placeholder-gray-400
                "
                placeholder="Email address"
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
                style={{ backgroundColor: "#2A2724" }}
                className="
                  peer w-full px-4 py-3 text-white
                  bg-transparent border-l-4 border-transparent
                  focus:outline-none transition-colors
                  placeholder-gray-400
                "
                placeholder="Password"
              />
            </div>

            {/* Login Button */}
            <button
              onClick={onSubmit}
              disabled={isSigningIn}
              className={`
                w-full flex items-center justify-center py-3 mt-4
                rounded-lg text-sm font-bold tracking-wide uppercase transition duration-300
                ${
                  isFormFilled && !isSigningIn
                    ? "bg-main-off-black text-[#EFECE65C/36] hover:bg-white hover:shadow-lg"
                    : "bg-[#6D6D9933] text-gray-400 cursor-not-allowed"
                }
              `}
            >
              {isSigningIn ? "Signing In..." : "Log In"}
            </button>

            {/* Error Message */}
            {errorMessage && (
              <span className="text-main-accent font-bold text-sm block">
                {errorMessage}
              </span>
            )}

            <div className="flex justify-between w-full items-center text-sm">
              {/* Stay signed in */}
              <label className="flex gap-2 cursor-pointer items-center group">
                <input
                  type="checkbox"
                  checked={staySignedIn}
                  onChange={(e) => setStaySignedIn(e.target.checked)}
                  className="w-4 h-4 cursor-pointer accent-main-accent"
                />
                <span className="text-gray-300 group-hover:text-white transition">
                  Stay signed in
                </span>
              </label>

              {/* Forgot Password */}
              <Link
                to="/forgot-password"
                className="text-main-accent hover:text-white transition duration-300"
              >
                Forgot password?
              </Link>
            </div>
          </form>

          {/* Sign Up Redirect */}
          <p className="text-center w-full text-sm mt-2 mb-0 text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              to={"/register"}
              className="text-main-accent font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>

          {/* Google Button */}
          <div className="w-full mt-4">
            <button
              disabled={isSigningIn}
              onClick={(e) => onGoogleSignIn(e)}
              className={`
                w-full flex items-center justify-center gap-x-3 py-3 mt-4
                bg-white text-black rounded-lg text-sm font-medium
                ${
                  isSigningIn
                    ? "cursor-not-allowed opacity-70"
                    : "hover:bg-gray-100 transition duration-300"
                }
              `}
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48">
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
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
