import PropTypes from "prop-types";

import SaveIcon from "../../assets/icons/saveIcon.png";
import CommentIcon from "../../assets/icons/commentIcon.png";
import SharePostIcon from "../../assets/icons/sharePostIcon.png";

const CommunityPost = ({
  author,
  profilePicture,
  dateCreated,
  tags,
  title,
  content,
}) => {
  return (
    <div className="p-12 rounded-xl shadow-sm bg-[#555589]/40">
      {/* Header with pfp, author, date, icons */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-4">
          <img src={profilePicture} className="" />
          <div className="text-light-grey font-nova-square">{author}</div>
          <div className="w-1 h-1 rounded-full bg-light-grey"></div>
          <div className="text-light-grey font-nova-square text-xs">
            {dateCreated}
          </div>
        </div>
        {/* Save, Comment, Share Icons */}
        <div className="flex gap-3">
          <button>
            <img src={SaveIcon} />
          </button>
          <button>
            <img src={CommentIcon} />
          </button>
          <button>
            <img src={SharePostIcon} />
          </button>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-nova-square bg-secondary-purple/30 text-white px-4 py-2 rounded-xl"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <p className="text-xl font-nova-square font-normal text-light-grey mt-4 mb-4">
        {title}
      </p>

      {/* HTML Content */}
      <div
        className="prose prose-sm max-w-none text-light-grey"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

CommunityPost.propTypes = {
  author: PropTypes.string.isRequired,
  profilePicture: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default CommunityPost;
