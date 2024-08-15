import { useEffect, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
// import styles from "./Homepage.module.css";

import React from "react";
import { motion } from "framer-motion";

import headerBackgroundImg from '../../assets/images/headerBackground.png';
import ongawaTitle from '../../assets/icons/ongawaTitleModified.svg';

import appleDownloadIcon from "../../assets/icons/appleDownloadIcon.svg";
import googlePlayDownloadIcon from "../../assets/icons/googlePlayDownloadIcon.svg";
import verifiedIcon from "../../assets/icons/verifiedIcon.svg";
import discordLogo from "../../assets/icons/discordLogo.svg";

import artist1Image from "../../assets/images/featuredArtists/artist1.jpg";
import artist2Image from "../../assets/images/featuredArtists/artist2.jpg";
import artist3Image from "../../assets/images/featuredArtists/artist3.png";
import spotifyIcon from "../../assets/icons/SpotifyIcon1.svg";
import soundcloudIcon from "../../assets/icons/soundCloudIcon.svg";
import Demogif from "../../assets/images/Demogif.gif";

const getFeaturedArtists = () => {
  return [{
    name: "Techno Maestro",
    image: artist1Image,
    playcount: 538,
    songcount: 25,
    spotifyLink: "https://open.spotify.com/artist/3w8dJ7f4i1Vb8Qzq5f5K9g",
    soundcloudLink: "https://soundcloud.com/technomaestro",
  },
  {
    name: "The Shadow Weaver",
    image: artist2Image,
    playcount: 538,
    songcount: 25,
    spotifyLink: "https://open.spotify.com/artist/3w8dJ7f4i1Vb8Qzq5f5K9g",
    soundcloudLink: "https://soundcloud.com/technomaestro",
  },
  {
    name: "The Sound Sorcerer",
    image: artist3Image,
    playcount: 538,
    songcount: 25,
    spotifyLink: "https://open.spotify.com/artist/3w8dJ7f4i1Vb8Qzq5f5K9g",
    soundcloudLink: "https://soundcloud.com/technomaestro",
}];
};

// const sparkle =(delay, offset) => ({
//   startingPos: {x: -100, opacity: 0},
//   endingPos: {
//       x: 0,
//       opacity: 1,
//       transition: {duration: 0.5, delay: delay}
//   }
// })


const Homepage = () => {
  // let autoPlayDemoVideo = true;
  const appStoreDownloadLink = "https://gelzonexunsas.itch.io/virtuosos";
  const googlePlayDownloadLink = "https://gelzonexunsas.itch.io/virtuosos";
  const [featuredArtists, setFeaturedArtists] = useState([]);

  let isLarge = useMediaQuery('(min-width: 1024px)');

  const featured_artists_variants = isLarge ? {
    initial: {opacity: 0, y: -100},
    animate: {opacity: 1, y: 0},
  } : {
    initial: {opacity: 0, x: -100},
    animate: {opacity: 1, x: 0},
  }

  useEffect(() => {
    setFeaturedArtists(getFeaturedArtists());
  }, []);

  return (
    <>
    <div className="homepage flex flex-col w-full bg-page-accent-gray overflow-hidden text-center text-body-overpass-base text-white font-body-overpass">
    <div className="titleContainer relative h-60 z-0 overflow-hidden lg:h-80">
      <div className="bgImgContainer w-full lg:-mt-64">
        <img src={headerBackgroundImg} className="headerBackgroundImg w-full relative object-cover" alt="" />
      </div>
      <div className="flex justify-center items-center">
      <img src={ongawaTitle} className="absolute w-[33%] top-28 z-2 lg:w-[12%] lg:top-[45%]" alt="" />
      </div>
      <div className="gradientOverlay absolute bottom-0 w-full h-[70%] bg-gradient-overlay z-1"></div>
    </div>
      <div className="visionAndDemoContainer justify-items-center bg-page-accent-gray pt-12 relative lg:flex-row lg:flex lg:pt-4">

        {/* below are just for the particles effect. order is left to right of page */}
        <div className="particles absolute bottom-24 left-0 w-10 h-10 bg-purple-accent rounded-full filter blur-md lg:bottom-16 lg:-left-14 lg:w-16 lg:h-16 lg:blur-xl z-2"></div>
        <div className="particles absolute top-0 left-8 w-4 h-4 bg-white rounded-full filter blur animate-pulse z-2"></div>
        
        <div className="particles absolute top-4 left-14 w-36 h-36 lg:top-24 lg:left-[14rem] lg:w-48 lg:h-48 bg-slate-500  rounded-full mix-blend-lighten filter blur-2xl animate-merge_left z-2"></div>
        <div className="particles absolute top-4 left-56 w-36 h-36 lg:top-24 lg:left-[25rem] lg:w-48 lg:h-48  bg-purple-900 rounded-full mix-blend-lighten filter blur-2xl animate-merge_right z-2"></div>

        <div className="particles absolute -bottom-4 left-20 w-4 h-4 bg-white rounded-full filter blur-md z-2"></div>
        <div className="particles absolute top-44 left-28 w-2 h-2 bg-purple-accent rounded-full filter blur z-2"></div>

        <div className="particles hidden lg:block absolute bottom-6 left-56 w-2 h-2 bg-purple-accent rounded-full filter blur z-2"></div>
        <div className="particles absolute -bottom-12 left-[22rem] w-8 h-8 bg-purple-accent rounded-full filter blur-lg animate-pulse z-2"></div>

        <div className="particles hidden lg:block absolute bottom-0 left-[46rem] w-2 h-2 bg-purple-accent rounded-full filter blur-sm z-2"></div>
        <div className="particles hidden lg:block absolute bottom-32 left-[44rem] w-8 h-8 bg-white rounded-full filter blur-xl z-2"></div>
        <div className="particles hidden lg:block absolute top-24 left-[53rem] w-8 h-8 bg-purple-accent rounded-full filter blur-xl z-2"></div>


        <div className="particles hidden lg:block absolute -bottom-4 right-[14rem] w-8 h-8 bg-white rounded-full filter blur-lg z-2"></div>

        <div className="particles absolute top-48 right-32 w-10 h-10 bg-purple-accent rounded-full filter blur-md"></div>
        <div className="particles absolute top-4 right-4 w-2 h-2 bg-purple-accent rounded-full filter blur-sm"></div>

        <div className="particles absolute top-32 -right-6 w-10 h-10 bg-slate-200 rounded-full filter blur-md"></div>


        <div className="visionSection overflow-auto flex flex-col self-center lg:justify-center lg:p-20 lg:ml-12">    
          {/* <motion.div 
            whileInView={{opacity: 1, x: 0}}
            initial={{opacity: 0, x: -100}}
            transition={{duration: 1}}
            className="visionSectionTitle text-center inline-block m-0 pb-1 font-title-lexend text-title-lexend-large leading-8 z-10">
            OUR VISION
          </motion.div> */}
          <motion.div 
            whileInView={{opacity: 1}}
            initial={{opacity: 0}}
            transition={{duration: 1}}
            className="visionSectionBody leading-6 font-medium text-title-lexend-medium inline-block p-8 pt-2 z-10">
            Transforming indie music into an interactive adventure—tap, swipe, and hold to the beat!
          </motion.div>
          {/*
           <div className="downloadSection bg-page-accent-gray pt-8 h-24">
          <div className="downloadText leading-6 font-medium pb-2 z-3">Download for free</div>
          <div className="downloadLinks flex justify-center gap-2 lg:gap-14">
            <img
              className="rounded overflow-hidden object-contain mix-blend-normal z-3"
              alt="Download from the App Store"
              src={appleDownloadIcon}
              onClick={() => {
                window.open(appStoreDownloadLink, "_blank");
              }}
            />
            <img
              className="rounded overflow-hidden object-contain mix-blend-normal z-3"
              alt="Download from the Play Store"
              src={googlePlayDownloadIcon}
              onClick={() => {
                window.open(googlePlayDownloadLink, "_blank");
              }}
            />
          </div>
        </div> */}
        </div>
        <motion.div 
          whileInView={{opacity: 1, x: 0}}
          initial={{opacity: 0, x: 100}}
          transition={{duration: 1}}
          className="demoVideoContainer w-full h-auto flex justify-center z-10 pt-4">
          <img className="demoVideo w-[90%] h-auto py-[5vw] rounded-[2.5rem] z-10 object-contain 2xl:w-[70%] 2xl:py-0" width="562" height="316" src={Demogif} alt="Game demo gif" />
        </motion.div>
      </div>
      <div className="downloadSectionContainer w-full h-auto flex justify-center z-1 lg:justify-start lg:pl-[17rem] lg:-mt-28">
      {/* the old signupandDownloadContainer <div className="signupAndDownloadContainer w-full h-auto flex flex-col justify-center z-1 lg:flex-row lg:gap-[32rem]"> */}
        {/* <div className="signupContainer pt-8 lg:pt-12">
          <a href="https://forms.gle/pySBHibGemoQsA8J8">
          <button className="SignUpbutton bg-page-background rounded py-2 px-3 text-body-overpass-base font-body-overpass border-none cursor-pointer -mt-4 mb-2 hover:bg-custom-hover-blue transition-all duration-700">
            Sign Up
          </button>
          </a>
          <div>Subscribe to our newsletter!</div>
        </div> */}
        <div className="downloadSection bg-page-accent-gray pt-8 h-24 lg:pl-0 ">
          <div className="downloadText leading-6 font-medium pb-2 z-3">Download for free</div>
          <div className="downloadLinks flex justify-center gap-2 lg:gap-14">
            <img
              className="rounded overflow-hidden object-contain mix-blend-normal z-3"
              alt="Download from the App Store"
              src={appleDownloadIcon}
              onClick={() => {
                window.open(appStoreDownloadLink, "_blank");
              }}
            />
            <img
              className="rounded overflow-hidden object-contain mix-blend-normal z-3"
              alt="Download from the Play Store"
              src={googlePlayDownloadIcon}
              onClick={() => {
                window.open(googlePlayDownloadLink, "_blank");
              }}
            />
          </div>
        </div>
      </div>

      <div className="aboutUsSection bg-page-accent-gray text-white pt-12 lg:px-52">
        <div className="aboutUsTitle text-left inline-block mx-auto font-title-lexend text-title-lexend-medium leading-4 p-3 pb-1">
          About Us
        </div>
        <div className="aboutUsDescription leading-6 font-medium inline-block p-8 pt-2">
          <p>
            Ongawa is a rhythm game that goes beyond entertainment. We've
            crafted an experience that seamlessly weaves together immersive
            storytelling and game mechanics, placing music at the forefront. But
            we're not stopping there.
          </p>
          <p>
            Our website platform is a collaborative space where creators can
            share their compositions, their passions, and their stories. With
            the ability to integrate music distribution services right into our
            website, an artist’s creations won't just be confined to the game.
            They'll reach a broader audience, helping them gain the recognition
            they deserve.
          </p>
        </div>
      </div>

      <div className="featuredArtistsSection bg-gradient-overlay-featured-artists shadow-custom-featured-artists bg-page-accent-gray pt-5 pb-3">
        <b className="featuredArtistsSectionTitle text-title-lexend-medium font-bold leading-8 font-title-lexend text-center inline-block mx-auto px-4 py-0">
          Meet our Featured Artists!
        </b>
        <div class="featuredArtistsGridContainer pt-2 lg:grid lg:grid-cols-custom-grid-browser lg:gap-4 lg:px-10 lg:pt-8">
          {
            featuredArtists.map((artist, index) => {
              return (
                <motion.div 
                  key={index} 
                  variants={featured_artists_variants}
                  initial="initial"
                  whileInView="animate"
                  transition={{duration: 1}}
                  className="ArtistsAndDivider flex flex-col lg:flex-row">
                  <div className="featuredArtistDetails flex flex-row justify-start px-9 py-0">
                    <div className="artistImgAndLinks flex-[0.25] flex justify-around p-2 flex-col">
                      <img 
                        className="artistImage w-[85%] flex-shrink-0 self-center rounded-full" 
                        src={artist.image} 
                        alt="artist"/>
                      <div className="artistLinks flex flex-row justify-between p-3 pt-1 bg-image-background">
                        <img className="artistLinkIcons w-[40%] flex-shrink-0 rounded-full bg-slate-300" src={spotifyIcon} alt="artist"/>
                        <img className="artistLinkIcons w-[40%] flex-shrink-0 rounded-full bg-slate-300" src={soundcloudIcon} alt="artist"/>
                      </div>
                    </div>
                    <div className="artistRelatedInfo flex justify-around pl-[0.3rem] flex-1 flex-col">
                      <div className="artistTitleContainer flex flex-row pt-3 pl-3 justify-start">
                        <div className="artistNameVerified flex items-center">
                          <div className="artistName flex font-overpass-mono text-body-overpass-base font-bold leading-inherit text-left items-center">
                            {artist.name}
                          </div>
                          <img className="verifiedIcon w-4 h-4 pl-2" src={verifiedIcon} alt="verified"/>
                        </div>
                      </div>
                      <div className="artistStatistics flex flex-row justify-end pr-8">
                        <div className="artistStatLabels flex flex-col">
                          <div className="songcountText text-right pr-8">songs</div>
                          <div className="playcountText text-right pr-8">total playcount</div>
                        </div>
                        <div className="artistStatValues flex flex-col text-right text-lilac">
                          <div className="songCountValue">25</div>
                          <div className="playCountValue">538</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index !== featuredArtists.length - 1 && (
                    <hr className="flex my-2 border-b border-gray-300 lg:flex lg:w-14 lg:border-l lg:rotate-90 lg:border-gray-300" />
                  )}
                </motion.div>
              );
            })
          }
        </div>
      </div>
      <div className="signupAndDiscordContainer w-full h-auto flex flex-col justify-center z-1 lg:flex-row lg:gap-[15rem] py-8 shadow-custom-inset-about-us">
          <div className="signupContainer pt-8">
            <a href="https://forms.gle/pySBHibGemoQsA8J8">
            <button className="SignUpbutton bg-page-background rounded-2xl py-2 px-3 text-body-overpass-base font-body-overpass border-none cursor-pointer -mt-4 mb-2 hover:bg-custom-hover-blue transition-all duration-700">
              Sign Up
            </button>
            </a>
            <div className="font-bold">Subscribe to our newsletter!</div>
          </div>

          <div className="discordContainer pt-8 flex flex-col justify-center items-center">
            <a href="https://discord.gg/JEzqqj94Pn" className="no-underline">
            <button className="DiscordButton bg-white text-page-accent-gray rounded-2xl py-2 px-3 text-body-overpass-base font-body-overpass border-none cursor-pointer flex flex-row gap-2 items-center -mt-4 mb-2 hover:bg-custom-hover-blue transition-all duration-700">
              <img
                className="rounded overflow-hidden object-contain mix-blend-normal z-3 w-6"
                alt="Download from the App Store"
                src={discordLogo}
              />
              Click to Join!
            </button>
            </a>
            <div className="font-bold">Come join our discord community!</div>
          </div>
        {/* <div className="aboutUsTitle text-left inline-block mx-auto font-title-lexend text-title-lexend-medium leading-4 p-3 pb-1">
          About Us
        </div>
        <div className="aboutUsDescription leading-6 font-medium inline-block p-8 pt-2">
          <p>
            Ongawa is a rhythm game that goes beyond entertainment. We've
            crafted an experience that seamlessly weaves together immersive
            storytelling and game mechanics, placing music at the forefront. But
            we're not stopping there.
          </p>
          <p>
            Our website platform is a collaborative space where creators can
            share their compositions, their passions, and their stories. With
            the ability to integrate music distribution services right into our
            website, an artist’s creations won't just be confined to the game.
            They'll reach a broader audience, helping them gain the recognition
            they deserve.
          </p>
        </div> */}
      </div>
    </div>
    </>
  );
};

export default Homepage;