import { useState } from "react";

import recordIcon from "../../assets/icons/recordYellowIcon.svg";

// Example tags and content
const TAGS = ["Traditional", "Folklore", "Celtic", "World", "Fantasy"];
const CONTENT = [
  { id: 1, title: "Celtic Song", tags: ["Celtic"] },
  { id: 2, title: "Fantasy Chant", tags: ["Fantasy", "World"] },
  { id: 3, title: "Old Tale", tags: ["Traditional", "Folklore"] },
];

function CommunityPage() {
  const [contentSelection, setContentSelection] = useState("Home");
  const [selectedTags, setSelectedTags] = useState([]);

  // Toggle tag selection
  const toggleTag = (tag) => {
    setSelectedTags((prevTags) => {
      const tagAlreadySelected = prevTags.includes(tag);

      if (tagAlreadySelected) {
        // Remove the tag
        return prevTags.filter((t) => t !== tag);
      } else {
        // Add the tag
        return [...prevTags, tag];
      }
    });
  };

  // Filter content based on selected tags
  const filteredContent = selectedTags.length
    ? CONTENT.filter((item) =>
        item.tags.some((tag) => selectedTags.includes(tag))
      )
    : CONTENT;

  return (
    <div className="flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-1/5 min-h-screen relative bg-[#555589]/40">
        {/* Sticky Sidebar Content */}
        <div className="sticky top-24 p-4">
          {/* Toggle: Home / Following */}
          <div className="flex flex-col gap-2 mb-6">
            {["Home", "Following"].map((option) => {
              const isSelected = contentSelection === option;
              return (
                <button
                  key={option}
                  className={`flex items-center gap-4 px-2 py-1 text-left font-nova-square text-lg ${
                    isSelected ? "text-accent-yellow" : "text-light-grey"
                  }`}
                  onClick={() => {
                    if (!isSelected) setContentSelection(option);
                  }}
                >
                  <span className="w-4 h-4 flex items-center justify-center">
                    {isSelected && (
                      <img
                        src={recordIcon}
                        alt="Selected"
                        className="h-6 w-6 max-w-none"
                      />
                    )}
                  </span>
                  <span
                    className={` mr-8 ${
                      isSelected
                        ? "w-full border-accent-yellow border-b-[1px]"
                        : undefined
                    }`}
                  >
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Filters */}
          <h2 className="text-xl text-white font-nova-square font-light mb-2">
            Filters
          </h2>
          <div className="ml-4">
            <h3 className="text-xl text-white font-nova-square font-light mb-2">
              Curated Content
            </h3>
            <h3 className="text-xl text-white font-nova-square font-light mb-2">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <button
                  key={tag}
                  className={`px-3 py-1 rounded border ${
                    selectedTags.includes(tag)
                      ? "text-accent-yellow border-accent-yellow"
                      : "text-light-grey border-light-grey"
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Post Button */}
          <button className="mt-6 ml-4 text-dark-purple text-xl font-semibold bg-accent-yellow px-12 py-2 rounded-lg">
            Post
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-4/5 min-h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Community Posts</h2>
        {filteredContent.map((item) => (
          <div
            key={item.id}
            className="border p-4 mb-3 rounded shadow-sm bg-white"
          >
            <h3 className="text-lg font-medium">{item.title}</h3>
            <p className="text-sm text-gray-600">
              Tags: {item.tags.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityPage;
