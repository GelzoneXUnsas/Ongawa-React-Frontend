import { useState, forwardRef, useEffect } from "react";
import PropTypes from "prop-types";

const TagsDropdown = forwardRef(({ isOpen, onToggle }, ref) => {
  const [searchTag, setSearchTag] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const availableTags = [
    "Traditional",
    "Folklore",
    "Celtic",
    "World",
    "Fantasy",
  ];

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
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="relative" data-dropdown="tags" ref={ref}>
      <button
        className="bg-beatmaps-background rounded-md px-4 py-2 flex items-center gap-2"
        onClick={onToggle}
        style={{
          border: "none",
          backgroundColor: "rgba(109, 109, 153, 0.5)",
        }}
      >
        <span>Tags</span>
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
        <div className="absolute mt-1 w-72 z-50">
          <div className="bg-dropdown-background-color rounded-md shadow-lg z-10 p-4 border border-yellow-500">
            <p className="text-lg">Tags</p>
            <div className="mb-4 bg-light-purple bg-opacity-50 rounded-md">
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-md p-3 focus:outline-none focus:ring-0"
                style={{ border: "none" }}
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {availableTags
                .filter((tag) =>
                  tag.toLowerCase().includes(searchTag.toLowerCase())
                )
                .map((tag) => (
                  <div
                    key={tag}
                    className={`border rounded-md px-4 py-2 cursor-pointer ${
                      selectedTags.includes(tag)
                        ? "bg-beatmaps-background"
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
            </div>
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
            <div className="bg-dropdown-background-color rounded-t-xl p-6 max-h-96 overflow-y-auto">
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
              <div className="mb-4 bg-light-purple bg-opacity-50 rounded-md">
                <input
                  type="text"
                  placeholder="Search tags..."
                  className="w-full rounded-md p-3 focus:outline-none focus:ring-0 bg-light-purple bg-opacity-50 text-white"
                  style={{ border: "none" }}
                  value={searchTag}
                  onChange={(e) => setSearchTag(e.target.value)}
                />
              </div>

              {/* Tags Grid */}
              <div className="flex flex-wrap gap-2 mb-6">
                {availableTags
                  .filter((tag) =>
                    tag.toLowerCase().includes(searchTag.toLowerCase())
                  )
                  .map((tag) => (
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
                  ))}
              </div>

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
                className="w-full bg-yellow-500 text-black font-semibold py-3 px-4 rounded-md"
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
};

export default TagsDropdown;
