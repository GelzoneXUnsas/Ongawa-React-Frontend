import React from "react";
import { useState } from "react";

import DownloadIcon from "../../components/DownloadIcon/DownloadIcon";
import ToggleButton from "../../components/ToggleButton/ToggleButton";
import MusicianSelector from "../../components/MusicianSelector/MusicianSelector";

import headerBackgroundImg from "../../assets/images/headerBackground.png";
import gameplayDemoBackgroundImg from "../../assets/images/galleryArt/art1.png";
import aboutUsBackgroundImg from "../../assets/images/galleryArt/art4.png";
import musicianBackgroundImage from "../../assets/images/galleryArt/art9.png";

import ongawaLogoNameBlack from "../../assets/icons/ongawaLogoNameBlack.png";

import discordIcon from "../../assets/icons/discordIcon.png";
import desktopIcon from "../../assets/icons/desktopIcon.png";
import appleIcon from "../../assets/icons/appleIcon.png";
import googlePlayIcon from "../../assets/icons/googlePlayIcon.png";

import musicianImage1 from "../../assets/images/featuredArtists/musicianModel1.png";
import musicianImage2 from "../../assets/images/featuredArtists/musicianModel2.png";
import musicianImage3 from "../../assets/images/featuredArtists/musicianModel3.png";

import musicianIcon1 from "../../assets/images/musicianIcons/musicianIcon1.png";
import musicianIcon2 from "../../assets/images/musicianIcons/musicianIcon2.png";
import musicianIcon3 from "../../assets/images/musicianIcons/musicianIcon3.png";

const getFeaturedMusicians = () => {
  return [
    {
      name: "Techno Maestro",
      id: 1,
      image: musicianImage1,
      imageIcon: musicianIcon1,
      playcount: 538,
      songcount: 25,
      spotifyLink: "https://open.spotify.com/artist/3w8dJ7f4i1Vb8Qzq5f5K9g",
      soundcloudLink: "https://soundcloud.com/technomaestro",
    },
    {
      name: "The Shadow Weaver",
      id: 2,
      image: musicianImage2,
      imageIcon: musicianIcon2,
      playcount: 386,
      songcount: 16,
      spotifyLink: "https://open.spotify.com/artist/3w8dJ7f4i1Vb8Qzq5f5K9g",
      soundcloudLink: "https://soundcloud.com/technomaestro",
    },
    {
      name: "The Sound Sorcerer",
      id: 3,
      image: musicianImage3,
      imageIcon: musicianIcon3,
      playcount: 479,
      songcount: 14,
      spotifyLink: "https://open.spotify.com/artist/3w8dJ7f4i1Vb8Qzq5f5K9g",
      soundcloudLink: "https://soundcloud.com/technomaestro",
    },
  ];
};

const Homepage = () => {
  // activeVideo either "gameplay" or "ai"
  const [activeVideo, setActiveVideo] = useState("gameplay");
  const musicians = getFeaturedMusicians();
  const [currentMusician, setCurrentMusician] = useState(musicians[0]);

  // TODO: Implement Cache

  return (
    <>
      {/* Main Div */}
      <div className="bg-page-background-purple">
        {/* Header Section */}
        {/* Background image div */}
        <div
          className="h-screen bg-cover relative"
          style={{
            backgroundImage: `linear-gradient(rgba(35,35,35,0.3), rgba(35,35,35,0.3)),
           url(${headerBackgroundImg})`,
          }}
        >
          {/* Content inside background image */}
          <div className="absolute bottom-6 left-6 lg:bottom-12 lg:left-12 flex gap-4">
            {/* Ongawa Logo Icon */}
            <img
              src={ongawaLogoNameBlack}
              alt="Ongawa Logo"
              className="w-36 lg:w-48 h-auto mx-auto py-3 px-2 bg-light-grey rounded-lg"
            />
            {/* Mobile Icons */}
            <div className="lg:hidden flex flex-col justify-center gap-2">
              <DownloadIcon
                icon={desktopIcon}
                header="Download"
                source="Demo"
              />
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

        {/* Gameplay Demo Section */}
        {/* Background image div */}
        <div
          className="h-screen bg-cover relative"
          style={{
            backgroundImage: `linear-gradient(rgba(35,35,35,0.9), rgba(35,35,35,0.9)),
           url(${gameplayDemoBackgroundImg})`,
          }}
        >
          {/* Content inside background image */}
          <div className="flex flex-col items-center mx-3">
            <div>
              {/* Toggle Buttons */}
              <div className="flex justify-between md:justify-center w-full gap-4 mb-4 mt-32 md:mt-8">
                <ToggleButton
                  title="Gameplay"
                  isActive={activeVideo === "gameplay"}
                  toggleButton={() => setActiveVideo("gameplay")}
                />
                <ToggleButton
                  title="AI Feature"
                  isActive={activeVideo === "ai"}
                  toggleButton={() => setActiveVideo("ai")}
                />
              </div>
              {/* Video Element */}
              <div className="p-1 md:p-3 border-light-grey border-2 md:border-4">
                <video
                  key={activeVideo}
                  className="max-h-[calc(100vh-24rem)] object-contain border-[#3A3749] border-2 md:border-4"
                  muted
                  loop
                  playsInline
                  preload="auto"
                  autoPlay
                >
                  <source
                    src={
                      activeVideo === "gameplay"
                        ? "/Demovid.mp4"
                        : "/AIVideo.mp4"
                    }
                    type="video/mp4"
                  />
                  Your browser does not support the video
                </video>
              </div>
            </div>
            {/* Description Element */}
            <p className="mt-8 mx-auto text-mukta-mahee font-semibold text-base text-white text-center max-w-2xl lg:hidden">
              Lorem ipsum dolor sit amet consectetur. Gravida amet at egestas eu
              elementum commodo. Euismod auctor tellus pretium natoque est eget
              in. Gravida eget diam interdum turpis elementum nibh leo ultricies
              vel. Diam in diam pulvinar sit curabitur cum adipiscing commodo
              placerat.
            </p>
          </div>
        </div>

        {/* About Us Section */}
        <div className="h-screen relative flex flex-col">
          {/* Top Half: Image with circular gradient */}
          <div className="h-1/2 relative">
            {/* Full-width background image */}
            <div className="absolute inset-0">
              <img
                src={aboutUsBackgroundImg}
                alt="About Us"
                className="w-full h-full object-cover"
              />

              {/* Circular Gradient Overlay that creates the circular effect */}
              <div
                className="absolute inset-[-1px] flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(circle at center, transparent 0%, rgba(29,29,46,1) 250px)",
                }}
              ></div>
            </div>
          </div>
          {/* Bottom Half: Description */}
          <div className="h-1/2 flex flex-col items-center justify-center px-8 py-4">
            <p className="z-1 mb-4 text-mukta-mahee font-semibold text-white text-center">
              Ongawa is a rhythm game that goes beyond entertainment. We've
              crafted an experience that seamlessly weaves together immersive
              storytelling and game mechanics, placing music at the forefront.
              But we're not stopping there.
            </p>
            <p className="z-1 text-mukta-mahee font-semibold text-white text-center">
              Our website platform is a collaborative space where creators can
              share their compositions, their passions, and their stories. With
              the ability to integrate music distribution services right into
              our website, an artist's creations won't just be confined to the
              game. They'll reach a broader audience, helping them gain the
              recognition they deserve.
            </p>
          </div>
        </div>

        {/* Artist Section */}
        <div className="h-screen flex flex-col items-center">
          <div className="mt-20">
            <MusicianSelector
              musicians={musicians}
              currentMusician={currentMusician}
              setCurrentMusician={setCurrentMusician}
            />
          </div>
          {/* Background image div */}
          <div
            className="h-4/6 mt-4 bg-cover relative"
            style={{
              backgroundImage: `linear-gradient(rgba(35,35,35,0.2), rgba(35,35,35,0.3)),
           url(${musicianBackgroundImage})`,
            }}
          >
            <img src={currentMusician.image} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
