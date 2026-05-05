import { useState } from "react";
import PropTypes from "prop-types";

function SocialFilterModal({
  isOpen,
  onClose,
  mode = "both", // "curate", "tags", or "both"
  // Curated content props
  curatedValue = 0.5,
  setCuratedValue,
  // Tags props
  allTags = [],
  tempSelectedTags = [],
  setTempSelectedTags,
  // Action handlers
  onApply,
  onCancel,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const showCurated = mode === "curate" || mode === "both";
  const showTags = mode === "tags" || mode === "both";

  const handleTagToggle = (tag) => {
    setTempSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredTags = allTags.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSliderChange = (e) => {
    setCuratedValue(parseFloat(e.target.value));
  };

  const handleApply = () => {
    onApply();
    onClose();
  };

  const handleCancel = () => {
    onCancel();
    onClose();
  };

  const getModalTitle = () => {
    switch (mode) {
      case "curate":
        return "Curated Content";
      case "tags":
        return "Select Tags";
      case "both":
        return "Filters";
      default:
        return "Filters";
    }
  };

  const getModalWidth = () => {
    return mode === "both" ? "w-[90%]" : "w-[80%]";
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`bg-main-off-black rounded-2xl p-8 ${getModalWidth()} mx-4 max-h-[90vh] overflow-y-auto`}
      >
        <h2 className="text-2xl text-main-accent font-nova-square font-light mb-6">
          {getModalTitle()}
        </h2>

        {/* Curated Content Section */}
        {showCurated && (
          <div className="mb-8">
            {mode === "both" && (
              <h3 className="text-xl text-white font-nova-square font-light mb-4">
                Curated Content
              </h3>
            )}
            <p className="text-light-grey font-nova-square mb-6 text-sm">
              How many Posts would you like to have match your most bookmarked
              tags?
            </p>

            <div className="mb-4">
              <div className="relative mb-3">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={curatedValue}
                  onChange={handleSliderChange}
                  className="w-full h-[2px] appearance-none bg-main-accent
                            [&::-webkit-slider-thumb]:appearance-none 
                            [&::-webkit-slider-thumb]:w-4 
                            [&::-webkit-slider-thumb]:h-4 
                            [&::-webkit-slider-thumb]:bg-main-accent
                            [&::-webkit-slider-thumb]:rounded-full 
                            [&::-webkit-slider-thumb]:cursor-pointer 
                            [&::-moz-range-thumb]:bg-main-accent 
                            [&::-moz-range-thumb]:rounded-full 
                            [&::-moz-range-thumb]:w-4 
                            [&::-moz-range-thumb]:h-4 
                            [&::-moz-range-thumb]:cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-light-grey font-nova-square text-sm">
                <span>Less</span>
                <span>More</span>
              </div>
            </div>
          </div>
        )}

        {/* Divider - only show if both sections are present */}
        {showCurated && showTags && (
          <div className="border-t border-light-grey/30 mb-8"></div>
        )}

        {/* Tags Section */}
        {showTags && (
          <div className="mb-8">
            {mode === "both" && (
              <h3 className="text-xl text-white font-nova-square font-light mb-4">
                Tags
              </h3>
            )}

            <input
              type="text"
              placeholder="Search tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mb-6 p-3 text-white bg-transparent border border-light-grey rounded-lg focus:outline-none focus:border-main-accent font-nova-square"
            />

            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
              {filteredTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-2 rounded border font-nova-square text-sm transition-colors ${
                    tempSelectedTags.includes(tag)
                      ? "text-main-accent border-main-accent bg-main-accent/10"
                      : "text-light-grey border-light-grey hover:border-main-accent/50"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-light-grey/30">
          <button
            onClick={handleCancel}
            className="text-white px-6 py-2 rounded border border-light-grey hover:bg-light-grey/10 font-nova-square"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="text-dark-purple bg-main-accent px-6 py-2 rounded font-semibold font-nova-square"
          >
            {mode === "tags" ? "Apply" : "Apply Filters"}
          </button>
        </div>
      </div>
    </div>
  );
}

SocialFilterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(["curate", "tags", "both"]),
  // Curated content props
  curatedValue: PropTypes.number,
  setCuratedValue: PropTypes.func,
  // Tags props
  allTags: PropTypes.arrayOf(PropTypes.string),
  tempSelectedTags: PropTypes.arrayOf(PropTypes.string),
  setTempSelectedTags: PropTypes.func,
  // Action handlers
  onApply: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default SocialFilterModal;
