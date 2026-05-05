import { useState, useEffect } from "react"; // Added useEffect
import PropTypes from "prop-types";

import {
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
  getErrorMessage,
} from "../../firebase/auth";

import ongawaLogoWithIcon from "../../assets/icons/ongawa_logo_with_icon.svg";
import xIcon from "../../assets/icons/x_Icon.svg";

const Register = ({ onClose, onSwitchToLogin, slideIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  // Animation State
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Trigger the slide-in animation after component mounts
    setIsMounted(true);
  }, []);

  // For closing "slide out"
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 700);
  };

  const isFormFilled =
    email.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "";

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (isRegistering) return;

    setIsRegistering(true);
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      onClose();
    } catch (err) {
      console.error("Email registration error:", err);
      setIsRegistering(false);
      setErrorMessage(getErrorMessage(err.code));
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (isRegistering) return;

    setIsRegistering(true);
    try {
      await doSignInWithGoogle();
      onClose();
    } catch (err) {
      console.error("Google SignIn error:", err);
      setIsRegistering(false);
      setErrorMessage(err.message);
    }
  };

  return (
    <div
      className={`
        fixed top-0 left-0 h-full z-50 w-full sm:w-[480px]
        bg-multi-off-black shadow-2xl
        flex flex-col justify-center px-8 sm:px-12 py-6
        transform transition-transform duration-700 ease-out
        ${
          slideIn &&
          (isMounted && !isClosing ? "translate-x-0" : "-translate-x-full")
        }
      `}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="mt-32 brightness-0 invert absolute top-6 right-6 opacity-70 hover:opacity-100 transition"
        aria-label="Close login modal"
      >
        <img src={xIcon} alt="Close" className="w-5 h-5" />
      </button>

      <div className="w-full flex flex-col items-center sm:items-start">
        {/* Logo */}
        <img
          className="w-auto h-16 self-center mb-8"
          src={ongawaLogoWithIcon}
          alt="Ongawa Logo"
        />

        {/* Title */}
        <h2 className="mt-6 font-nova-square text-light-grey font-normal text-3xl">
          Create a New Account
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
                bg-transparent border-l-4 border-transparent
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
              autoComplete="new-password"
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

          {/* Confirm Password Input */}
          <div className="relative">
            <input
              type="password"
              autoComplete="off"
              required
              disabled={isRegistering}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ backgroundColor: "#2A2724" }}
              className="
                peer w-full px-4 py-3 text-white
                bg-transparent border-l-4 border-transparent
                focus:outline-none transition-colors
                placeholder-gray-400
              "
              placeholder="Confirm Password"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <span className="text-main-accent font-bold text-sm block">
              {errorMessage}
            </span>
          )}

          {/* Sign Up Button */}
          <button
            disabled={isRegistering}
            className={`
              w-full flex items-center justify-center py-3 mt-4
              rounded-lg text-sm font-bold tracking-wide uppercase transition
              ${
                isFormFilled && !isRegistering
                  ? "bg-main-off-black hover:bg-white hover:shadow-lg"
                  : "bg-[#6D6D9933] text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {isRegistering ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-center w-full text-sm mt-8 mb-0 text-gray-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-main-accent font-semibold hover:underline"
          >
            Log in
          </button>
        </p>

        {/* Google Button  */}
        <div className="w-full mt-4">
          <button
            disabled={isRegistering}
            onClick={onGoogleSignIn}
            className={`
              w-full flex items-center justify-center gap-x-3 py-3 mt-4
              bg-white text-black rounded-lg text-sm font-medium
              ${
                isRegistering
                  ? "cursor-not-allowed opacity-70"
                  : "hover:bg-gray-100 transition"
              }
            `}
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path
                fill="#4285F4"
                d="M47.5 24.6c0-1.6-.1-3.3-.4-4.9H24.5v9.2h13c-.5 3-2.2 5.6-4.8 7.3v6h7.7c4.6-4.2 7.1-10.3 7.1-17.6z"
              />
              <path
                fill="#34A853"
                d="M24.5 48c6.5 0 12-2.1 16-5.8l-7.7-6c-2.1 1.5-4.9 2.3-8.3 2.3-6.3 0-11.6-4.2-13.5-9.9H3v6.2C7.1 42.9 15.4 48 24.5 48z"
              />
              <path
                fill="#FBBC04"
                d="M11 28.6c-1-3-1-6.2 0-9.2v-6.2H3c-3.4 6.8-3.4 14.8 0 21.6l8-6.2z"
              />
              <path
                fill="#EA4335"
                d="M24.5 9.5c3.4-.1 6.7 1.2 9.2 3.6l6.9-6.9C36.2 2.2 30.4 0 24.5 0 15.4 0 7.1 5.1 3 13.2l8 6.2c1.9-5.7 7.2-9.9 13.5-9.9z"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSwitchToLogin: PropTypes.func.isRequired,
  slideIn: PropTypes.bool,
};

Register.defaultProps = {
  slideIn: true,
};

export default Register;
