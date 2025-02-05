import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

import DownloadIcon from "../../components/DownloadIcon/DownloadIcon";

import ongawaLogoNameBlack from "../../assets/icons/ongawaLogoNameBlack.png";
import headerBackgroundImg from "../../assets/images/headerBackground.png";
import ongawaTitle from "../../assets/icons/ongawaTitleModified.svg";
import verifiedIcon from "../../assets/icons/verifiedIcon.svg";
import discordIcon from "../../assets/icons/discordIcon.png";
import desktopIcon from "../../assets/icons/desktopIcon.png";
import appleIcon from "../../assets/icons/appleIcon.png";
import googlePlayIcon from "../../assets/icons/googlePlayIcon.png";

import artist1Image from "../../assets/images/featuredArtists/artist1.jpg";
import artist2Image from "../../assets/images/featuredArtists/artist2.jpg";
import artist3Image from "../../assets/images/featuredArtists/artist3.png";

const cacheImage = (url, key) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem(key, reader.result);
        resolve(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = (err) => reject(err);
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  });
};

const getCachedImage = (key) => {
  return localStorage.getItem(key);
};

const cacheImages = (urls) => {
  const cachePromises = urls.map((url) => {
    const key = `cache_${url}`;
    return cacheImage(url, key);
  });

  return Promise.all(cachePromises);
};

const getCachedImages = (urls) => {
  return urls.map((url) => {
    const key = `cache_${url}`;
    return getCachedImage(key);
  });
};

const getFeaturedArtists = () => {
  return [
    {
      name: "Techno Maestro",
      id: 1,
      image: artist1Image,
      playcount: 538,
      songcount: 25,
      spotifyLink: "https://open.spotify.com/artist/3w8dJ7f4i1Vb8Qzq5f5K9g",
      soundcloudLink: "https://soundcloud.com/technomaestro",
    },
    {
      name: "The Shadow Weaver",
      id: 2,
      image: artist2Image,
      playcount: 386,
      songcount: 16,
      spotifyLink: "https://open.spotify.com/artist/3w8dJ7f4i1Vb8Qzq5f5K9g",
      soundcloudLink: "https://soundcloud.com/technomaestro",
    },
    {
      name: "The Sound Sorcerer",
      id: 3,
      image: artist3Image,
      playcount: 479,
      songcount: 14,
      spotifyLink: "https://open.spotify.com/artist/3w8dJ7f4i1Vb8Qzq5f5K9g",
      soundcloudLink: "https://soundcloud.com/technomaestro",
    },
  ];
};

// const sparkle =(delay, offset) => ({
//   startingPos: {x: -100, opacity: 0},
//   endingPos: {
//       x: 0,
//       opacity: 1,
//       transition: {duration: 0.5, delay: delay}
//   }
// })
//const appStoreDownloadLink = "https://gelzonexunsas.itch.io/virtuosos";
//const googlePlayDownloadLink = "https://gelzonexunsas.itch.io/virtuosos";
const featuredArtistsVariants = (isLarge) =>
  isLarge
    ? {
        initial: { opacity: 0, y: -100 },
        animate: { opacity: 1, y: 0 },
      }
    : {
        initial: { opacity: 0, x: -100 },
        animate: { opacity: 1, x: 0 },
      };
const Homepage = () => {
  // let autoPlayDemoVideo = true;
  const [featuredArtists, setFeaturedArtists] = useState([]);
  const [cachedImages, setCachedImages] = useState({});
  const navigate = useNavigate();

  let isLarge = useMediaQuery("(min-width: 1024px)");

  const featuredArtistsMemo = useMemo(() => getFeaturedArtists(), []);
  const featured_artists_variants = useMemo(
    () => featuredArtistsVariants(isLarge),
    [isLarge]
  );

  useEffect(() => {
    const imageUrls = [
      verifiedIcon,
      artist1Image,
      artist2Image,
      artist3Image,
      headerBackgroundImg,
      ongawaTitle,
    ];
    const cachedImageUrls = getCachedImages(imageUrls);

    const uncachedUrls = imageUrls.filter(
      (url, index) => !cachedImageUrls[index]
    );

    if (uncachedUrls.length > 0) {
      cacheImages(uncachedUrls)
        .then(() => {
          const updatedCachedImages = imageUrls.reduce((acc, url) => {
            acc[url] = getCachedImage(`cache_${url}`);
            return acc;
          }, {});
          setCachedImages(updatedCachedImages);
        })
        .catch((err) => {
          console.error("Error caching images:", err);
        });
    } else {
      const updatedCachedImages = imageUrls.reduce((acc, url) => {
        acc[url] = cachedImageUrls[imageUrls.indexOf(url)];
        return acc;
      }, {});
      setCachedImages(updatedCachedImages);
    }

    setFeaturedArtists(featuredArtistsMemo);
  }, [featuredArtistsMemo]);

  return (
    <>
      {/* Background image div */}
      <div
        className="h-screen bg-cover relative"
        style={{
          backgroundImage: `linear-gradient(rgba(35,35,35,0.3), rgba(35,35,35,0.3)),
           url(${cachedImages[headerBackgroundImg] || headerBackgroundImg})`,
        }}
      >
        {/* Content inside background image */}
        <div className="absolute bottom-6 left-6 lg:bottom-12 lg:left-12 flex gap-4">
          {/* Ongawa Logo Icon */}
          <img
            src={ongawaLogoNameBlack}
            alt="Ongawa Logo"
            className="w-36 lg:w-48 h-auto mx-auto py-3 px-2 bg-color-ongawa-icon-background rounded-lg"
          />
          {/* Mobile Icons */}
          <div className="lg:hidden flex flex-col justify-center gap-2">
            <DownloadIcon icon={desktopIcon} header="Download" source="Demo" />
            <DownloadIcon
              icon={discordIcon}
              header="Join Our"
              source="Discord"
            />
          </div>
          {/* Desktop Icons */}
          <div className="flex items-center justify-center">
            <div className="hidden lg:flex flex-col gap-4">
              {/* Row 1 */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <DownloadIcon
                    icon={desktopIcon}
                    header="Download on"
                    source="PC"
                  />
                </div>
                {/* Empty placeholder to mimic an empty grid cell */}
                <div className="w-1/2"></div>
              </div>

              {/* Row 2 */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <DownloadIcon
                    icon={appleIcon}
                    header="Download on the"
                    source="App Store"
                  />
                </div>
                <div className="w-1/2">
                  <DownloadIcon
                    icon={googlePlayIcon}
                    header="GET IT ON"
                    source="Google Play"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
