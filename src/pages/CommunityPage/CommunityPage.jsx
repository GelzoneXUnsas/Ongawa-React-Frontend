import { useState } from "react";

import PropTypes from "prop-types";

import CommunityPost from "../../components/CommunityPost/CommunityPost";

import geoBg from "../../assets/images/backgrounds/geo_bg.png";
import recordIcon from "../../assets/icons/recordYellowIcon.svg";

// Test images
import testImg1 from "../../assets/images/test/1-1_Test_Image.png";
import testImg2 from "../../assets/images/test/2-3_Test_Image.png";
import testImg3 from "../../assets/images/test/4-3_Test_Image.png";
import testImg4 from "../../assets/images/test/16-9_Test_Image.png";
import testImg5 from "../../assets/images/test/16-10_Test_Image.png";

// Example tags and content
const TAGS = [
  "Traditional",
  "Folklore",
  "Celtic",
  "World",
  "Fantasy",
  "Lo-fi",
  "Orchestral",
  "Electronic",
  "Ambient",
  "Vocals",
  "Instrumental",
  "Choral",
  "Nature",
  "Mythical",
  "Sacred",
  "Modern Fusion",
  "Tribal",
  "Epic",
  "Meditative",
  "Experimental",
];
const COMMUNITY_POSTS = [
  {
    id: 1,
    author: "Aoife Byrne",
    profilePicture: "/images/profiles/aoife.jpg",
    dateCreated: "June 12, 2025",
    title: "Celtic Song",
    tags: ["Celtic", "Traditional"],
    text: "This haunting melody originates from the hills of Ireland and tells the story of a wandering bard. Inspired by ancient Gaelic rhythms and played with a traditional harp. Perfect for a quiet evening or storytelling session.",
    media: [testImg5, testImg1],
  },
  {
    id: 2,
    author: "Lior Mizrahi",
    profilePicture: "/images/profiles/lior.jpg",
    dateCreated: "June 14, 2025",
    title: "Fantasy Chant",
    tags: ["Fantasy", "World"],
    text: 'An original composition inspired by high fantasy tales and magical worlds. "Voices rise beneath the moons, calling forth the ancients." Features layered harmonies and ambient soundscapes to evoke elven realms.',
    media: ["/media/fantasy_chant.mp3", "/Demovid.mp4", testImg1],
  },
  {
    id: 3,
    author: "Takeshi Nakamura",
    profilePicture: "/images/profiles/takeshi.jpg",
    dateCreated: "June 15, 2025",
    title: "Harvest Dance",
    tags: ["Folklore", "Traditional"],
    text: "This rhythmic piece captures the energy of a village's autumn harvest celebration. Instruments include Taiko drums and bamboo flutes. The music is traditionally performed in a circle dance under lanterns.",
    media: ["/media/harvest_dance.mp4", testImg3, testImg1],
  },
  {
    id: 4,
    author: "Ines Delgado",
    profilePicture: "/images/profiles/ines.jpg",
    dateCreated: "June 17, 2025",
    title: "Andean Wind Spirits",
    tags: ["World", "Traditional"],
    text: "A composition based on ancient Andean mountain myths. Uses panpipes, charango, and native drums. Conveys the feeling of wind weaving through mountain passes.",
    media: ["/media/andean_spirits.mp3", testImg3, testImg5],
  },
  {
    id: 5,
    author: "Samira Khan",
    profilePicture: "/images/profiles/samira.jpg",
    dateCreated: "June 18, 2025",
    title: "Desert Echoes",
    tags: ["Fantasy", "World"],
    text: 'An ambient soundscape inspired by mirages and ancient ruins buried in sand. "The wind speaks in forgotten tongues beneath the dunes." Designed for background listening during RPG sessions or meditation.',
    media: ["/media/desert_echoes.mp3", testImg4, testImg5],
  },
  {
    id: 6,
    author: "Finn O'Reilly",
    profilePicture: "/images/profiles/finn.jpg",
    dateCreated: "June 19, 2025",
    title: "Reel of the Red Fox",
    tags: ["Celtic", "Folklore"],
    text: "A fast-paced Irish reel inspired by folklore surrounding the elusive red fox. Fiddle-driven with bodhrán percussion. Often played in local pubs during festival nights.",
    media: ["/EditorDemo.mp4", testImg2, testImg3],
  },
  {
    id: 7,
    author: "Yuki Sato",
    profilePicture: "/images/profiles/yuki.jpg",
    dateCreated: "June 20, 2025",
    title: "Moonlight over Kyoto",
    tags: ["Traditional", "World"],
    text: "A slow, elegant koto and shakuhachi duet meant to reflect the serenity of Kyoto's temples at night. Best enjoyed with headphones and soft lighting.",
    media: [testImg1, "/media/kyoto_moonlight.mp3"],
  },
];

// Tags Modal Component
function TagsModal({
  isOpen,
  onClose,
  allTags,
  tempSelectedTags,
  setTempSelectedTags,
  applyTags,
  resetTempSelectedTags,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const handleTagToggle = (tag) => {
    setTempSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredTags = allTags.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApply = () => {
    applyTags();
    onClose();
  };

  const handleCancel = () => {
    resetTempSelectedTags();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-page-background-purple rounded-2xl p-8 w-[80%] px-12 mx-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl text-accent-yellow font-nova-square font-light mb-4">
          Select Tags
        </h2>

        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-8 p-2 text-white border rounded-lg focus:outline-none focus:border-light-grey font-nova-square"
        />

        <div className="flex flex-wrap gap-3 mt-8 mb-8">
          {filteredTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 rounded border font-nova-square text-sm ${
                tempSelectedTags.includes(tag)
                  ? "text-accent-yellow border-accent-yellow"
                  : "text-light-grey border-light-grey"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="text-white px-6 py-2 rounded border border-light-grey hover:bg-light-grey/10"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="text-dark-purple bg-accent-yellow px-6 py-2 rounded font-semibold"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

TagsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  allTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  tempSelectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTempSelectedTags: PropTypes.func.isRequired,
  applyTags: PropTypes.func.isRequired,
  resetTempSelectedTags: PropTypes.func.isRequired,
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
              className="w-full h-[2px] appearance-none bg-accent-yellow
                        [&::-webkit-slider-thumb]:appearance-none 
                        [&::-webkit-slider-thumb]:w-4 
                        [&::-webkit-slider-thumb]:h-4 
                      [&::-webkit-slider-thumb]:bg-accent-yellow 
                        [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:cursor-pointer 
                      [&::-moz-range-thumb]:bg-accent-yellow 
                        [&::-moz-range-thumb]:rounded-full 
                        [&::-moz-range-thumb]:w-4 
                        [&::-moz-range-thumb]:h-4 
                        [&::-moz-range-thumb]:cursor-pointer"
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

  // Curated Content Data
  const [curatedValue, setCuratedValue] = useState(0.5); // Float from 0 to 1
  const [curatedModalOpen, setCuratedModalOpen] = useState(false);

  // Tag selection
  const [sidebarTags, setSidebarTags] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  // Tags for modal before applying
  const [tempSelectedTags, setTempSelectedTags] = useState([]);
  const [tagsModalOpen, setTagsModalOpen] = useState(false);

  // Open modal - initialize tempSelectedTags from sidebarTags
  const openTagsModal = () => {
    setTempSelectedTags(sidebarTags);
    setTagsModalOpen(true);
  };

  // Apply tags from modal to sidebarTags
  const applyTags = () => {
    setSidebarTags(tempSelectedTags);
    // Reset activeTags to only those tags in sidebarTags that are currently active
    setActiveTags((prevActive) =>
      prevActive.filter((tag) => tempSelectedTags.includes(tag))
    );
  };

  // Cancel modal resets tempSelectedTags to sidebarTags
  const resetTempSelectedTags = () => {
    setTempSelectedTags(sidebarTags);
  };

  // Toggle active tag on sidebar (for filtering)
  const toggleActiveTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Filter posts based on activeTags; if no activeTags, show all
  const filteredContent =
    activeTags.length > 0
      ? COMMUNITY_POSTS.filter((post) =>
          post.tags.some((tag) => activeTags.includes(tag))
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
              onClick={openTagsModal}
            >
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {sidebarTags.length === 0 ? (
                <p className="text-light-grey font-nova-square font-light">
                  No Tags Selected
                </p>
              ) : (
                sidebarTags.map((tag) => (
                  <button
                    key={tag}
                    className={`px-3 py-1 rounded border cursor-pointer ${
                      activeTags.includes(tag)
                        ? "text-accent-yellow border-accent-yellow"
                        : "text-light-grey border-light-grey"
                    }`}
                    onClick={() => toggleActiveTag(tag)}
                  >
                    {tag}
                  </button>
                ))
              )}
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
              text={item.text}
              media={item.media}
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
        allTags={TAGS}
        tempSelectedTags={tempSelectedTags}
        setTempSelectedTags={setTempSelectedTags}
        applyTags={applyTags}
        resetTempSelectedTags={resetTempSelectedTags}
      />
    </div>
  );
}

export default CommunityPage;
