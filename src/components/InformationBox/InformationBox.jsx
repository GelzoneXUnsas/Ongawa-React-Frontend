import React from "react";
import PropTypes from "prop-types";

import { MusicianShape } from "../../types/types";

import SpotifyIcon from "../../assets/icons/SpotifyIcon1.svg";
import SoundCloudIcon from "../../assets/icons/soundCloudIcon.svg";

const InformationBox = ({ currentMusician }) => {
  return (
    <div
      className="absolute bottom-8 z-20 p-3 mx-4 max-w-96
    bg-light-grey border-solid border-main-purple border-[12px]
      outline outline-1 outline-white outline-offset-[-4px]"
    >
      <h2 className="relative mr-6 p-2 text-2xl text-light-grey font-nova-square bg-secondary-purple [clip-path:polygon(0%_0%,100%_0%,85%_100%,0%_100%)]">
        {currentMusician.name}
      </h2>

      <p className="text-lg text-main-purple font-nova-square mb-1">
        Musician / Producer
      </p>
      <p className="text-sm text-main-purple mb-1">
        Lorem ipsum dolor sit amet consectetur. Velit dictum ut feugiat aliquet
        velit iaculis diam. Porttitor tempus risus lectus mi. Sed lacus libero
        dui volutpat sagittis nunc.
      </p>
      <div className="flex items-center justify-between mt-2">
        <p className="text-page-background-purple font-medium mr-1 mb-0">
          Follow {currentMusician.name} At:
        </p>
        <div className="flex items-center gap-2">
          <a href={currentMusician.spotifyLink} target="_blank">
            <img src={SpotifyIcon} alt="Spotify" className="w-auto h-10" />
          </a>
          <a href={currentMusician.soundcloudLink} target="_blank">
            <img
              src={SoundCloudIcon}
              alt="SoundCloud"
              className="w-auto h-10"
            />
          </a>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="mt-2 px-4 py-2 bg-main-purple text-white font-nova-square outline outline-1 outline-white outline-offset-[-4px]">
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
