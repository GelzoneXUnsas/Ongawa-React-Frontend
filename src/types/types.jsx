import PropTypes from "prop-types";

export const MusicianShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  imageIcon: PropTypes.string.isRequired,
  playcount: PropTypes.number.isRequired,
  songcount: PropTypes.number.isRequired,
  spotifyLink: PropTypes.string.isRequired,
  soundcloudLink: PropTypes.string.isRequired,
});
