import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import {
  doCreateUserWithEmailAndPassword,
  getErrorMessage,
} from "../../../firebase/auth";

import headerBackgroundImg from "../../../assets/images/headerBackground.png";
import ongawaLogoWithIcon from "../../../assets/icons/ongawa_logo_with_icon.png";

const Register = () => {
  // const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userLoggedIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        const result = await doCreateUserWithEmailAndPassword(email, password);
        console.log("User registration successful:", result.user.uid);
        // const user = result.user;

        // // Assign user default role and store in dynamoDB
        // await setUserRole(user.uid, 'user');
        // console.log('User signed up and role assigned:', user);
      } catch (err) {
        console.error("Email SignIn error:", err);
        setIsRegistering(false);
        setErrorMessage(`${getErrorMessage(err.code)}`);
      }
    }
  };

  return (
    <>
      <div className="loginPage min-h-screen w-full bg-page-accent-gray overflow-hidden text-white text-body-overpass-base font-body-overpass">
        <div className="titleContainer relative h-60 z-0 overflow-hidden lg:h-72">
          <div className="bgImgContainer w-full lg:-mt-64">
            <img
              src={headerBackgroundImg}
              className="headerBackgroundImg w-full relative object-cover"
              alt=""
            />
          </div>
          <div className="absolute w-full h-12 bottom-0 z-3 flex justify-center text-white text-center font-title-lexend text-3xl font-bold">
            WELCOME!
          </div>
          <div className="gradientOverlay absolute bottom-0 w-full h-[70%] bg-gradient-overlay z-1"></div>
        </div>
        {userLoggedIn && <Navigate to={"/"} replace={true} />}

        <div className="w-full flex justify-center pb-20 px-3">
          <div className="flex flex-col w-96 text-gray-600 space-y-5 p-4 mt-4 shadow-2xl rounded-xl bg-dark-purple">
            {/* Logo */}
            <img
              className="mt-4 self-center"
              src={ongawaLogoWithIcon}
              alt="Ongawa Logo"
            />
            {/* Title */}
            <h2 className="mt-4 font-nova-square text-light-grey text-center font-normal text-2xl">
              Create a New Account
            </h2>

            <form onSubmit={onSubmit} className="space-y-3 w-full items-center">
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
              {/* Confirm Password Input */}
              <div className="relative">
                <input
                  type="password"
                  autoComplete="off"
                  required
                  disabled={isRegistering}
                  value={confirmPassword}
                  onChange={(e) => {
                    setconfirmPassword(e.target.value);
                  }}
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
                  placeholder="Confirm Password"
                />
              </div>

              {/* Error Message */}
              {errorMessage && (
                <span className="text-red-600 font-bold">{errorMessage}</span>
              )}

              {/* Sign Up Button*/}
              <button
                onClick={onSubmit}
                disabled={isRegistering}
                style={{
                  backgroundColor:
                    email.trim() !== "" &&
                    password.trim() !== "" &&
                    confirmPassword.trim() !== "" &&
                    !isRegistering
                      ? undefined
                      : "#6D6D9933",
                }}
                className={`
                    w-full flex items-center justify-center gap-x-3 py-2.5 mt-4
                    rounded-lg text-sm font-medium transition duration-300
                    ${
                      email.trim() !== "" &&
                      password.trim() !== "" &&
                      confirmPassword.trim() !== "" &&
                      !isRegistering
                        ? "bg-yellow-accent text-black hover:opacity-90"
                        : "text-white"
                    }
                    ${isRegistering ? "cursor-not-allowed opacity-70" : ""}
                `}
              >
                {isRegistering ? "Signing Up..." : "Sign Up"}
              </button>

              {/* Already Have Account Redirect */}
              <div className="text-white text-sm text-center">
                Already have an account? {"   "}
                <Link
                  to={"/login"}
                  className="text-yellow-accent underline hover:opacity-80"
                >
                  Continue
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
