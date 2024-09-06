import React from "react";

import styles from "./ComingSoonPage.module.css";


import headerBackgroundImg from '../../assets/images/headerBackground.png';


const ComingSoonPage = () => { 
    return (
        <>
        
        <div className={styles.comingsoonPage}>
            <div className="titleContainer relative h-60 z-0 overflow-hidden lg:h-72">
                <div className="bgImgContainer w-full lg:-mt-64">
                    <img src={headerBackgroundImg} className="headerBackgroundImg w-full relative object-cover" alt="" />
                </div>
                <div className="absolute w-full h-12 bottom-0 z-3 flex justify-center text-white text-center font-title-lexend text-3xl font-bold">COMING SOON</div>
                <div className="gradientOverlay absolute bottom-0 w-full h-[70%] bg-gradient-overlay z-1"></div>
            </div>
            <div className={styles.comingsoonContent}>
                This page is under construction. Thanks for your patience!
            </div>

        </div>
        </>
    );
};

export default ComingSoonPage;