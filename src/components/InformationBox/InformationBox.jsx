import { motion, AnimatePresence } from "framer-motion";
import { MusicianShape } from "../../types/types";
import PropTypes from "prop-types";

// import SpotifyIcon from "../../assets/icons/SpotifyIcon1.svg";
// import SoundCloudIcon from "../../assets/icons/soundCloudIcon.svg";

const InformationBox = ({ currentMusician, className }) => {
  return (
    <div
      className={`${className} 
      p-3  bg-light-grey border-solid border-main-purple/90 border-[12px]
      outline outline-1 outline-light-grey outline-offset-[-4px] overflow-hidden
      lg:border-[22px] lg:outline-offset-[-6px] lg:p-8
      short:border-[8px] short:p-1
      tablet:p-6
      `}
    >
      {/* Name */}
      <div
        className="relative mr-6 mb-2 p-2 bg-secondary-purple [clip-path:polygon(0%_0%,100%_0%,85%_100%,0%_100%)]
                      short:py-1 short:mr-24 short:mb-1"
      >
        <AnimatePresence mode="wait">
          <motion.h2
            key={currentMusician.id + "-name"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="m-0 text-2xl text-light-grey font-light font-nova-square
                       lg:text-4xl lg:pl-4
                       short:text-2xl
                       tablet:text-4xl tablet:pl-4"
          >
            {currentMusician.name}
          </motion.h2>
        </AnimatePresence>
      </div>
      {/* Title */}
      <AnimatePresence mode="wait">
        <motion.p
          key={currentMusician.id + "-title"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="text-lg text-main-purple font-nova-square mb-1
                     lg:text-2xl lg:mt-4
                     short:text-lg short:m-2
                     tablet:text-2xl tablet:mt-4"
        >
          {currentMusician.title}
        </motion.p>
      </AnimatePresence>
      {/* Description */}
      <AnimatePresence mode="wait">
        <motion.p
          key={currentMusician.id + "-description"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="text-sm text-main-purple mb-1
                      lg:text-lg/10 lg:mt-2
                      short:m-2
                      tablet:text-lg/10 tablet:mt-2"
        >
          {currentMusician.description}
        </motion.p>
      </AnimatePresence>
      {/* Social Media Section */}
      {/* Social Media
      <div className="flex items-center justify-between mt-2 lg:mt-8 short:mt-0">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentMusician.id + "-follow"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-page-background-purple mr-1 mb-0
                         lg:hidden
                         short:text-sm"
          >
            Follow {currentMusician.name} At:
          </motion.p>
        </AnimatePresence> */}
      {/*Desktop Buttons */}
      {/* <button className="hidden lg:block px-16 py-2 bg-main-purple text-2xl text-white font-nova-square outline outline-1 outline-light-grey outline-offset-[-6px]">
          View More
        </button>

        <div className="flex items-center gap-2">
          <a
            href={currentMusician.spotifyLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={SpotifyIcon}
              alt="Spotify"
              className="w-auto h-10 short:h-6"
            />
          </a>
          <a
            href={currentMusician.soundcloudLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={SoundCloudIcon}
              alt="SoundCloud"
              className="w-auto h-10 short:h-6"
            />
          </a>
        </div>
      </div> */}
      {/* Mobile View More Button */}
      {/* <div className="flex justify-center lg:hidden">
        <button
          className="mt-2 px-8 py-3 bg-main-purple text-white font-nova-square outline outline-1 outline-white outline-offset-[-4px]
                            short:mt-1 short:px-6 short:py-2"
        >
          View More
        </button>
      </div> */}
    </div>
  );
};

InformationBox.propTypes = {
  currentMusician: MusicianShape.isRequired,
  className: PropTypes.string,
};

export default InformationBox;
