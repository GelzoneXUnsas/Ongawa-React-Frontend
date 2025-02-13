/* eslint-disable react/prop-types */
import React from "react";

import closeNavDropdown from "../../assets/icons/closeNavDropdown.png";
import shareIcon from "../../assets/icons/shareIcon.png";
import youtubeIcon from "../../assets/icons/youtubeIcon.png";
import discordIcon from "../../assets/icons/discordIcon.png";
import linkedinIcon from "../../assets/icons/linkedinIcon.png";

const NavDropdown = ({
  isMobileMenuOpen,
  closeMobileMenu,
  userLoggedIn,
  doSignOut,
}) => {
  return (
    <>
      {isMobileMenuOpen && (
        <div className="z-20 h-full w-full position-absolute opacity-90 bg-dropdown-background-color">
          <div className="flex justify-end mt-4 mr-10">
            <img src={closeNavDropdown} onClick={() => closeMobileMenu()} />
          </div>
          <div
            className="flex flex-col items-center gap-6 mt-16
                          [@media(max-height:400px)]:gap-1 
                          [@media(max-height:400px)]:mt-0"
          >
            <a
              href="/"
              onClick={() => closeMobileMenu()}
              className="text-white no-underline hover:no-underline hover:text-white 
                            px-24 py-3 border-2 border-white text-4xl"
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
            <div className="flex justify-center align-center gap-4 mt-2">
              <a href="https://www.ongawa.io/" target="blank">
                <img className="h-6" src={shareIcon} alt="share" />
              </a>
              <a href="https://discord.gg/vheHu3mX" target="blank">
                <img className="h-6" src={discordIcon} alt="discord" />
              </a>
              <a
                href="https://www.linkedin.com/showcase/ongawa/?viewAsMember=true"
                target="blank"
              >
                <img className="h-6" src={linkedinIcon} alt="linkedIn" />
              </a>
              <a
                href="https://www.youtube.com/@Ongawa_gg/featured"
                target="blank"
              >
                <img className="h-8" src={youtubeIcon} alt="youtube" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavDropdown;
