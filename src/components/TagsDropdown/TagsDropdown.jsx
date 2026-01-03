import { useState, forwardRef, useEffect } from "react";
import PropTypes from "prop-types";

const TagsDropdown = forwardRef(
  ({ isOpen, onToggle, selectedTags, onTagsChange, availableTags }, ref) => {
  const [searchTag, setSearchTag] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="relative" data-dropdown="tags" ref={ref}>
      <button
        className="bg-khaki rounded-md px-4 py-2 flex items-center gap-2 text-black"
        onClick={onToggle}
        // style={{
        //   border: "none",
        //   backgroundColor: "rgba(109, 109, 153, 0.5)",
        // }}
      >
        <span>
          Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-chevron-down"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* Desktop Dropdown */}
      {isOpen && !isMobile && (
        <div className="absolute mt-1 w-72 z-50 font-nova-square">
          <div className="bg-main-off-black rounded-md shadow-lg z-10 p-4 border border-main-accent">
            <p className="text-lg">Tags</p>
            <div className="mb-4 bg-khaki rounded-md">
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-md p-3 focus:outline-none focus:ring-0 placeholder:text-black text-black"
                style={{ border: "none" }}
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
              />
            </div>
            {/* <div className="flex flex-wrap gap-2">
              {availableTags
                .filter((tag) =>
                  tag.toLowerCase().includes(searchTag.toLowerCase())
                )
                .map((tag) => (
                  <div
                    key={tag}
                    className={`border rounded-md px-4 py-2 cursor-pointer ${
                      selectedTags.includes(tag)
                        ? "bg-main-accent text-black"
                        : "border-white"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleTag(tag);
                    }}
                  >
                    {tag}
                  </div>
                ))}
            </div> */}
            <div className="flex flex-wrap gap-2 mb-4">
              {(() => {
                const filteredTags = availableTags.filter((tag) =>
                  tag.toLowerCase().includes(searchTag.toLowerCase())
                );

                // If there's no search term, prioritize showing selected tags + remaining slots filled with unselected tags
                let tagsToShow;
                if (searchTag === "") {
                  // Show selected tags first, then fill remaining slots with unselected tags
                  const selectedInFiltered = filteredTags.filter((tag) =>
                    selectedTags.includes(tag)
                  );
                  const unselectedInFiltered = filteredTags.filter(
                    (tag) => !selectedTags.includes(tag)
                  );
                  const remainingSlots = Math.max(
                    0,
                    6 - selectedInFiltered.length
                  );
                  tagsToShow = [
                    ...selectedInFiltered,
                    ...unselectedInFiltered.slice(0, remainingSlots),
                  ];
                } else {
                  // When searching, show all filtered results
                  tagsToShow = filteredTags;
                }

                  return tagsToShow.map((tag) => (
                    <div
                      key={tag}
                      className={`border rounded-md px-4 py-2 cursor-pointer transition-colors ${
                        selectedTags.includes(tag)
                          // ? "bg-yellow-500 text-black border-yellow-500"
                          ? "bg-white text-black border-white"
                          : "border-white text-white hover:bg-white hover:text-black"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleTag(tag);
                      }}
                    >
                      {tag}
                    </div>
                  ));
                })()}
              </div>

              {/* Show hint when no search and there are more than 6 tags */}
              {/* {searchTag === "" && availableTags.length > 6 && (
                <p className="text-gray-400 text-xs mb-4">
                  Showing 6 of {availableTags.length} tags. Use search to find
                  more.
                </p>
              )} */}

              {/* Clear Tags Button for Desktop */}
              {selectedTags.length > 0 && (
                <button
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg transition-colors text-sm"
                  onClick={() => onTagsChange([])}
                  style={{ border: "none" }}
                >
                  Clear Tags ({selectedTags.length})
                </button>
              )}
          </div>
        </div>
      )}

      {/* Mobile Modal */}
      {isOpen && isMobile && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onToggle}
          />

          {/* Modal */}
          <div className="fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ease-out">
            <div className="bg-main-off-black rounded-t-xl p-6 max-h-96 overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-10">
                <p className="text-lg font-semibold mb-0">Tags</p>
                <button
                  onClick={onToggle}
                  className="text-gray-400 hover:text-white"
                  style={{ border: "none", backgroundColor: "transparent" }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Search Input */}
              <div className="mb-4 bg-khaki rounded-md text-black">
                <input
                  type="text"
                  placeholder="Search tags..."
                  className="w-full rounded-md p-3 focus:outline-none focus:ring-0 bg-light-purple bg-opacity-50 text-black placeholder:text-black"
                  style={{ border: "none" }}
                  value={searchTag}
                  onChange={(e) => setSearchTag(e.target.value)}
                />
              </div>

              {/* Tags Grid */}
              <div className="flex flex-wrap gap-2 mb-6">
                {/* {availableTags
                  .filter((tag) =>
                    tag.toLowerCase().includes(searchTag.toLowerCase())
                  )
                  .map((tag) => (
                    <div
                      key={tag}
                      className={`border rounded-md px-4 py-3 cursor-pointer transition-colors ${
                        selectedTags.includes(tag)
                          ? "bg-main-accent text-black"
                          : "border-white text-white"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleTag(tag);
                      }}
                    >
                      {tag}
                    </div>
                  ))} */}

                {(() => {
                  const filteredTags = availableTags.filter((tag) =>
                    tag.toLowerCase().includes(searchTag.toLowerCase())
                  );

                  // If there's no search term, show only first 6 tags
                  // If there's a search term, show all filtered results
                  const tagsToShow =
                    searchTag === ""
                      ? filteredTags.slice(0, 6)
                      : filteredTags;

                  return tagsToShow.map((tag) => (
                    <div
                      key={tag}
                      className={`border rounded-md px-4 py-3 cursor-pointer transition-colors ${
                        selectedTags.includes(tag)
                          ? "bg-yellow-500 text-black border-yellow-500"
                          : "border-white text-white hover:bg-white hover:text-black"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleTag(tag);
                      }}
                    >
                      {tag}
                    </div>
                  ));
                })()}
              </div>

              {/* Show hint when no search and there are more than 6 tags */}
              {searchTag === "" && availableTags.length > 6 && (
                <p className="text-gray-400 text-sm mb-4">
                  Showing 6 of {availableTags.length} tags. Use search to find
                  more.
                </p>
              )}

              {/* Clear Tags Button */}
              {selectedTags.length > 0 && (
                <div className="mb-4">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg transition-colors"
                    onClick={() => onTagsChange([])}
                    style={{ border: "none" }}
                  >
                    Clear All Tags ({selectedTags.length})
                  </button>
                </div>
              )}

              {/* Selected Tags Count */}
              {selectedTags.length > 0 && (
                <div className="mb-4 text-sm text-gray-400">
                  {selectedTags.length} tag
                  {selectedTags.length !== 1 ? "s" : ""} selected
                </div>
              )}

              {/* Apply Button for Mobile */}
              <button
                onClick={onToggle}
                className="w-full bg-main-accent text-black font-semibold py-3 px-4 rounded-md"
                style={{ border: "none" }}
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

TagsDropdown.displayName = "TagsDropdown";

TagsDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  selectedTags: PropTypes.array.isRequired,
  onTagsChange: PropTypes.func.isRequired,
  availableTags: PropTypes.array.isRequired,
};

export default TagsDropdown;
