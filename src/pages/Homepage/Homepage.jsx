import React from "react";
import { useState } from "react";

import DownloadIcon from "../../components/DownloadIcon/DownloadIcon";
import ToggleButton from "../../components/ToggleButton/ToggleButton";
import MusicianSelector from "../../components/MusicianSelector/MusicianSelector";
import InformationBox from "../../components/InformationBox/InformationBox";
import DropdownQuestion from "../../components/DropdownQuestion/DropdownQuestion";

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

import musicianBassIcon from "../../assets/icons/musicianIcons/BassIcon.png";
import musicianDrumIcon from "../../assets/icons/musicianIcons/DrumsIcon.png";
import musicianPianoIcon from "../../assets/icons/musicianIcons/PianoIcon.png";

const getFeaturedMusicians = () => {
  return [
    {
      id: 1,
      name: "Bronte",
      title: "Ruins Striker",
      image: musicianImage1,
      imageIcon: musicianDrumIcon,
      description:
        "A survivor hardened by loss, Bronte channels her anger into every strike of her drum hammer. She doesn’t care about heroism—only making sure her world doesn’t disappear without a fight.",
      playcount: 538,
      songcount: 25,
      spotifyLink: "https://open.spotify.com/artist/3w8dJ7f4i1Vb8Qzq5f5K9g",
      soundcloudLink: "https://soundcloud.com/technomaestro",
    },
    {
      id: 2,
      name: "Vento",
      title: "Riftborn Rhapsodist",
      image: musicianImage3,
      imageIcon: musicianBassIcon,
      description:
        "A sharp-tongued fighter who lives for the thrill, Vento’s guitar is as much a weapon as it is an escape. He masks his past with humor, but when it’s time to play, he doesn’t hold back.",
      playcount: 386,
      songcount: 16,
      spotifyLink: "https://open.spotify.com/artist/3w8dJ7f4i1Vb8Qzq5f5K9g",
      soundcloudLink: "https://soundcloud.com/technomaestro",
    },
    {
      id: 3,
      name: "Dolce",
      title: "Silent Crescendo",
      image: musicianImage2,
      imageIcon: musicianPianoIcon,
      description:
        "A strategist first and a musician second, Dolce treats every battle like a composition. Precision and efficiency guide his every move—after all, a single mistake can mean the difference between survival and ruin.",
      playcount: 479,
      songcount: 14,
      spotifyLink: "https://open.spotify.com/artist/3w8dJ7f4i1Vb8Qzq5f5K9g",
      soundcloudLink: "https://soundcloud.com/technomaestro",
    },
  ];
};

const getFAQs = () => {
  return [
    {
      question: "What makes ONGAWA different from other rhythm games?",
      answer:
        "ONGAWA uniquely blends music creation, music streaming, and RPG elements within a rhythm game. It provides a platform for indie musicians to showcase their work in an interactive way, offering a fresh experience for both players and artists.",
    },
    {
      question: "How do I participate in ONGAWA as a musician?",
      answer:
        "To become a musician on ONGAWA, simply sign up as a musician and upload your original tracks to be featured in the game. This allows your music to be played by others and integrated into the rhythm game experience.",
    },
    {
      question: "Is ONGAWA available on mobile or desktop?",
      answer:
        "Currently, ONGAWA will be available only on mobile. But you can try a simple demo version of the game on PC/Mac via Itch.io here: Virtuosos Demo. ",
    },
    {
      question: "Can I play ONGAWA alone, or is it multiplayer?",
      answer:
        " At the moment, ONGAWA is single-player only. However, multiplayer functionality is currently in development and will be available soon.",
    },
    {
      question: "Can I monetize my music on ONGAWA?",
      answer:
        " Yes, ONGAWA offers a platform for musicians to monetize their music through in-game exposure and revenue-sharing features. This allows artists to earn from their tracks and gain recognition within the game.",
    },
    {
      question: "How can I support ONGAWA as a fan or player?",
      answer:
        " Fans can support ONGAWA by playing the game, sharing it with others, supporting musicians on the platform, or contributing to the game’s development through feedback or crowdfunding. Join our community and connect with us on Discord: Join our Discord.",
    },
  ];
};

const Homepage = () => {
  // activeVideo either "gameplay" or "editor"
  const [activeVideo, setActiveVideo] = useState("gameplay");
  const musicians = getFeaturedMusicians();
  const [currentMusician, setCurrentMusician] = useState(musicians[0]);
  const faqs = getFAQs();

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
                  title="Level Editor"
                  isActive={activeVideo === "editor"}
                  toggleButton={() => setActiveVideo("editor")}
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
                        : "/EditorDemo.mp4"
                    }
                    type="video/mp4"
                  />
                  Your browser does not support the video
                </video>
              </div>
            </div>
            {/* Description Element */}
            <p className="mt-8 mx-auto text-mukta-mahee font-semibold text-base text-white text-center max-w-2xl lg:hidden">
              {activeVideo == "gameplay" &&
                `Hitting notes in time with the music and diving into a journey of discovery and creativity in Ongawa. Combining rhythm-based gameplay with Role-playing elements, uncover hidden musical talents while controlling unique characters, each with their own skills and playstyles!`}
              {activeVideo == "editor" &&
                `Create your own rhythm experience with Ongawa’s customizable level editor. Add unique notes, events, SFX, and narratives, or let AI generate note patterns from your music. Design the perfect challenge and bring your vision to life.`}
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
              Ongawa is a rhythm game that goes beyond entertainment, centering
              around music, creativity, and talent discovery. It supports
              real-life musicians by showcasing and monetizing their creations.
            </p>
            <p className="z-1 text-mukta-mahee font-semibold text-white text-center">
              Step into the world of Ongawa, where music bridges the gap between
              reality and imagination. You play as a dedicated salaryman of
              Ongawa Records, a struggling music label on the brink of collapse.
              Guided by AWA, a magical, record-shaped companion, you discover a
              parallel universe where rhythm and creativity hold the key to
              uncovering hidden musical talents and reviving the company’s
              glory…
            </p>
          </div>
        </div>

        {/* Musician Section */}
        <div className="h-screen flex flex-col items-center relative">
          {/* Musician Selector */}
          <div className="mt-16 mb-4 z-10">
            <MusicianSelector
              musicians={musicians}
              currentMusician={currentMusician}
              setCurrentMusician={setCurrentMusician}
            />
          </div>

          {/* Background image and gradient overlay container */}
          <div className="flex-grow w-full relative">
            {/* Background image */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${musicianBackgroundImage})` }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(35,35,35,0.1)] to-[rgba(35,35,35,0.6)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(35,35,35,0.1)] to-[rgba(35,35,35,0.6)]" />

            {/* Musician image */}
            <img
              className="absolute top-4 z-10 w-full h-auto max-h-[90%] object-contain object-top"
              src={currentMusician.image}
              alt={currentMusician.name}
            />
          </div>
          <InformationBox currentMusician={currentMusician} />
        </div>

        {/* FAQs section */}
        <div className="mt-16">
          <h2 className="w-1/2 mr-6 pl-4 py-2 text-2xl text-light-grey font-nova-square bg-secondary-purple [clip-path:polygon(0%_0%,100%_0%,85%_100%,0%_100%)]">
            FAQs
          </h2>
          <div className="pb-8">
            {faqs.map((faq, index) => (
              <DropdownQuestion
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
