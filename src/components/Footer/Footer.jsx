import { Link } from "react-router-dom";

import linkedInIcon from "../../assets/icons/linkedinIcon.svg";
import ongawaLogoIcon from "../../assets/icons/ongawaIconWhite.svg";
import instagramIcon from "../../assets/icons/instagramIcon.svg";
import xIcon from "../../assets/icons/xIcon.svg";

const Footer = () => {
  return (
    <div className="py-8 w-full flex flex-col items-center gap-5 bg-page-background-purple">
      {/* Links to other Pages */}
      <Link
        to={"/beatmaplisting"}
        className="font-roboto font-bold text-white hover:text-white"
      >
        Beatmaps
      </Link>
      <Link
        to={"/musicianlisting"}
        className="font-roboto font-bold text-white hover:text-white"
      >
        Artists
      </Link>
      <Link
        to={"/community"}
        className="font-roboto font-bold text-white hover:text-white"
      >
        Community
      </Link>
      <Link
        to={"/gallery"}
        className="font-roboto font-bold text-white hover:text-white"
      >
        Art
      </Link>

      {/* Icons */}
      <div className="flex justify-between items-center gap-4">
        {/* Ongawa Logo */}
        <a href="https://gelzonexunsas.itch.io/virtuosos" target="blank">
          <img
            className="w-auto h-6 cursor-pointer"
            alt="Ongawa Icon"
            src={ongawaLogoIcon}
          />
        </a>
        {/* LinkedIn Logo */}
        <a
          href="https://www.linkedin.com/showcase/ongawa/?viewAsMember=true"
          target="blank"
        >
          <img
            className="w-auto h-6 cursor-pointer"
            alt="LinkedIn Icon"
            src={linkedInIcon}
          />
        </a>
        {/* Instagram Logo */}
        <a href="https://www.instagram.com/Ongawa.gg/" target="blank">
          <img
            className="w-auto h-6 cursor-pointer"
            alt="Instagram Icon"
            src={instagramIcon}
          />
        </a>
        {/* X/Twitter Logo */}
        <a href="https://x.com/Ongawa_gg" target="blank">
          <img className="w-auto h-6 cursor-pointer" alt="X Icon" src={xIcon} />
        </a>
      </div>

      {/* Contact Information */}
      <p className="font-roboto font-medium text-xs text-white">
        contact ongawa.game@gmail.com for support
      </p>
    </div>
  );
};

export default Footer;
