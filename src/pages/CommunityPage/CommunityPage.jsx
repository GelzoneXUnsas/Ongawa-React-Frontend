import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CommunityPost from "../../components/CommunityPost/CommunityPost";
import SocialFilterModal from "../../components/SocialFilterModal/SocialFilterModal";

import geoBg from "../../assets/images/backgrounds/geo_bg.png";
import recordIcon from "../../assets/icons/recordYellowIcon.svg";
import rightArrowIcon from "../../assets/icons/rightArrowIcon.png";

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
    text: "This haunting melody originates from the hills of Ireland...",
    media: [testImg5, testImg1],
    cover: testImg1,
  },
  {
    id: 2,
    author: "Lior Mizrahi",
    profilePicture: "/images/profiles/lior.jpg",
    dateCreated: "June 14, 2025",
    title: "Fantasy Chant",
    tags: ["Fantasy", "World"],
    text: "An original composition inspired by high fantasy tales...",
    media: ["/media/fantasy_chant.mp3", "/Demovid.mp4", testImg1],
    cover: testImg3,
  },
  {
    id: 3,
    author: "Takeshi Nakamura",
    profilePicture: "/images/profiles/takeshi.jpg",
    dateCreated: "June 15, 2025",
    title: "Harvest Dance",
    tags: ["Folklore", "Traditional"],
    text: "This rhythmic piece captures the energy of a village's autumn harvest celebration...",
    media: ["/media/harvest_dance.mp4", testImg3, testImg1],
    cover: testImg2,
  },
  {
    id: 4,
    author: "Ines Delgado",
    profilePicture: "/images/profiles/ines.jpg",
    dateCreated: "June 17, 2025",
    title: "Andean Wind Spirits",
    tags: ["World", "Traditional"],
    text: "A composition based on ancient Andean mountain myths...",
    media: ["/media/andean_spirits.mp3", testImg3, testImg5],
    cover: testImg4,
  },
  {
    id: 5,
    author: "Samira Khan",
    profilePicture: "/images/profiles/samira.jpg",
    dateCreated: "June 18, 2025",
    title: "Desert Echoes",
    tags: ["Fantasy", "World"],
    text: "An ambient soundscape inspired by mirages and ancient ruins...",
    media: ["/media/desert_echoes.mp3", testImg4, testImg5],
    cover: testImg5,
  },
  {
    id: 6,
    author: "Finn O'Reilly",
    profilePicture: "/images/profiles/finn.jpg",
    dateCreated: "June 19, 2025",
    title: "Reel of the Red Fox",
    tags: ["Celtic", "Folklore"],
    text: "A fast-paced Irish reel inspired by folklore surrounding the elusive red fox...",
    media: ["/EditorDemo.mp4", testImg2, testImg3],
    cover: testImg1,
  },
  {
    id: 7,
    author: "Yuki Sato",
    profilePicture: "/images/profiles/yuki.jpg",
    dateCreated: "June 20, 2025",
    title: "Moonlight over Kyoto",
    tags: ["Traditional", "World"],
    text: "A slow, elegant koto and shakuhachi duet meant to reflect the serenity...",
    media: [testImg1, "/media/kyoto_moonlight.mp3"],
    cover: testImg2,
  },
];

function CommunityPage() {
  const navigate = useNavigate();
  const [contentSelection, setContentSelection] = useState("Home");

  // Filter State
  // Curated Content Value
  const [curatedValue, setCuratedValue] = useState(0.5); // Float from 0 to 1
  // Tag selection
  const [sidebarTags, setSidebarTags] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  // Tags for modal before applying
  const [tempSelectedTags, setTempSelectedTags] = useState([]);
  const [tempCuratedValue, setTempCuratedValue] = useState(0.5);

  // Modal State
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filterModalMode, setFilterModalMode] = useState("both");

  // Modal handlers
  const openDesktopCuratedModal = () => {
    setTempCuratedValue(curatedValue);
    setFilterModalMode("curate");
    setFilterModalOpen(true);
  };

  const openDesktopTagsModal = () => {
    setTempSelectedTags(sidebarTags);
    setFilterModalMode("tags");
    setFilterModalOpen(true);
  };

  const openMobileCombinedModal = () => {
    setTempSelectedTags(sidebarTags);
    setTempCuratedValue(curatedValue);
    setFilterModalMode("both");
    setFilterModalOpen(true);
  };

  const handleApplyFilters = () => {
    // Apply curated value if modal shows curated content
    if (filterModalMode === "curate" || filterModalMode === "both") {
      setCuratedValue(tempCuratedValue);
    }

    // Apply tags if modal shows tags
    if (filterModalMode === "tags" || filterModalMode === "both") {
      setSidebarTags(tempSelectedTags);

      // Set the active tags to all sidebar tags
      setActiveTags(tempSelectedTags);
    }
  };

  const handleCancelFilters = () => {
    // Reset temp values to current values
    setTempSelectedTags(sidebarTags);
    setTempCuratedValue(curatedValue);
  };

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
                    className={`mr-8 ${
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

          {/* Desktop Filters */}
          <h2 className="text-xl text-white font-nova-square font-light mb-4">
            Filters
          </h2>
          <div className="ml-4">
            <h3
              className="text-xl text-white font-nova-square font-light mb-4 cursor-pointer hover:text-accent-yellow transition-colors"
              onClick={openDesktopCuratedModal}
            >
              Curated Content
            </h3>
            <h3
              className="text-xl text-white font-nova-square font-light mb-2 cursor-pointer hover:text-accent-yellow transition-colors"
              onClick={openDesktopTagsModal}
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
          <button
            className="mt-6 ml-4 text-dark-purple text-xl font-semibold bg-accent-yellow px-12 py-2 rounded-lg"
            onClick={() => navigate("/community/new")}
          >
            Post
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-4/5 min-h-screen">
        <h2 className="text-xl font-bold mb-4">Community Posts</h2>

        {/* Mobile Controls */}
        <div className="flex justify-between px-6 md:px-12 mt-16 lg:hidden">
          {/* Toggle: Home / Following */}
          <div className="flex">
            {["Home", "Following"].map((option) => {
              const isSelected = contentSelection === option;
              return (
                <button
                  key={option}
                  className={`flex py-1 text-left font-nova-square md:text-lg ${
                    isSelected ? "text-accent-yellow" : "text-light-grey"
                  }`}
                  onClick={() => {
                    if (!isSelected) setContentSelection(option);
                  }}
                >
                  <span
                    className={`mr-4 md:mr-8 ${
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

          {/* Mobile Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Mobile Filter Button  */}
            <button
              className="flex items-center gap-3 bg-[#555589]/30 p-2 px-4 rounded-lg hover:bg-[#555589]/50 transition-colors"
              onClick={openMobileCombinedModal}
            >
              <p className="m-0 font-nova-square text-light-grey">Filter</p>
              <img
                className="w-2 rotate-90"
                src={rightArrowIcon}
                alt="Filter"
              />
            </button>
            {/* Mobile Post Button */}
            <button
              className="p-2 px-4 text-dark-purple font-nova-square bg-accent-yellow rounded-lg"
              onClick={() => navigate("/community/new")}
            >
              Post
            </button>
          </div>
        </div>

        {/* Posts */}
        <div className="flex flex-col m-6 md:m-12 gap-12">
          {filteredContent.map((item) => (
            <CommunityPost
              key={item.id}
              author={item.author}
              profilePicture={item.profilePicture}
              dateCreated={item.dateCreated}
              tags={item.tags}
              title={item.title}
              text={item.text}
              cover={item.cover}
              media={item.media}
            />
          ))}
        </div>
      </div>

      {/* Single Reusable Social Filter Modal */}
      <SocialFilterModal
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        mode={filterModalMode}
        curatedValue={tempCuratedValue}
        setCuratedValue={setTempCuratedValue}
        allTags={TAGS}
        tempSelectedTags={tempSelectedTags}
        setTempSelectedTags={setTempSelectedTags}
        onApply={handleApplyFilters}
        onCancel={handleCancelFilters}
      />
    </div>
  );
}

export default CommunityPage;
