import PropTypes from "prop-types";

import { Link } from "react-router-dom";
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
        <div className="z-30 h-full w-full fixed inset-0 opacity-90 bg-dropdown-background-color">
          <div className="flex justify-end mt-16 mr-10">
            <img src={closeNavDropdown} onClick={() => closeMobileMenu()} />
          </div>
          <div
            className="flex flex-col items-center gap-6 mt-16
                          [@media(max-height:400px)]:gap-1 
                          [@media(max-height:400px)]:mt-0"
          >
            <Link
              to="/"
              onClick={() => closeMobileMenu()}
              className="text-white font-light font-nova-square no-underline hover:no-underline hover:text-white 
                            px-24 py-3 border-2 border-white text-3xl"
            >
              Home
            </Link>
            <Link
              to="/beatmaplisting"
              onClick={() => closeMobileMenu()}
              className="font-roboto font-normal text-search-text-gray no-underline hover:no-underline hover:text-search-text-gray text-xl"
            >
              Beatmaps
            </Link>
            <Link
              to="/musicianlisting"
              onClick={() => closeMobileMenu()}
              className="font-roboto text-search-text-gray no-underline hover:no-underline hover:text-search-text-gray text-xl"
            >
              Musicians
            </Link>
            <Link
              to="/gallery"
              onClick={() => closeMobileMenu()}
              className="font-roboto text-search-text-gray no-underline hover:no-underline hover:text-search-text-gray text-xl"
            >
              Art
            </Link>
            <Link
              to="/community"
              onClick={() => closeMobileMenu()}
              className="font-roboto text-search-text-gray no-underline hover:no-underline hover:text-search-text-gray text-xl"
            >
              Social
            </Link>
            <Link
              to="/login"
              onClick={() => {
                doSignOut();
                closeMobileMenu();
              }}
              className="font-roboto text-search-text-gray no-underline hover:no-underline hover:text-search-text-gray text-xl"
            >
              {userLoggedIn ? "Sign Out" : "Login"}
            </Link>
            <div className="flex justify-center align-center gap-4 mt-2">
              <a href="https://www.ongawa.io/" target="_blank">
                <img className="h-6" src={shareIcon} alt="share" />
              </a>
              <a href="https://discord.gg/vheHu3mX" target="_blank">
                <img className="h-6" src={discordIcon} alt="discord" />
              </a>
              <a
                href="https://www.linkedin.com/showcase/ongawa/?viewAsMember=true"
                target="_blank"
              >
                <img className="h-6" src={linkedinIcon} alt="linkedIn" />
              </a>
              <a
                href="https://www.youtube.com/@Ongawa_gg/featured"
                target="_blank"
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

NavDropdown.propTypes = {
  isMobileMenuOpen: PropTypes.bool.isRequired,
  closeMobileMenu: PropTypes.func.isRequired,
  userLoggedIn: PropTypes.bool.isRequired,
  doSignOut: PropTypes.func.isRequired,
};

export default NavDropdown;
