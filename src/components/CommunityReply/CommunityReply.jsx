import { useState } from "react";
import PropTypes from "prop-types";
import ReplyIcon from "../../assets/icons/commentIcon.png";
import ShareIcon from "../../assets/icons/sharePostIcon.png";

const CommunityReply = ({ reply, allReplies }) => {
  const [showSubreplies, setShowSubreplies] = useState(false);
  // Filter sub-replies using replyThreadParentId
  const subreplies = allReplies.filter(
    (r) => r.replyThreadParentId === reply.id
  );

  // Function to find the immediate parent of a reply
  const getParentReply = (replyId) => {
    return allReplies.find((r) => r.id === replyId);
  };

  // Function to truncate text for the parent snippet
  const getFirstLine = (text) => {
    return text.split("\n")[0] || text;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        {/* Reply Info */}
        <div className="flex items-center gap-3">
          <img
            src={reply.profilePicture}
            alt={reply.author}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-nova-square text-light-grey">
            {reply.author}
          </span>
          <div className="w-1 h-1 rounded-full bg-light-grey"></div>
          <span className="text-xs font-nova-square text-light-grey">
            {reply.dateCreated}
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
      <p className="mb-4 text-sm md:text-base text-light-grey font-nova-square break-words whitespace-normal">
        {reply.text}
      </p>

      {/* Subreplies */}
      {subreplies.length > 0 && (
        <div className="mb-6">
          {/* Show Subreply Button */}
          {!showSubreplies ? (
            <button
              className="text-light-grey font-nova-square hover:underline"
              onClick={() => setShowSubreplies(true)}
            >
              {subreplies.length}{" "}
              {subreplies.length === 1 ? "reply" : "replies"} &gt;
            </button>
          ) : (
            subreplies.map((subreply) => (
              <div key={subreply.id} className="ml-8 md:ml-12">
                {/* Subreply Parent Indication */}
                {subreply.parentId && (
                  <div className="flex">
                    <div className="relative w-6 h-4 ml-3 mr-2 bg-transparent before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-full before:h-[1px] before:bg-white after:content-[''] after:absolute after:top-1/2 after:left-0 after:w-[1px] after:h-1/2 after:bg-white"></div>
                    <div className="flex items-center gap-2 text-xs text-light-grey font-nova-square italic mb-2">
                      <img
                        src={
                          getParentReply(subreply.parentId)?.profilePicture ||
                          "/images/profiles/default.jpg"
                        }
                        alt={getParentReply(subreply.parentId)?.author}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      {getFirstLine(
                        getParentReply(subreply.parentId)?.text || ""
                      )}
                    </div>
                  </div>
                )}
                {/* Subreply Content */}
                <div className="flex justify-between items-start mb-2">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <img
                      src={subreply.profilePicture}
                      alt={subreply.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-nova-square text-light-grey">
                      {subreply.author}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-light-grey"></div>
                    <span className="text-xs font-nova-square text-light-grey">
                      {subreply.dateCreated}
                    </span>
                  </div>
                  <div className="flex gap-2 md:gap-4 mt-1 lg:mt-0">
                    <button>
                      <img src={ReplyIcon} className="w-5 md:w-auto" />
                    </button>
                    <button>
                      <img src={ShareIcon} className="w-4 md:w-auto" />
                    </button>
                  </div>
                  {/* Text */}
                </div>
                <p className="mb-4 text-sm md:text-base text-light-grey font-nova-square break-words whitespace-normal">
                  {subreply.text}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

CommunityReply.propTypes = {
  reply: PropTypes.shape({
    id: PropTypes.number.isRequired,
    parentId: PropTypes.number,
    replyThreadParentId: PropTypes.number,
    author: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
    dateCreated: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  allReplies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      parentId: PropTypes.number,
      replyThreadParentId: PropTypes.number,
      author: PropTypes.string.isRequired,
      profilePicture: PropTypes.string.isRequired,
      dateCreated: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CommunityReply;
