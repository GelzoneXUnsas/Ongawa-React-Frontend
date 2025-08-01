import PropTypes from "prop-types";

const DownloadIcon = ({ icon, header, source, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      className="no-underline hover:no-underline active:no-underline visited:no-underline focus:no-underline"
    >
      <div
        className="flex items-center py-2 pr-12 h-16
                bg-black border border-color-DownloadIcon-border border-solid rounded-xl"
      >
        {/* Icon on the left */}
        <div className="mr-3 ml-3">
          <img
            src={icon}
            alt="Download Icon"
            className="w-8 h-full object-contain"
          />
        </div>

        {/* Text on the right */}
        <div className="flex flex-col">
          <span className="text-white text-sm whitespace-nowrap">{header}</span>
          <span className="text-white text-xl whitespace-nowrap">{source}</span>
        </div>
      </div>
    </a>
  );
};

DownloadIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default DownloadIcon;
