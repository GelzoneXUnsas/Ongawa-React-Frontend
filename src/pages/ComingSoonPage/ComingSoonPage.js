import React from "react";

import styles from "./ComingSoonPage.module.css";


import headerBackground from '../../assets/images/headerBackground.png';


const ComingSoonPage = () => { 
    return (
        <div className={styles.comingsoonPage}>
            <div className={styles.titleContainer}>
                <img src={headerBackground} className={styles.headerBackground} alt="" />
                <div className={styles.titleText}>COMING SOON</div>
            </div>
            <div className={styles.comingsoonContent}>
                This page is under construction. Thanks for your patience!
            </div>

        </div>
    );
};

export default ComingSoonPage;