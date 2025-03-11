import { motion, AnimatePresence } from "framer-motion";
import { MusicianShape } from "../../types/types";

import SpotifyIcon from "../../assets/icons/SpotifyIcon1.svg";
import SoundCloudIcon from "../../assets/icons/soundCloudIcon.svg";

const InformationBox = ({ currentMusician }) => {
  return (
    <div
      className="absolute bottom-8 z-20 p-3 mx-4 max-w-96
      bg-light-grey border-solid border-main-purple border-[12px]
      outline outline-1 outline-white outline-offset-[-4px]
      overflow-hidden"
    >
      {/* Name */}
      <div className="relative mr-6 mb-2 p-2 bg-secondary-purple [clip-path:polygon(0%_0%,100%_0%,85%_100%,0%_100%)]">
        <AnimatePresence mode="wait">
          <motion.h2
            key={currentMusician.id + "-name"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="m-0 text-2xl text-light-grey font-light font-nova-square"
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
          className="text-lg text-main-purple font-nova-square mb-1"
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
          className="text-sm text-main-purple mb-1"
        >
          {currentMusician.description}
        </motion.p>
      </AnimatePresence>

      {/* Social Media */}
      <div className="flex items-center justify-between mt-2">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentMusician.id + "-follow"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-page-background-purple mr-1 mb-0"
          >
            Follow {currentMusician.name} At:
          </motion.p>
        </AnimatePresence>

        <div className="flex items-center gap-2">
          <a
            href={currentMusician.spotifyLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={SpotifyIcon} alt="Spotify" className="w-auto h-10" />
          </a>
          <a
            href={currentMusician.soundcloudLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={SoundCloudIcon}
              alt="SoundCloud"
              className="w-auto h-10"
            />
          </a>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="mt-2 px-8 py-3 bg-main-purple text-white font-nova-square outline outline-1 outline-white outline-offset-[-4px]">
          View More
        </button>
      </div>
    </div>
  );
};

InformationBox.propTypes = {
  currentMusician: MusicianShape.isRequired,
};

export default InformationBox;
