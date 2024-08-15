import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

import logoIcon from '../../assets/icons/ongawaIconWhite.svg';
// import instagramIcon from "../../assets/icons/instagramIcon.svg";
// import xIcon from "../../assets/icons/xIcon.svg";
// import tiktokIcon from "../../assets/icons/tiktokIcon.svg";
import linkedInIcon from "../../assets/icons/linkedinIcon.svg";
const Footer = () => {
    const navigate = useNavigate();
    const gameDownloadLink = "https://gelzonexunsas.itch.io/virtuosos";
    return (
        <div className={styles.footer}>
            <div className={styles.footerContainer}>
            <div className={styles.footerSections}>
            <div className={styles.footerSectionPageItem} 
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
            <div className={styles.footerSectionPageItem}
                onClick={() => {
                    navigate("/gallery");
                    }}>
                Art
            </div>
            </div>
            <div className={styles.footerSocials}>
            <button className={styles.footerSocialsItem}>
            <a href={gameDownloadLink} target="_blank" rel="noreferrer">
            <img className={styles.footerlogo} src={logoIcon} alt="Ongawa Logo"/>
            </a>
            </button>
            {/* <button className={styles.footerSocialsItem}>
                <a href="https://www.linkedin.com/showcase/virtuososgame/?viewAsMember=true" target="_blank" rel="noreferrer">
                    <img src={logoIcon} alt="Virtuosos Logo" />
                </a>
            </button> */}

            <button className={styles.footerSocialsItem}>
                <a href="https://www.linkedin.com/showcase/virtuososgame/?viewAsMember=true" target="_blank" rel="noreferrer">
                    <img src={linkedInIcon} alt="LinkedIn Logo" />
                </a>
            </button>
            </div>
            <div className={styles.footerEmail}>
                contact ongawa.game@gmail.com for support
            </div>
        </div>
    </div>
    );
}

export default Footer;