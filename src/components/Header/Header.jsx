import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import { useAuth } from "../../contexts/authContext";
import { signOut } from "aws-amplify/auth";

import { useNavigate } from "react-router-dom";

import logoIcon from "../../assets/icons/ongawaLogoNameWhite.png";
import toggleMusicIcon from "../../assets/icons/toggleMusicIcon.png";
import toggleMusicIconOff from "../../assets/icons/toggleMusicIconOff.png";
import menuDropdownIcon from "../../assets/icons/menuDropdownIcon.png";
import NavDropdown from "../NavDropdown/NavDropdown";

const Header = ({ setMuted }) => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [muted, setLocalMuted] = useState(true);
  
  useEffect(() => {
    setMuted(muted);
  }, [muted, setMuted]);

  const toggleMusic = () => {
    setLocalMuted(!muted);
  };

  // Amplify sign out function
  const doSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
    }
  };

  return (
    <>
      <nav className="header fixed top-0 left-0 w-full h-[75px] bg-header-gradient z-50 mb-[-75px] flex justify-between items-center overflow-visible opacity-90 font-mukta-mahee">
        {/* Ongawa Logo */}
        <div className="ml-8">
          <Link to="/">
            <img
              className="w-auto h-[2.5rem] cursor-pointer mb-[10px] z-[2]"
              alt="Ongawa Logo"
              src={logoIcon}
            />
          </Link>
        </div>
        {/* Links and Buttons */}
        <div className="ml-auto font-medium text-[1.05rem] flex flex-row gap-8 pr-4 items-center mb-3">
          {/* Beatmaps Page Link */}
          <Link
            to="/beatmaplisting"
            className="hidden md:block text-link-text-khaki no-underline hover:no-underline hover:text-link-text-khaki-active"
          >
            Beatmaps
          </Link>
          {/* Musician Page Link */}
          <Link
            to="/musicianlisting"
            className="hidden md:block text-link-text-khaki no-underline hover:no-underline hover:text-link-text-khaki-active"
          >
            Musicians
          </Link>

          {/* Worlds Page Link */}
          <Link
            to="/worlds"
            className="hidden md:block text-link-text-khaki no-underline hover:no-underline hover:text-link-text-khaki-active"
          >
            Worlds
          </Link>

          {/* Art Page Link */}
          <Link
            to="/gallery"
            className="hidden md:block text-link-text-khaki no-underline hover:no-underline hover:text-link-text-khaki-active"
          >
            Art
          </Link>
          {/* Social Page Link */}
          <Link
            to="/community"
            className="hidden md:block text-link-text-khaki no-underline hover:no-underline hover:text-link-text-khaki-active"
          >
            Social
          </Link>
          {/* Login Button */}
          <button
            onClick={() => userLoggedIn ? doSignOut() : navigate("/login")}
            className="hidden md:block text-link-text-gray hover:text-search-text-gray"
          >
            {userLoggedIn ? "Sign Out" : "Login"}
          </button>
          {/* Music Toggle */}
          <img
            className="h-9"
            src={muted ? toggleMusicIconOff : toggleMusicIcon}
            alt="Music Toggle"
            onClick={toggleMusic}
          />
          <button
            // TODO: implement download on-click
            className="hidden md:block rounded py-3 px-8 mr-6 font-mukta-mahee
              bg-main-accent text-main-off-black border-none
              hover:bg-main-accent hover:text-main-off-black hover:border-none
              focus:bg-main-accent focus:text-main-off-black focus:border-none
              active:bg-main-accent active:text-main-off-black active:border-none"
          >
            Demo
          </button>
          {/* Mobile Links and Buttons */}
          <div className="md:hidden mr-4 flex items-center">
            <button
              // TODO: implement demo on-click
              className="rounded flex items-center justify-center px-7 mr-6 text-sm h-9 font-mukta-mahee
              bg-main-accent text-main-off-black border-none
              hover:bg-main-accent hover:text-main-off-black hover:border-none
              focus:bg-main-accent focus:text-main-off-black focus:border-none
              active:bg-main-accent active:text-main-off-black active:border-none"
            >
              Demo
            </button>
            <img
              src={menuDropdownIcon}
              alt="navigation_dropdown"
              onClick={() => setIsMobileMenuOpen(true)}
            ></img>
          </div>
        </div>
      </nav>
      <NavDropdown
        isMobileMenuOpen={isMobileMenuOpen}
        closeMobileMenu={() => setIsMobileMenuOpen(false)}
        userLoggedIn={userLoggedIn}
        doSignOut={doSignOut}
        onLoginClick={() => navigate("/login")}
      />
    </>
  );
};

Header.propTypes = {
  setMuted: PropTypes.func.isRequired,
};

export default Header;
