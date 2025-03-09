import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";

import bg1 from "../../assets/images/homepageGallery/bg_1.png";
import bg2 from "../../assets/images/homepageGallery/bg_2.png";
import bg3 from "../../assets/images/homepageGallery/bg_3.png";
import bg4 from "../../assets/images/homepageGallery/bg_4.png";
import bg5 from "../../assets/images/homepageGallery/bg_5.png";
import bg6 from "../../assets/images/homepageGallery/bg_6.png";
import bg7 from "../../assets/images/homepageGallery/bg_7.png";
import bg8 from "../../assets/images/homepageGallery/bg_8.png";

const BackgroundCarousel = ({ children }) => {
  const backgroundImages = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // set interval to toggle between backgroundImages on mount
      const interval = window.setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 8000);

      return () => window.clearInterval(interval); // Cleanup interval on unmount
    }
});

  return (
    <div className="h-screen w-full relative overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0 bg-cover bg-center h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(35,35,35,0.3), rgba(35,35,35,0.3)), 
             url(${backgroundImages[currentImageIndex]})`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
        />
      </AnimatePresence>

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

BackgroundCarousel.propTypes = {
  children: PropTypes.node,
};

export default BackgroundCarousel;
