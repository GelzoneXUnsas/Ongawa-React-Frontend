import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import PropTypes from "prop-types";

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

import ongawaLogoNameWhite from "../../assets/icons/ongawaLogoNameWhite.png";

import discordIcon from "../../assets/icons/discordIcon.png";
import musicIcon from "../../assets/icons/music-icon.png";
import OngawaIcon from "../../assets/icons/musicianIcons/OngawaIcon.png";

import musicianImageBronte from "../../assets/images/featuredArtists/musicianModelBronte.png";
import musicianImageVento from "../../assets/images/featuredArtists/musicianModelVento.png";
import musicianImageDolce from "../../assets/images/featuredArtists/musicianModelDolce.png";
import musicianImageViora from "../../assets/images/featuredArtists/musicianModelViora.png";

import musicianBronteIcon from "../../assets/icons/musicianIcons/BronteIcon.png";
import musicianVentoIcon from "../../assets/icons/musicianIcons/VentoIcon.png";
import musicianDolceIcon from "../../assets/icons/musicianIcons/DolceIcon.png";
import musicianVioraIcon from "../../assets/icons/musicianIcons/VioraIcon.png";

import musicianBackgroundBronte from "../../assets/images/featuredArtists/musicianBackgroundBronte.png";
import musicianBackgroundVento from "../../assets/images/featuredArtists/musicianBackgroundVento.png";
import musicianBackgroundDolce from "../../assets/images/featuredArtists/musicianBackgroundDolce.png";
import musicianBackgroundViora from "../../assets/images/featuredArtists/musicianBackgroundViora.png";

const getFeaturedMusicians = () => {
  return [
    {
      id: 1,
      name: "Bronte",
      title: "Ruins Striker",
      image: musicianImageBronte,
      imageIcon: musicianBronteIcon,
      backgroundImage: musicianBackgroundBronte,
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
      image: musicianImageVento,
      imageIcon: musicianVentoIcon,
      backgroundImage: musicianBackgroundVento,
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
      image: musicianImageDolce,
      imageIcon: musicianDolceIcon,
      backgroundImage: musicianBackgroundDolce,
      description:
        "A strategist first and a musician second, Dolce treats every battle like a composition. Precision and efficiency guide his every move—after all, a single mistake can mean the difference between survival and ruin.",
      playcount: 479,
      songcount: 14,
      spotifyLink: "https://open.spotify.com/artist/3w8dJ7f4i1Vb8Qzq5f5K9g",
      soundcloudLink: "https://soundcloud.com/technomaestro",
    },
    {
      id: 4,
      name: "Viora",
      title: "Dissonant Heir",
      image: musicianImageViora,
      imageIcon: musicianVioraIcon,
      backgroundImage: musicianBackgroundViora,
      description:
        "Born into royalty but disillusioned by its corruption, Viora cast off a life of forced tradition to pursue her own voice. Her music, once a symbol of duty, is now her rebellion.",
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
      answer: (
        <p className="mt-2 text-gray-300 font-nova-square short:text-xs short:mb-0">
          Ongawa uniquely blends music creation, music streaming, and RPG
          elements within a rhythm game. It provides a platform for indie
          musicians to showcase their work in an interactive way, offering a
          fresh experience for both players and artists.
        </p>
      ),
    },
    {
      question: "How do I participate in Ongawa as a musician?",
      answer: (
        <p className="mt-2 text-gray-300 font-nova-square short:text-xs short:mb-0">
          To become a musician on Ongawa, simply sign up as a musician and
          upload your original tracks to be featured in the game. This allows
          your music to be played by others and integrated into the rhythm game
          experience.
        </p>
      ),
    },
    {
      question: "Is Ongawa available on mobile or desktop?",
      answer: (
        <p className="mt-2 text-gray-300 font-nova-square short:text-xs short:mb-0">
          Currently, Ongawa will be available only on mobile. But you can try a
          simple demo version of the game on PC/Mac via Itch.io here:{" "}
          <a href="https://gelzonexunsas.itch.io/virtuosos">Ongawa Demo</a>
        </p>
      ),
    },
    {
      question: "Can I play Ongawa alone, or is it multiplayer?",
      answer: (
        <p className="mt-2 text-gray-300 font-nova-square short:text-xs short:mb-0">
          At the moment, Ongawa is single-player only. However, multiplayer
          functionality is currently in development and will be available soon.
        </p>
      ),
    },
    {
      question: "Can I monetize my music on Ongawa?",
      answer: (
        <p className="mt-2 text-gray-300 font-nova-square short:text-xs short:mb-0">
          Yes, Ongawa offers a platform for musicians to monetize their music
          through in-game exposure and revenue-sharing features. This allows
          artists to earn from their tracks and gain recognition within the
          game.
        </p>
      ),
    },
    {
      question: "How can I support Ongawa as a fan or player?",
      answer: (
        <p className="mt-2 text-gray-300 font-nova-square short:text-xs short:mb-0">
          Fans can support Ongawa by playing the game, sharing it with others,
          supporting musicians on the platform, or contributing to the game’s
          development through feedback or crowdfunding. Join our community and
          connect with us on Discord:{" "}
          <a href="https://discord.gg/yourdiscordlink">Join our Discord</a>.
        </p>
      ),
    },
  ];
};

const Homepage = ({ muted }) => {
  // Tracking which section is active on the current viewport
  const sections = useMemo(
    () => ["Home", "Gameplay", "About Us", "Musicians", "FAQs"],
    []
  );
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    // Function to determine which section is currently in view
    const handleScroll = () => {
      // eslint-disable-next-line no-undef
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Middle of the viewport

      for (const section of sections) {
        // eslint-disable-next-line no-undef
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
          const { top, bottom } = sectionElement.getBoundingClientRect();
          // eslint-disable-next-line no-undef
          const offsetTop = top + window.scrollY;
          // eslint-disable-next-line no-undef
          const offsetBottom = bottom + window.scrollY;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Add the event listener
    // eslint-disable-next-line no-undef
    window.addEventListener("scroll", handleScroll, true);

    // Initial check for the active section
    handleScroll();

    // Clean up function
    return () => {
      // eslint-disable-next-line no-undef
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [sections]);

  // activeVideo either "gameplay" or "editor"
  const [activeVideo, setActiveVideo] = useState("gameplay");
  const musicians = getFeaturedMusicians();
  const [currentMusician, setCurrentMusician] = useState(musicians[0]);

  const faqs = getFAQs();

  // TODO: Implement Cache

  return (
    <>
      {/* Main Div */}
      <div
        className="bg-page-background-purple snap-y snap-mandatory overflow-y-scroll overflow-x-hidden h-dvh"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="hidden lg:flex">
          <DisplayStatusBar sections={sections} activeSection={activeSection} />
        </div>

        {/* Home Section */}
        <div id="Home" className="h-dvh relative snap-start">
          {/* Background image div */}
          <BackgroundCarousel>
            {/* Content inside background image */}
            {/* Ongawa Logo Icon */}
            <img
              src={ongawaLogoNameWhite}
              alt="Ongawa Logo"
              className="absolute top-1/2 left-1/2 w-64 lg:w-80 h-auto -translate-x-1/2 -translate-y-1/2 drop-shadow-lg"
            />
            <div className="absolute bottom-6 left-6 lg:bottom-12 lg:left-12 flex gap-4">
              {/* Mobile Icons */}
              <div className="flex flex-col justify-center gap-2">
                <div className="lg:w-56">
                  <DownloadIcon
                    icon={musicIcon}
                    header="Feature Your"
                    source="Music"
                    link="https://docs.google.com/forms/u/2/d/e/1FAIpQLSdyoXG2hOznFApdDy_IDDnxtDk5JK4KLy_37xMZgxXMBYzNjg/viewform?usp=send_form"
                  />
                </div>
                <div className="lg:w-56">
                  <DownloadIcon
                    icon={discordIcon}
                    header="Join Our"
                    source="Discord"
                    link="https://discord.com/invite/JEzqqj94Pn"
                  />
                </div>
              </div>
            </div>
          </BackgroundCarousel>
        </div>

        {/* Gameplay Demo Section */}
        {/* Background image div */}
        <div
          id="Gameplay"
          className="h-dvh bg-cover relative flex flex-col snap-start"
          style={{
            backgroundImage: `linear-gradient(rgba(29,29,46,0.9), rgba(29,29,46, 0.9)),
           url(${gameplayDemoBackgroundImg})`,
          }}
        >
          {/* Content inside background image */}
          {/* Title */}

          <div
            className="hidden lg:flex max-w-[28rem] mt-36 mb-4 pl-16 py-3 bg-heading-dark-purple [clip-path:polygon(0%_0%,100%_0%,90%_100%,0%_100%)]
            short:flex short:mt-16 short:py-1 short:mb-0
          "
          >
            <AnimatePresence mode="wait">
              <motion.h2
                key={activeVideo}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="font-light text-5xl text-light-grey font-nova-square m-0
                            short:text-3xl"
              >
                {activeVideo === "gameplay" ? "Gameplay" : "Editor"}
              </motion.h2>
            </AnimatePresence>
          </div>
          {/* Video Element and Toggle Buttons */}
          <div className="flex flex-col items-center mx-3 md:mx-16 short:mx-0">
            {/* Toggle Buttons */}
            <div className="flex lg:hidden short:hidden justify-between w-full gap-4 mb-4 mt-32 lg:mt-8 short:mt-8">
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
            {/* Content */}
            <div
              className="lg:flex lg:items-center lg:gap-2 lg:px-8 lg:pt-8
                         short:flex short:items-center short:gap-2 short:px-8 short:py-4 short:h-full"
            >
              {/* Video Toggle Element */}
              <div className="hidden lg:block short:block">
                <ToggleArrow
                  toggleButton={() =>
                    setActiveVideo(
                      activeVideo == "editor" ? "gameplay" : "editor"
                    )
                  }
                  clickAble={true}
                  direction="left"
                />
              </div>
              {/* Video and description container element */}
              <div
                className="
                lg:flex lg:self-start lg:w-9/12 lg:p-6 
                lg:bg-page-background-purple/60
                lg:outline lg:outline-light-grey/50 lg:outline-offset-[-12px]

                short:flex short:self-start short:w-11/12 short:p-3 short:max-h-60
              short:bg-page-background-purple/60
                short:outline short:outline-light-grey/50 short:outline-offset-[-12px]
                "
              >
                {/* Video Element */}
                <div className="relative flex-[2]">
                  {/* Hidden placeholder elements to maintain size */}
                  <div className="invisible" aria-hidden="true">
                    <div
                      className="
                      p-1 border-2 flex items-center justify-center 
                      md:p-2 md:border-3 lg:border-none lg:border-light-grey
                      short:border-none short:p-0 short:m-0
                    "
                    >
                      <video
                        className="block max-h-[calc(100vh-24rem)] w-auto object-cover border-[#3A3749] border-2 md:border-3
                        short:max-h-52"
                        muted
                        autoPlay
                        loop
                      >
                        <source
                          src={
                            activeVideo === "gameplay"
                              ? "/Demovid.mp4"
                              : "/EditorDemo.mp4"
                          }
                          type="video/mp4"
                        />
                      </video>
                    </div>
                  </div>
                  {/* Actual animated content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeVideo}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="
                      absolute top-0 left-0 w-full h-full
                      p-1 border-light-grey border-2 flex items-center justify-center 
                      md:p-2 md:border-3 lg:border-none 
                      short:border-none short:p-0 short:m-0
                      "
                    >
                      <video
                        key={activeVideo}
                        className="block max-h-[calc(100vh-24rem)] w-auto object-cover border-[#3A3749] border-2 md:border-3
                                   short:max-h-52"
                        muted={activeSection != "Gameplay" || muted}
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
                </div>

                {/* Description Element */}
                <div className="mt-8 lg:mt-2 mx-auto max-w-2xl flex-[1] lg:ml-8 short:mx-4">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeVideo}
                      className="
                        text-mukta-mahee font-semibold text-base/10 text-light-grey text-center 
                        lg:font-normal lg:text-lg/loose lg:text-left
                        short:font-normal short:text-xs short:text-left
                        tablet:text-xl/loose
                        two_k:text-3xl/loose
                        four_k:text-5xl/loose"
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
              <div className="hidden lg:block short:block">
                <ToggleArrow
                  toggleButton={() =>
                    setActiveVideo(
                      activeVideo == "editor" ? "gameplay" : "editor"
                    )
                  }
                  clickAble={true}
                  direction="right"
                />
              </div>
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div
          id="About Us"
          className="h-dvh relative flex flex-col snap-start overflow-hidden"
        >
          {/* Title */}
          <h2
            className="hidden lg:flex max-w-[28rem] mt-36 mb-4 pl-16 py-3 font-light text-5xl text-light-grey font-nova-square bg-heading-dark-purple [clip-path:polygon(0%_0%,100%_0%,90%_100%,0%_100%)] z-10
                        short:flex short:max-w-[18rem] short:mt-16 short:pl-12 short:py-1 short:text-3xl"
          >
            About Us
          </h2>

          {/* Content Container */}
          <div
            className="flex flex-col relative h-full 
                          lg:px-8 lg:pt-8
                          short:px-2 short:pt-2"
          >
            {/* Image Section */}
            <div
              className="h-1/2 
                            lg:absolute lg:right-0 lg:w-3/5 lg:h-5/6 lg:top-2
                            short:absolute short:right-0 short:w-3/5 short:h-5/6 short:top-2"
            >
              {/* Background image container */}
              <div
                className="absolute inset-0 lg:inset-[-40%] tablet:inset-[-35%] short:inset-[-30%]
                              tablet:top-4"
              >
                <img
                  src={aboutUsBackgroundImg}
                  alt="About Us"
                  className="w-auto h-1/2 object-cover 
                            lg:w-full lg:h-full lg:object-center
                            short:w-full short:h-full short:object-center"
                />

                {/* Circular Gradient Overlay for large screens*/}
                <div
                  className="hidden lg:flex absolute inset-[-1px] items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(circle at center, transparent 0%, rgba(29,29,46,1) 60%)",
                  }}
                />

                {/* Circular Gradient Overlay for short screens*/}
                <div
                  className="hidden short:flex absolute inset-[-5px] items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(circle at center, transparent 0%, rgba(29,29,46,1) 60%)",
                  }}
                />

                {/* Circular Gradient Overlay for small screens*/}
                <div
                  className="flex lg:hidden short:hidden tablet:hidden absolute top-0 left-0 w-full h-[calc(50%+4px)] items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(circle at center, transparent 0%, rgba(29,29,46,1) 100%)",
                  }}
                />

                {/* Circular Gradient Overlay for tablet screens*/}
                <div
                  className="tablet:flex lg:hidden short:hidden absolute top-0 left-0 w-full h-[calc(50%+12px)] items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(circle at center, transparent 0%, rgba(29,29,46,1) 50%)",
                  }}
                />
              </div>
            </div>

            {/* Text Section */}
            <div
              className="h-1/2 relative flex flex-col items-center justify-center px-8 py-4 z-10
                        lg:h-[calc(100%-12rem)] lg:w-1/2 lg:justify-center lg:items-start lg:mt-12
                        short:h-[calc(100%-12rem)] short:w-1/2 short:justify-center short:items-start short:mt-14"
            >
              <p
                className="
                  z-1 text-mukta-mahee font-semibold text-light-grey text-base/6 text-center mb-6
                  lg:text-left lg:text-lg/10
                  short:text-left short:text-xs
                  tablet:text-lg/loose
                  two_k:text-3xl/loose
                  four_k:text-5xl/loose"
              >
                Ongawa is a rhythm game that goes beyond entertainment,
                centering around music, creativity, and talent discovery. It
                supports real-life musicians by showcasing and monetizing their
                creations.
              </p>
              <p
                className="
                z-1 text-mukta-mahee font-semibold text-light-grey text-base/6 text-center
                lg:text-left lg:text-lg/10
                short:text-left short:text-xs
                tablet:text-lg/loose
                two_k:text-3xl/loose
                four_k:text-5xl/loose"
              >
                Step into the world of Ongawa, where music bridges the gap
                between reality and imagination. You play as a dedicated
                salaryman of Ongawa Records, a struggling music label on the
                brink of collapse. Guided by AWA, a magical, record-shaped
                companion, you discover a parallel universe where rhythm and
                creativity hold the key to uncovering hidden musical talents and
                reviving the company&apos;s glory…
              </p>
            </div>
          </div>
        </div>

        {/* Musician Section */}
        <div
          id="Musicians"
          className="h-dvh flex flex-col items-center justify-center relative snap-start"
        >
          {/* Background image and gradient overlay container */}
          <div className="flex-grow w-full relative">
            {/* Background image */}
            <AnimatePresence mode="sync">
              <motion.div
                key={currentMusician.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${currentMusician.backgroundImage})`,
                }}
              />
            </AnimatePresence>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(35,35,35,0.1)] to-[rgba(35,35,35,0.6)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(35,35,35,0.1)] to-[rgba(35,35,35,0.6)]" />

            {/* Musician Selector */}
            <div
              className="flex justify-center mt-16 mb-4
                            lg:absolute lg:bottom-8 lg:right-[calc(15%+28px)]
                            short:absolute short:bottom-2 short:right-[calc(15%+8px)]"
            >
              <MusicianSelector
                musicians={musicians}
                currentMusician={currentMusician}
                setCurrentMusician={setCurrentMusician}
                className="w-full max-w-60 
                            lg:max-w-[550px] lg:max-h-[100px]
                            short:max-w-[550px] short:max-h-[100px]"
              />
            </div>

            {/* Musician image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentMusician.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute top-[7rem] z-10 w-full h-auto max-h-[90%]
                           object-contain object-top 
                           lg:left-0 lg:-translate-x-80
                           short:top-[3rem] short:left-0 short:translate-x-[-15rem]"
                src={currentMusician.image}
                alt={currentMusician.name}
              />
            </AnimatePresence>

            {/* Information Box */}
            <div
              className="absolute bottom-8 z-20 left-1/2 -translate-x-1/2 flex justify-center overflow-x-auto w-screen px-4
                    lg:w-auto lg:px-0 lg:overflow-visible lg:translate-x-0 lg:left-auto lg:bottom-48 lg:right-[15%]
                    short:w-auto short:px-0 short:overflow-visible short:translate-x-0 short:left-auto short:bottom-[6.5rem] short:right-[15%]"
            >
              <div className="w-96 flex-shrink-0 lg:w-auto tablet:w-[600px]">
                <InformationBox
                  currentMusician={currentMusician}
                  className="w-full 
                            lg:max-w-[550px] lg:max-h-[500px]
                            short:max-w-[500px] short:max-h-[225px]
                            tablet:max-w-[550px] tablet:max-h-[400px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FAQs section */}
        <div id="FAQs" className="min-h-dvh flex flex-col relative snap-start">
          <div className="mt-32 short:mt-14">
            <h2
              className="
                  w-1/2 short:w-1/3 lg:max-w-[28rem] mr-6 pl-4 lg:pl-16 py-2 lg:!py-3 font-light text-2xl
                  lg:text-5xl tablet:text-5xl text-light-grey font-nova-square bg-heading-dark-purple [clip-path:polygon(0%_0%,100%_0%,90%_100%,0%_100%)]"
            >
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

Homepage.propTypes = {
  muted: PropTypes.bool.isRequired,
};

export default Homepage;
