/* eslint-disable react/prop-types */
import React from "react";

import closeNavDropdown from "../../assets/icons/closeNavDropdown.png";
import shareIcon from "../../assets/icons/shareIcon.png";
import displayIcon from "../../assets/icons/displayIcon.png";
import discordIcon from "../../assets/icons/discordIcon.png";
import instagramIcon from "../../assets/icons/instagramIcon.png";

const NavDropdown = ({
  isMobileMenuOpen,
  closeMobileMenu,
  userLoggedIn,
  doSignOut,
}) => {
  return (
    <>
      {isMobileMenuOpen && (
        <div className="z-20 h-full w-full position-absolute opacity-90 bg-dropdown-background">
          <div className="flex justify-end mt-4 mr-10">
            <img src={closeNavDropdown} onClick={() => closeMobileMenu()} />
          </div>
          <div className="flex flex-col items-center gap-6 md:gap-2 mt-16 md:mt-0">
            <a
              href="/"
              onClick={() => closeMobileMenu()}
              className="text-white no-underline hover:no-underline hover:text-white px-24 py-3 mt-4 border-2 border-white text-4xl"
            >
              Home
            </a>
            <a
              href="/beatmaplisting"
              onClick={() => closeMobileMenu()}
              className="text-search-text-gray no-underline hover:no-underline hover:text-search-text-gray text-xl"
            >
              Beatmaps
            </a>
            <a
              href="/musicianlisting"
              onClick={() => closeMobileMenu()}
              className="text-search-text-gray no-underline hover:no-underline hover:text-search-text-gray text-xl"
            >
              Musicians
            </a>
            <a
              href="/gallery"
              onClick={() => closeMobileMenu()}
              className="text-search-text-gray no-underline hover:no-underline hover:text-search-text-gray text-xl"
            >
              Art
            </a>
            <a
              href="/community"
              onClick={() => closeMobileMenu()}
              className="text-search-text-gray no-underline hover:no-underline hover:text-search-text-gray text-xl"
            >
              Social
            </a>
            <a
              href="/login"
              onClick={() => {
                doSignOut();
                closeMobileMenu();
              }}
              className="text-search-text-gray no-underline hover:no-underline hover:text-search-text-gray text-xl"
            >
              {userLoggedIn ? "Sign Out" : "Login"}
            </a>
            <div className="flex justify-center gap-3 mt-2">
              <img src={shareIcon} alt="share" href="" />
              <img src={displayIcon} alt="display" href="" />
              <img src={discordIcon} alt="discord" href="" />
              <img src={instagramIcon} alt="instagram" href="" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavDropdown;
