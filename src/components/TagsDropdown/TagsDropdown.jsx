import { useState, forwardRef } from "react";

const TagsDropdown = forwardRef(({ isOpen, onToggle }, ref) => {
  const [searchTag, setSearchTag] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const availableTags = [
    "Traditional",
    "Folklore",
    "Celtic",
    "World",
    "Fantasy",
  ];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="relative" ref={ref}>
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

      {isOpen && (
        <div className="absolute mt-1 w-72 bg-dropdown-background rounded-md shadow-lg z-10 p-4 border border-yellow-500">
          <h3 className="text-xl">Tags</h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-md p-3 focus:outline-none focus:ring-0"
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
      )}
    </div>
  );
});

TagsDropdown.displayName = "TagsDropdown";

export default TagsDropdown;
