import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// import axios from "axios";
import GalleryGrid from "../../GalleryGrid";
import styles from "./GalleryPage.module.css";
import homeStyles from "../Homepage/Homepage.module.css";
import headerBackgroundImg from '../../assets/images/headerBackground.png';

// const BACKEND_URL = 'http://api-virtuosos.us-west-1.elasticbeanstalk.com';

function GalleryPage() {
    const defaultArt = {
        screenart_list:
        [
            {
                id: 1,
                name: 'art1',
                artType: 'screenart',
                imagePath: '../src/assets/images/galleryArt/art1.png',
                description: 'Test Description',
                dateAdded : '2024-05-18'
            },
            {
                id: 2,
                name: 'art2',
                artType: 'screenart',
                imagePath: '../../assets/images/galleryArt/art2.png',
                description: 'Test Description2',
                dateAdded : '2024-05-11'
            },
            {
                id: 3,
                name: 'art3',
                artType: 'screenart',
                imagePath: '/../assets/images/galleryArt/art3.png',
                description: 'Test Description',
                dateAdded : '2024-05-18'
            },
            {
                id: 4,
                name: 'art4',
                artType: 'screenart',
                imagePath: '/../assets/images/galleryArt/art4.png',
                description: 'Test Description',
                dateAdded : '2024-05-18'
            },
            {
                id: 5,
                name: 'art5',
                artType: 'screenart',
                imagePath: '/../assets/images/galleryArt/art5.png',
                description: 'Test Description',
                dateAdded : '2024-05-18'
            },
            {
                id: 6,
                name: 'art6',
                artType: 'screenart',
                imagePath: '/../assets/images/galleryArt/art6.png',
                description: 'Test Description',
                dateAdded : '2024-05-18'
            },
            {
                id: 7,
                name: 'art7',
                artType: 'screenart',
                imagePath: '/../assets/images/galleryArt/art7.png',
                description: 'Test Description',
                dateAdded : '2024-05-18'
            },
            {
                id: 8,
                name: 'art8',
                artType: 'screenart',
                imagePath: '/../assets/images/galleryArt/art8.png',
                description: 'Test Description',
                dateAdded : '2024-05-18'
            }
        ],
    }
    const [galleryImages, setGalleryImages] = useState([]);
    const [activeTab, setActiveTab] = useState('/gallery');

    // async function fetchAll() {
    //     try {
    //         const route = BACKEND_URL + '/gallery';
    //         const response = await axios.get(route);
    //         console.log("trying to fetch art from backend");
    //         console.log(response.data);
    //         return response.data.screenart_list;
    //     } catch (error) {
    //         console.log("Error fetching gallery images, using default art instead:", error);
    //         return defaultArt.screenart_list; // Return default images if the backend call fails
    //     }
    // }

    useEffect(() => {
        // // uncomment this to start calling from backend
        // fetchAll().then(result => {
        //     console.log('RESULT', result);
        //     if (result) setGalleryImages(result);
        // });
        setGalleryImages(defaultArt.screenart_list);
    }, [defaultArt.screenart_list]);

    return (
        <div className={styles.gallerypage}>
            <div className={styles.titleContainer}>
                <div className={homeStyles.bgImgContainer}>
                    <img src={headerBackgroundImg} className={homeStyles.headerBackgroundImg} alt="" />
                </div>
                <div className={styles.titleText}>GALLERY</div>
                <div className={styles.gradientOverlay}></div>
            </div>
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
                <GalleryGrid galleryData={galleryImages} currentPage="art"/>
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
            {props.isActive ? <hr className={styles.titleHr} style={{transform: `translateX(${props.activeTab === '/gallery' ? '100%' : '0'})`}}></hr> : null}
        </div>
    );
}

export default GalleryPage;
