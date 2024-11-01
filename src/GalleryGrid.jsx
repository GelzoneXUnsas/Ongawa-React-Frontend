import React, { useState } from 'react'
import styles from "./pages/GalleryPage/GalleryPage.module.css"; 

//This is what is used rn. hardcoded. API endpoint doesnt get used currently. its called in the galleryPage files but not sure what happens after...
import art1 from "../src/assets/images/galleryArt/art1.png";
import art2 from "../src/assets/images/galleryArt/art2.png";
import art3 from "../src/assets/images/galleryArt/art3.png";
import art4 from "../src/assets/images/galleryArt/art4.png";
import art5 from "../src/assets/images/galleryArt/art5.png";
import art6 from "../src/assets/images/galleryArt/art6.png";
import art7 from "../src/assets/images/galleryArt/art7.png";
import art8 from "../src/assets/images/galleryArt/art8.png";

import music1 from "../src/assets/images/musicCovers/celestialechoesHD.png";
import music2 from "../src/assets/images/musicCovers/celticwhispersballadHD.png";
import music3 from "../src/assets/images/musicCovers/neonpulsesymHD.png";
import music4 from "../src/assets/images/musicCovers/nocturnalpursuitHD.png";

const artImages = [art1, art2, art3, art4, art5, art6, art7, art8];
const musicCovers = [music1, music2, music3, music4];

function GalleryGrid(props) {
    const [selectedImage, setSelectedImage] = useState(null); // State to track the selected image

    const handleImageClick = (image) => {
        setSelectedImage(image); // Set the selected image
    };

    const closeOverlay = () => {
        setSelectedImage(null); // Close the overlay by resetting the selected image
    };

    const rows = props.galleryData.map((image, index) => { 
        return (
            <div key={index} onClick={() => handleImageClick(image)}>
                {props.currentPage === "art" ? 
                    <img className="artImage object-cover w-48 h-40 flex-shrink-0 rounded-xl shadow-md lg:w-full lg:h-auto transform transition-transform duration-300 hover:scale-105" src={artImages[image.id-1]} alt={image.description} /> 
                    :
                    <div className="coverImageAndText flex flex-col items-center font-title-lexend text-font-size-xs lg:text-body-overpass-base transform transition-transform duration-300 hover:scale-105">
                        <img className="coverImage object-cover w-72 flex-shrink-0 rounded-xl bg-none m-0 p-0 " src={musicCovers[image.id-1]} alt={image.description} /> 
                        <div>
                            {image.name}
                        </div>
                    </div>
                }
            </div>
        );
    });

    return (
        <>
            {props.currentPage === "art" ? 
                <div className={styles.imageGridArt}>
                    {rows}
                </div>
            :
                <div className={styles.imageGridArt}>
                    {rows}
                </div>
            }
            {/* Overlay */}
            {selectedImage && (
                <div className="overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={closeOverlay}>
                    <div className="popupContent flex w-100% p-4 h-auto lg:w-3/5 justify-center">
                        {/* <button className="closeButton absolute top-4 right-4 text-white text-2xl bg-transparent border-none hover:border-none" onClick={closeOverlay}>×</button> */}
                        <img className="popupImage object-cover h-auto max-h-screen rounded-xl" src={props.currentPage === "art" ? artImages[selectedImage.id-1] : musicCovers[selectedImage.id-1]} alt={selectedImage.description} />
                    </div>
                </div>
            )}
        </>
    );
}


export default GalleryGrid;