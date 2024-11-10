import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

import logoIcon from '../../assets/icons/ongawaIconWhite.svg';
// import instagramIcon from "../../assets/icons/instagramIcon.svg";
// import xIcon from "../../assets/icons/xIcon.svg";
// import tiktokIcon from "../../assets/icons/tiktokIcon.svg";

import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    const navigate = useNavigate();
    const gameDownloadLink = "https://gelzonexunsas.itch.io/virtuosos";
    return (
        <div className={styles.footer}>
            <div className={styles.footerContainer}>
            <div className={styles.footerSections} >
            <div className="p-2 hover:underline cursor-pointer" 
                onClick={() => {
                    navigate("/beatmaplisting");
                }}>
                Beatmaps
            </div>
            {/* <div className={styles.footerSectionPageItem}
                onClick={() => {
                    navigate("/comingsoon");
                }}>
                Artists
            </div>
            <div className={styles.footerSectionPageItem}
                onClick={() => {
                    navigate("/comingsoon");
                    }}>
                Community
            </div> */}
            <div className="p-2 hover:underline cursor-pointer"
                onClick={() => {
                    navigate("/gallery");
                    }}>
                Art
            </div>
            <div className="p-2 hover:underline cursor-pointer"
                onClick={() => {
                    navigate("/musicianlisting");
                    }}>
                Artists
            </div>
            <div className="p-2 hover:underline cursor-pointer"
                onClick={() => {
                    navigate("/community");
                    }}>
                Community
            </div>
            </div>
            <div className="mb-4 flex flex-row justify-center">
            <div className={styles.footerSocialsItem}>
            <a href={gameDownloadLink} target="_blank" rel="noreferrer">
            <img className="h-[4vh] text-white text-4xl hover:text-purple-accent hover:scale-110 transition-transform duration-300" src={logoIcon} alt="Ongawa Logo"/>
            </a>
            </div>
            {/* <button className={styles.footerSocialsItem}>
                <a href="https://www.linkedin.com/showcase/virtuososgame/?viewAsMember=true" target="_blank" rel="noreferrer">
                    <img src={logoIcon} alt="Virtuosos Logo" />
                </a>
            </button> */}

            <div className="{styles.footerSocialsItem}">
                <a href="https://www.linkedin.com/showcase/virtuososgame/?viewAsMember=true" target="_blank" rel="noreferrer">
            <FaLinkedinIn className="text-white translate-y-5 text-4xl sm:text-2xl md:text-3xl lg:text-4xl hover:text-purple-accent hover:scale-110 transition-transform duration-300" />
          </a>
            </div>
            </div>
            <div className={styles.footerEmail}>
                contact ongawa.game@gmail.com for support
            </div>
        </div>
    </div>
    );
}

export default Footer;