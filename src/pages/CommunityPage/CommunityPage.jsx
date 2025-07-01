import { useState } from "react";

import PropTypes from "prop-types";

import CommunityPost from "../../components/CommunityPost/CommunityPost";

import geoBg from "../../assets/images/backgrounds/geo_bg.png";
import recordIcon from "../../assets/icons/recordYellowIcon.svg";

// Example tags and content
const TAGS = ["Traditional", "Folklore", "Celtic", "World", "Fantasy"];
const COMMUNITY_POSTS = [
  {
    id: 1,
    author: "Aoife Byrne",
    profilePicture: "/images/profiles/aoife.jpg",
    dateCreated: "June 12, 2025",
    title: "Celtic Song",
    tags: ["Celtic", "Traditional"],
    content: `
      <p>This haunting melody originates from the hills of Ireland and tells the story of a wandering bard.</p>
      <ul>
        <li>Inspired by ancient Gaelic rhythms</li>
        <li>Played with a traditional harp</li>
      </ul>
      <p><em>Perfect for a quiet evening or storytelling session.</em></p>
    `,
  },
  {
    id: 2,
    author: "Lior Mizrahi",
    profilePicture: "/images/profiles/lior.jpg",
    dateCreated: "June 14, 2025",
    title: "Fantasy Chant",
    tags: ["Fantasy", "World"],
    content: `
      <p>An original composition inspired by high fantasy tales and magical worlds.</p>
      <blockquote>
        "Voices rise beneath the moons, calling forth the ancients."
      </blockquote>
      <p>Features layered harmonies and ambient soundscapes to evoke elven realms.</p>
    `,
  },
  {
    id: 3,
    author: "Takeshi Nakamura",
    profilePicture: "/images/profiles/takeshi.jpg",
    dateCreated: "June 15, 2025",
    title: "Harvest Dance",
    tags: ["Folklore", "Traditional"],
    content: `
      <p>This rhythmic piece captures the energy of a village's autumn harvest celebration.</p>
      <p><strong>Instruments:</strong> Taiko drums and bamboo flutes.</p>
      <p>The music is traditionally performed in a circle dance under lanterns.</p>
    `,
  },
  {
    id: 4,
    author: "Ines Delgado",
    profilePicture: "/images/profiles/ines.jpg",
    dateCreated: "June 17, 2025",
    title: "Andean Wind Spirits",
    tags: ["World", "Traditional"],
    content: `
      <p>A composition based on ancient Andean mountain myths.</p>
      <ul>
        <li>Uses panpipes, charango, and native drums</li>
        <li>Conveys the feeling of wind weaving through mountain passes</li>
      </ul>
    `,
  },
  {
    id: 5,
    author: "Samira Khan",
    profilePicture: "/images/profiles/samira.jpg",
    dateCreated: "June 18, 2025",
    title: "Desert Echoes",
    tags: ["Fantasy", "World"],
    content: `
      <p>An ambient soundscape inspired by mirages and ancient ruins buried in sand.</p>
      <blockquote>"The wind speaks in forgotten tongues beneath the dunes."</blockquote>
      <p>Designed for background listening during RPG sessions or meditation.</p>
    `,
  },
  {
    id: 6,
    author: "Finn O'Reilly",
    profilePicture: "/images/profiles/finn.jpg",
    dateCreated: "June 19, 2025",
    title: "Reel of the Red Fox",
    tags: ["Celtic", "Folklore"],
    content: `
      <p>A fast-paced Irish reel inspired by folklore surrounding the elusive red fox.</p>
      <ul>
        <li>Fiddle-driven with bodhrán percussion</li>
        <li>Often played in local pubs during festival nights</li>
      </ul>
    `,
  },
  {
    id: 7,
    author: "Yuki Sato",
    profilePicture: "/images/profiles/yuki.jpg",
    dateCreated: "June 20, 2025",
    title: "Moonlight over Kyoto",
    tags: ["Traditional", "World"],
    content: `
      <p>A slow, elegant koto and shakuhachi duet meant to reflect the serenity of Kyoto's temples at night.</p>
      <p><em>Best enjoyed with headphones and soft lighting.</em></p>
    `,
  },
];

// Tags Modal Component
function TagsModal({ isOpen, onClose, tags }) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-page-background-purple rounded-2xl p-8 w-[80%] px-12 mx-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl text-accent-yellow font-nova-square font-light mb-4">
          Tags
        </h2>
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 text-white border rounded-lg focus:outline-none focus:ring-0 focus:border-light-grey font-nova-square "
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {filteredTags.length ? (
            filteredTags.map((tag) => (
              <span
                key={tag}
                className=" text-light-grey text-sm font-medium px-3 py-1 rounded border-light-grey border-[1px]"
              >
                {tag}
              </span>
            ))
          ) : (
            <p className="text-light-grey font-nova-square">No tags found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

TagsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// Curated Content Modal Component
function CuratedContentModal({
  isOpen,
  onClose,
  curatedValue,
  setCuratedValue,
}) {
  if (!isOpen) return null;

  const handleSliderChange = (e) => {
    setCuratedValue(parseFloat(e.target.value));
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-page-background-purple rounded-2xl p-8 w-[80%] px-12 mx-8">
        <h2 className="text-2xl text-accent-yellow font-nova-square font-light mb-4">
          Curated Content
        </h2>

        <p className="text-light-grey font-nova-square mb-16">
          How many Posts would you like to have match your most bookmarked tags?
        </p>

        <div className="mb-6">
          <div className="relative mb-4">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={curatedValue}
              onChange={handleSliderChange}
              className="w-full h-[1px] appearance-none bg-accent-yellow"
            />
          </div>

          <div className="flex justify-between text-light-grey font-nova-square mb-8">
            <span>Less</span>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

CuratedContentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  curatedValue: PropTypes.number.isRequired,
  setCuratedValue: PropTypes.func.isRequired,
};

function CommunityPage() {
  const [contentSelection, setContentSelection] = useState("Home");
  const [selectedTags, setSelectedTags] = useState([]);

  // Curated Content Data
  const [curatedValue, setCuratedValue] = useState(0.5); // Float from 0 to 1
  const [curatedModalOpen, setCuratedModalOpen] = useState(false);

  // Tags Data
  const [tagsModalOpen, setTagsModalOpen] = useState(false);

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
    ? COMMUNITY_POSTS.filter((item) =>
        item.tags.some((tag) => selectedTags.includes(tag))
      )
    : COMMUNITY_POSTS;

  return (
    <div className="relative flex bg-[#29294C]">
      {/* Background image with opacity */}
      <div
        className="absolute inset-0 w-full h-full bg-repeat bg-left-top opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(${geoBg})` }}
      />

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
          <h2 className="text-xl text-white font-nova-square font-light mb-4">
            Filters
          </h2>
          <div className="ml-4">
            <h3
              className="text-xl text-white font-nova-square font-light mb-4 cursor-pointer hover:text-accent-yellow transition-colors"
              onClick={() => setCuratedModalOpen(true)}
            >
              Curated Content
            </h3>
            <h3
              className="text-xl text-white font-nova-square font-light mb-2 cursor-pointer hover:text-accent-yellow transition-colors"
              onClick={() => setTagsModalOpen(true)}
            >
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
      <div className="w-full lg:w-4/5 min-h-screen">
        <h2 className="text-xl font-bold mb-4">Community Posts</h2>
        <div className="flex flex-col m-12 gap-12">
          {filteredContent.map((item) => (
            <CommunityPost
              key={item.id}
              author={item.author}
              profilePicture={item.profilePicture}
              dateCreated={item.dateCreated}
              tags={item.tags}
              title={item.title}
              content={item.content}
            />
          ))}
        </div>
      </div>

      {/* Curated Content Modal */}
      <CuratedContentModal
        isOpen={curatedModalOpen}
        onClose={() => setCuratedModalOpen(false)}
        curatedValue={curatedValue}
        setCuratedValue={setCuratedValue}
      />

      {/* Tags Content Modal */}
      <TagsModal
        isOpen={tagsModalOpen}
        onClose={() => setTagsModalOpen(false)}
        tags={TAGS}
      />
    </div>
  );
}

export default CommunityPage;
