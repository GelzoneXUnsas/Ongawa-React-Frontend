import React, {useState, useEffect} from "react";
import { useNavigate} from 'react-router-dom';
// import axios from "axios";

import GalleryGrid from "../../GalleryGrid";
// import searchIcon from '../../assets/icons/searchIcon.svg';

import styles from "./GalleryPage.module.css";
import homeStyles from "../Homepage/Homepage.module.css";
import headerBackground from '../../assets/images/headerBackground.png';

// const BACKEND_URL = 'http://localhost:5001';
// const BACKEND_URL = 'http://api-virtuosos.us-west-1.elasticbeanstalk.com';

function MusicGalleryPage() {
    const defaultMusic = {
        musiccovers_list: 
        [
            {
                id: 1,
                name: 'Celestial Echoes',
                artType: 'musiccovers',
                imagePath: '../../assets/images/musicCovers/celestialechoes.png',
                description: 'Test Description3',
                dateAdded : '2024-05-11',

            },
            {
                id: 2,
                name: 'Celtic Whispers Ballad',
                artType: 'musiccovers',
                imagePath: '../../assets/images/musicCovers/celticwhispersballad.png',
                description: 'Test Description3',
                dateAdded : '2024-05-11',

            },
            {
                id: 3,
                name: 'Neon Pulse Sym',
                artType: 'musiccovers',
                imagePath: '../../assets/images/musicCovers/neonpulsesym.png',
                description: 'Test Description3',
                dateAdded : '2024-05-11',

            },
            {
                id: 4,
                name: 'Nocturnal Pursuit',
                artType: 'musiccovers',
                imagePath: '../../assets/images/musicCovers/nocturnalpursuit.png',
                description: 'Test Description3',
                dateAdded : '2024-05-11',

            }

        ]
    }
    const [galleryImages, setGalleryImages] = useState([]);
    const [activeTab, setActiveTab] = useState('/musicgallery'); // Default active tab

    // async function fetchAll() {
    //     try {
    //         const route = BACKEND_URL + '/gallery';
    //         const response = await axios.get(route);
    //         console.log(response.data.musiccovers_list);
    //         return response.data.musiccovers_list;
    //     }
    //     catch (error) {
    //         console.log("Error fetching gallery images, using default art instead:", error);
    //         return defaultArt.screenart_list; // Return default images if the backend call fails
    //     }
    // }

    useEffect(() => {
        // fetchAll().then(result => {
        //     if (result)
        //         setGalleryImages(result);
        //         console.log('RESULT Music cover', result);
        // });
        setGalleryImages(defaultMusic.musiccovers_list)
    }, [defaultMusic.musiccovers_list]);

    return (
        <div className={styles.gallerypage}>
            <div className={homeStyles.gradientContainer}>
                <div className={styles.titleContainer}>
                    <img src={headerBackground} className={homeStyles.headerBackgroundImg} alt="" />
                    <div className={styles.titleText}>GALLERY</div>
                    <div className={styles.gradientOverlay}></div>
                </div>
            </div>
            {/* <div className={styles.gallerySearchContainer}>
                <div className= {styles.gallerySearchItem}>
                    <form action="" className={styles.gallerySearchItem}>
                        <input type="text" placeholder="search" />
                        <button type="submit"><img src={searchIcon} alt="" /></button>
                    </form>
                </div>
            </div> */}
            <div className={styles.galleryDisplayMode}>
                <div className={styles.galleryDisplayModeContainter}>
                    <ArtTypeButton 
                        text="screen art" 
                        artType="/gallery" 
                        isActive={activeTab === '/gallery'} 
                        onClick={() => setActiveTab('/gallery')}
                    />
                    <ArtTypeButton 
                        text="music covers" 
                        artType="/musicgallery" 
                        isActive={activeTab === '/musicgallery'} 
                        onClick={() => setActiveTab('/musicgallery')}
                    />
                </div>
                <hr className={styles.menuDivider}></hr>
                <GalleryGrid galleryData={galleryImages} currentPage="musicCovers"/>
            </div>
        </div>
    );
}


function ArtTypeButton(props) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(props.artType);
        props.onClick();
    }

    const buttonClass = props.isActive ? `${styles.musicCoverMenuTitleText} ${styles.active}` : styles.musicCoverMenuTitleText;

    return (
        <div className={styles.pageButtonAndLine}>
            <button type="button" className={buttonClass} onClick={handleClick}>
                {props.text}
            </button>
            {props.isActive ? <hr className={styles.titleHr} style={{transform: `translateX(${props.activeTab === '/musicgallery' ? '100%' : '0'})`}}></hr> : null}
        </div>
    );
}

export default MusicGalleryPage;
