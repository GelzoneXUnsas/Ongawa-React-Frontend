import { useState } from "react";

import PropTypes from "prop-types";

import { AnimatePresence, motion } from "framer-motion";

import SaveIcon from "../../assets/icons/saveIcon.png";
import CommentIcon from "../../assets/icons/commentIcon.png";
import SharePostIcon from "../../assets/icons/sharePostIcon.png";

import leftArrowIcon from "../../assets/icons/leftArrowIconLarge.png";
import rightArrowIcon from "../../assets/icons/rightArrowIconLarge.png";
import recordPlaceholder from "../../assets/icons/ongawaIconWhite.png";

const stripHtmlTags = (html) => {
  // eslint-disable-next-line no-undef
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

const CommunityPost = ({
  author,
  profilePicture,
  dateCreated,
  tags,
  title,
  text,
  cover,
  media = [],
  type = "cover",
}) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const hasMultipleMedia = media.length > 1;
  const currentMedia = media[currentMediaIndex];
  const currentMediaUrl =
    typeof currentMedia === "string" ? currentMedia : currentMedia?.url || "";

  const isAudio = currentMediaUrl.endsWith(".mp3");
  const isVideo = currentMediaUrl.endsWith(".mp4");

  const goToPrevMedia = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex((prev) => prev - 1);
    }
  };

  const goToNextMedia = () => {
    if (currentMediaIndex < media.length - 1) {
      setCurrentMediaIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="p-6 rounded-xl shadow-sm bg-[#555589]/40">
      {/* Header with pfp, author, date, icons */}
      <div className="flex justify-between mb-2">
        <div className="flex items-center gap-4">
          <img src={profilePicture} className="" />
          <div className="text-light-grey font-nova-square">{author}</div>
          <div className="w-1 h-1 rounded-full bg-light-grey"></div>
          <div className="text-light-grey font-nova-square text-xs">
            {dateCreated}
          </div>
        </div>
        {/* Save, Comment, Share Icons */}
        <div className="flex gap-4">
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
      <div className="flex flex-wrap gap-2">
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
      <p className="text-xl font-nova-square font-normal text-light-grey my-3">
        {title}
      </p>

      {/* Text Content */}
      <p className="prose prose-sm max-w-none text-light-grey">
        {stripHtmlTags(text)}
      </p>

      {/* Media Viewer */}
      <div className="relative mt-2 flex justify-center items-center">
        {/* Post displaying cover image on main social page */}
        {type === "cover" ? (
          /* Display cover image if post has one */
          cover ? (
            <img
              src={cover}
              alt="Post cover"
              className="max-h-52 w-auto object-contain rounded"
            />
          ) : null
        ) : /* Display media carousel if post is in expanded form */
        media.length > 0 ? (
          <>
            {hasMultipleMedia && (
              <button
                onClick={goToPrevMedia}
                disabled={currentMediaIndex === 0}
                className={`absolute left-0 z-10 ${
                  currentMediaIndex === 0
                    ? "opacity-30 cursor-default"
                    : "hover:opacity-100"
                }`}
              >
                <img
                  src={leftArrowIcon}
                  alt="Previous"
                  className="h-10 w-auto"
                />
              </button>
            )}

            {/* Media */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentMediaIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full flex justify-center"
              >
                {isAudio ? (
                  <img
                    src={recordPlaceholder}
                    alt="Audio"
                    className="w-36 h-36 object-contain rounded"
                  />
                ) : isVideo ? (
                  <video
                    key={currentMediaUrl}
                    src={currentMediaUrl}
                    controls
                    className="max-h-52 w-auto rounded"
                  />
                ) : (
                  <img
                    src={currentMediaUrl}
                    alt={`Media ${currentMediaIndex + 1}`}
                    className="max-h-52 w-auto object-contain rounded"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {hasMultipleMedia && (
              <button
                onClick={goToNextMedia}
                disabled={currentMediaIndex === media.length - 1}
                className={`absolute right-0 z-10 ${
                  currentMediaIndex === media.length - 1
                    ? "opacity-30 cursor-default"
                    : "hover:opacity-100"
                }`}
              >
                <img src={rightArrowIcon} alt="Next" className="h-10 w-auto" />
              </button>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

CommunityPost.propTypes = {
  author: PropTypes.string.isRequired,
  profilePicture: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  cover: PropTypes.string,
  media: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.oneOf(["cover", "post"]),
};

export default CommunityPost;
