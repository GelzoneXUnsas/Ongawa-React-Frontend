import React, { useState } from "react";

import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";

import logoIcon from "../../assets/icons/ongawaLogoNameWhite.png";
import toggleMusicIcon from "../../assets/icons/toggleMusicIcon.png";
import toggleMusicIconOff from "../../assets/icons/toggleMusicIconOff.png";
import menuDropdownIcon from "../../assets/icons/menuDropdownIcon.png";
import NavDropdown from "../NavDropdown/NavDropdown";

const Header = () => {
  const { userLoggedIn } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [musicIsPlaying, setMusicIsPlaying] = useState(true);
  // const audioRef = useRef(new Audio("/path-to-your-audio-file.mp3"));
  const toggleMusic = () => {
    // if (musicIsPlaying) {
    //   audioRef.current.pause();
    // } else {
    //   audioRef.current.play();
    // }
    setMusicIsPlaying(!musicIsPlaying);
  };

  return (
    <>
      <nav className="header fixed top-0 left-0 w-full h-[75px] bg-header-gradient z-10 mb-[-75px] flex justify-between items-center overflow-visible opacity-90">
        <div className="ml-8">
          <a href="/">
            <img
              className="w-auto h-[2.5rem] cursor-pointer mb-[10px] z-[2]"
              alt="Virtuosos Logo"
              src={logoIcon}
            />
          </a>
        </div>
        <div className="ml-auto font-medium flex flex-row gap-8 pr-4 items-center mb-3">
          <a
            href="/beatmaplisting"
            className="hidden lg:block text-search-text-gray no-underline hover:no-underline hover:text-search-text-gray"
          >
            Beatmaps
          </a>
          <a
            href="/musicianlisting"
            className="hidden lg:block text-search-text-gray no-underline hover:no-underline hover:text-search-text-gray"
          >
            Musicians
          </a>
          <a
            href="/gallery"
            className="hidden lg:block text-search-text-gray no-underline hover:no-underline hover:text-search-text-gray"
          >
            Art
          </a>
          <a
            href="/community"
            className="hidden lg:block text-search-text-gray no-underline hover:no-underline hover:text-search-text-gray"
          >
            Social
          </a>
          <a
            href="/login"
            onClick={() => doSignOut()}
            className="hidden lg:block text-search-text-gray no-underline hover:no-underline hover:text-search-text-gray"
          >
            {userLoggedIn ? "Sign Out" : "Login"}
          </a>
          <img
            className="h-9"
            src={musicIsPlaying ? toggleMusicIcon : toggleMusicIconOff}
            alt="Music Toggle"
            onClick={toggleMusic}
          />

          <button
            // TODO: implement download on-click
            className="hidden lg:block rounded py-2 px-8 mr-6
              bg-search-text-gray text-page-background border-none
              hover:bg-search-text-gray hover:text-page-background hover:border-none
              focus:bg-search-text-gray focus:text-page-background focus:border-none
              active:bg-search-text-gray active:text-page-background active:border-none"
          >
            Download
          </button>
          <div className="lg:hidden mr-4 flex items-center">
            <button
              // TODO: implement demo on-click
              className="rounded flex items-center justify-center px-7 mr-6 text-sm h-9
              bg-search-text-gray text-page-background border-none
              hover:bg-search-text-gray hover:text-page-background hover:border-none
              focus:bg-search-text-gray focus:text-page-background focus:border-none
              active:bg-search-text-gray active:text-page-background active:border-none"
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
      />
    </>
  );
};

export default Header;
