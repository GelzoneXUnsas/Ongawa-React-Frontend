import PropTypes from "prop-types";
import ReplyIcon from "../../assets/icons/commentIcon.png";
import ShareIcon from "../../assets/icons/sharePostIcon.png";

const CommunityReply = ({ author, profilePicture, dateCreated, text }) => {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        {/* Reply Info */}
        <div className="flex items-center gap-3">
          <img
            src={profilePicture}
            alt={author}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-nova-square text-light-grey">
            {author}
          </span>
          <div className="w-1 h-1 rounded-full bg-light-grey"></div>
          <span className="text-xs font-nova-square text-light-grey">
            {dateCreated}
          </span>
        </div>
        {/* Reply and Share Icons */}
        <div className="flex gap-2 md:gap-4 mt-1 lg:mt-0">
          <button>
            <img src={ReplyIcon} className="w-5 md:w-auto" />
          </button>
          <button>
            <img src={ShareIcon} className="w-4 md:w-auto" />
          </button>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm md:text-base text-light-grey font-nova-square">
        {text}
      </p>
    </div>
  );
};

CommunityReply.propTypes = {
  author: PropTypes.string.isRequired,
  profilePicture: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default CommunityReply;
