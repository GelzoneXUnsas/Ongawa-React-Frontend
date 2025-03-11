import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import DownloadIcon from "../../components/DownloadIcon/DownloadIcon";
import ToggleButton from "../../components/ToggleButton/ToggleButton";
import ToggleArrow from "../../components/ToggleArrow/ToggleArrow";
import MusicianSelector from "../../components/MusicianSelector/MusicianSelector";
import InformationBox from "../../components/InformationBox/InformationBox";
import DropdownQuestion from "../../components/DropdownQuestion/DropdownQuestion";
import BackgroundCarousel from "../../components/BackgroundCarousel/BackgroundCarousel";
import DisplayStatusBar from "../../components/DisplayStatusBar/DisplayStatusBar";

import gameplayDemoBackgroundImg from "../../assets/images/galleryArt/art1.png";
import aboutUsBackgroundImg from "../../assets/images/galleryArt/art4.png";


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

import musicianBackground1 from "../../assets/images/featuredArtists/musicianBackground1.png";
import musicianBackground2 from "../../assets/images/featuredArtists/musicianBackground2.png";
import musicianBackground3 from "../../assets/images/featuredArtists/musicianBackground3.png";

const getFeaturedMusicians = () => {
  return [
    {
      id: 1,
      name: "Bronte",
      title: "Ruins Striker",
      image: musicianImage1,
      imageIcon: musicianDrumIcon,
      backgroundImage: musicianBackground1,
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
      backgroundImage: musicianBackground2,
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
      backgroundImage: musicianBackground3,
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
      question: "What makes Ongawa different from other rhythm games?",
      answer:
        "Ongawa uniquely blends music creation, music streaming, and RPG elements within a rhythm game. It provides a platform for indie musicians to showcase their work in an interactive way, offering a fresh experience for both players and artists.",
    },
    {
      question: "How do I participate in Ongawa as a musician?",
      answer:
        "To become a musician on Ongawa, simply sign up as a musician and upload your original tracks to be featured in the game. This allows your music to be played by others and integrated into the rhythm game experience.",
    },
    {
      question: "Is Ongawa available on mobile or desktop?",
      answer:
        "Currently, Ongawa will be available only on mobile. But you can try a simple demo version of the game on PC/Mac via Itch.io here: Virtuosos Demo. ",
    },
    {
      question: "Can I play Ongawa alone, or is it multiplayer?",
      answer:
        " At the moment, Ongawa is single-player only. However, multiplayer functionality is currently in development and will be available soon.",
    },
    {
      question: "Can I monetize my music on Ongawa?",
      answer:
        " Yes, Ongawa offers a platform for musicians to monetize their music through in-game exposure and revenue-sharing features. This allows artists to earn from their tracks and gain recognition within the game.",
    },
    {
      question: "How can I support Ongawa as a fan or player?",
      answer:
        " Fans can support Ongawa by playing the game, sharing it with others, supporting musicians on the platform, or contributing to the game’s development through feedback or crowdfunding. Join our community and connect with us on Discord: Join our Discord.",
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
      <div className="bg-page-background-purple snap-y snap-mandatory overflow-y-scroll overflow-x-hidden h-screen" style={{ scrollBehavior: 'smooth' }}>
      <div className="hidden lg:flex">
          <DisplayStatusBar/>
        </div>

        {/* Home Section */}
        <div id="Home" className="h-screen relative snap-start">
          {/* Background image div */}
          <BackgroundCarousel>
            {/* Content inside background image */}
            {/* Ongawa Logo Icon */}
            <img
              src={ongawaLogoNameBlack}
              alt="Ongawa Logo"
              className="absolute top-1/2 left-1/2 w-64 lg:w-80 h-auto -translate-x-1/2 -translate-y-1/2"
            />
            <div className="absolute bottom-6 left-6 lg:bottom-12 lg:left-12 flex gap-4">
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
          </BackgroundCarousel>
        </div>

        {/* Gameplay Demo Section */}
        {/* Background image div */}
        <div
          id="Gameplay"
          className="h-screen bg-cover relative flex flex-col snap-start"
          style={{
            backgroundImage: `linear-gradient(rgba(29,29,46,0.9), rgba(29,29,46, 0.9)),
           url(${gameplayDemoBackgroundImg})`,
          }}
        >
          {/* Content inside background image */}
          {/* Title */}
          <h2 className="hidden lg:flex max-w-[28rem] mt-36 mb-4 pl-16 py-3 font-light text-5xl text-light-grey font-nova-square bg-heading-dark-purple [clip-path:polygon(0%_0%,100%_0%,90%_100%,0%_100%)]">
            Gameplay
          </h2>
          <div className="flex flex-col items-center mx-3">
            {/* Toggle Buttons */}
            <div className="flex lg:hidden justify-between md:justify-center w-full gap-4 mb-4 mt-32 lg:mt-8">
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
            {/* Video and Description */}
            <div className="lg:flex lg:items-center lg:gap-4 lg:px-8">
              {/* Video Toggle Element */}
              <div className="hidden lg:block">
                <ToggleArrow 
                  toggleButton={() => setActiveVideo("gameplay")}
                  isActive={activeVideo === "gameplay"}
                  direction="left"
                />
              </div>
              <div 
                className="
                lg:flex lg:self-start lg:w-5/6 lg:p-6 
                lg:bg-page-background-purple/60
                lg:outline outline- lg:outline-light-grey/50 lg:outline-offset-[-12px]
                "
              >
                {/* Video Element */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeVideo}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="
                    p-1 md:p-2 border-light-grey border-2 md:border-3 flex-[2] object-contain items-center justify-center 
                    lg:border-none
                    "
                    style={{ maxWidth: "fit-content" }}
                  >
                    <video
                      key={activeVideo}
                      className="block max-h-[calc(100vh-24rem)] w-auto object-contain border-[#3A3749] border-2 md:border-3"
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
                  </motion.div>
                </AnimatePresence>
                {/* Description Element */}
                <div className="mt-8 lg:mt-2 mx-auto max-w-2xl flex-[1] lg:ml-8 ">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeVideo}
                      className="
                        text-mukta-mahee font-semibold text-base/10 text-light-grey text-center 
                         lg:font-normal lg:text-xl/10 lg:text-left"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {activeVideo == "gameplay"
                        ? "Hitting notes in time with the music and diving into a journey of discovery and creativity in Ongawa. Combining rhythm-based gameplay with Role-playing elements, uncover hidden musical talents while controlling unique characters, each with their own skills and playstyles!"
                        : "Create your own rhythm experience with Ongawa's customizable level editor. Add unique notes, events, SFX, and narratives, or let AI generate note patterns from your music. Design the perfect challenge and bring your vision to life."}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
              {/* Video Toggle Element */}
              <div className="hidden lg:block">
                <ToggleArrow 
                  toggleButton={() => setActiveVideo("editor")}
                  isActive={activeVideo === "editor"}
                  direction="right"
                />
              </div>
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div id="About Us" className="h-screen relative flex flex-col snap-start overflow-hidden">
          {/* Title */}
          <h2 className="hidden lg:flex max-w-[28rem] mt-36 mb-4 pl-16 py-3 font-light text-5xl text-light-grey font-nova-square bg-heading-dark-purple [clip-path:polygon(0%_0%,100%_0%,90%_100%,0%_100%)] z-10">
            About Us
          </h2>
          
          {/* Content Container */}
          <div className="flex flex-col relative h-full lg:px-8 lg:pt-8">
            {/* Image Section */}
            <div className="h-1/2 lg:absolute lg:right-0 lg:w-3/5 lg:h-5/6 lg:top-2">
            {/* Background image container */}
              <div className="absolute inset-0 lg:inset-[-20%]">
                <img
                  src={aboutUsBackgroundImg}
                  alt="About Us"
                  className="w-auto h-1/2 lg:w-full lg:h-full object-cover lg:object-center"
                />

                {/* Circular Gradient Overlay for large screens*/}
                <div
                  className="hidden lg:flex absolute inset-[-1px] items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(circle at center, transparent 0%, rgba(29,29,46,1) 410px)",
                  }}
                />
                
                {/* Circular Gradient Overlay for small screens*/}
                <div
                  className="flex lg:hidden absolute top-0 left-0 w-full h-[470px] items-center justify-center"
                  style={{
                    background: "radial-gradient(circle at center, transparent 0%, rgba(29,29,46,1) 230px)",
                  }}
                />
              </div>
            </div>
            
            
            {/* Text Section */}
            <div className="h-1/2 lg:h-[calc(100%-12rem)] lg:w-7/12 flex flex-col items-center justify-center px-8 py-4 lg:justify-center lg:items-start lg:mt-12 relative z-10">
              <p 
                className="
                  z-1 text-mukta-mahee font-semibold text-light-grey text-base/6 text-center mb-6
                  lg:text-left lg:text-lg/10"
                >                
                Ongawa is a rhythm game that goes beyond entertainment, centering
                around music, creativity, and talent discovery. It supports
                real-life musicians by showcasing and monetizing their creations.
              </p>
              <p 
              className="
                z-1 text-mukta-mahee font-semibold text-light-grey text-base/6 text-center
                lg:text-left lg:text-lg/10"
              >
                
                Step into the world of Ongawa, where music bridges the gap between
                reality and imagination. You play as a dedicated salaryman of
                Ongawa Records, a struggling music label on the brink of collapse.
                Guided by AWA, a magical, record-shaped companion, you discover a
                parallel universe where rhythm and creativity hold the key to
                uncovering hidden musical talents and reviving the company's
                glory…
              </p>
            </div>
          </div>
        </div>

        {/* Musician Section */}
        <div
          id="Musicians"
          className="h-screen flex flex-col items-center relative snap-start"
        >
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
            <AnimatePresence mode="sync">
              <motion.div
                key={currentMusician.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${currentMusician.backgroundImage})` }}
              />
            </AnimatePresence>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(35,35,35,0.1)] to-[rgba(35,35,35,0.6)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(35,35,35,0.1)] to-[rgba(35,35,35,0.6)]" />

            {/* Musician image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentMusician.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute top-4 z-10 w-full h-auto max-h-[90%] object-contain object-top"
                src={currentMusician.image}
                alt={currentMusician.name}
              />
            </AnimatePresence>
            
          </div>
          <InformationBox currentMusician={currentMusician} />
        </div>

        {/* FAQs section */}
        <div id="FAQs" className="min-h-screen flex flex-col relative snap-start">
          <div className="mt-32">
            <h2 className="
                  w-1/2 lg:max-w-[28rem] mr-6 pl-4 lg:pl-16 py-2 lg:!py-3 font-light text-2xl
                  lg:text-5xl text-light-grey font-nova-square bg-heading-dark-purple [clip-path:polygon(0%_0%,100%_0%,90%_100%,0%_100%)]">
              FAQs
            </h2>
            <div className="lg:w-5/6 pb-8">
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
      </div>
    </>
  );
};

export default Homepage;
