import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import cover1 from "../../assets/images/musicCovers/celticwhispersballadHD.png";
import cover2 from "../../assets/images/musicCovers/neonpulsesymHD.png";
import cover3 from "../../assets/images/musicCovers/celestialechoesHD.png";
import cover4 from "../../assets/images/musicCovers/nocturnalpursuitHD.png";
import searchIcon from '../../assets/icons/searchIcon.svg';
import closeIcon from '../../assets/icons/closeNavDropdown.png';
import heartIcon from "../../assets/icons/heartIcon.svg";
import playIcon from "../../assets/icons/playIcon.svg";
import timeIcon from "../../assets/icons/timeIcon.svg"

const beatmaps = [
  {
    id: 1,
    title: "Neon Pulse Symphony",
    artist: "Techno Maestro",
    mappedBy: "Techno Maestro",
    image: cover1,
    difficulty: "medium",
    likes: 0,
    plays: 0,
    downloads: 61,
    duration: "3:47",
    hpDrain: 5,
    approachRate: 7,
    level: "2.3",
    bpm: "113",
    notes: "185",
    sliders: "61",
    description: "Dive into the cutting-edge realm of Techno Adventures World, where futuristic technology meets thrilling escapades. Explore cyber landscapes, master advanced gadgets, and overcome digital challenges in this electrifying journey through the next frontier.",
    source: ["Techno", "Adventures", "World"],
    tags: ["Neon", "Synth wave"]
  },
  {
    id: 2,
    title: "Celtic Whispers Ballad",
    artist: "Folklore Minstrel",
    mappedBy: "Folklore Minstrel",
    image: cover2,
    difficulty: "hard",
    likes: 2,
    plays: 0,
    downloads: 43,
    duration: "4:12",
    hpDrain: 8,
    approachRate: 9,
    level: "4.7",
    bpm: "113",
    notes: "185",
    sliders: "61",
    description: "Journey through ancient Celtic landscapes with this mystical ballad that weaves tales of legend and lore. Each note carries the whispers of ancient druids and the echoes of forgotten rituals, creating an immersive experience that transcends time.",
    source: ["Celtic", "Mythology", "Ballads"],
    tags: ["Celtic", "Folk", "Mystical"]
  },
  {
    id: 3,
    title: "Celestial Echoes",
    artist: "Celestial Harmonics",
    mappedBy: "StarNavigator",
    image: cover3,
    difficulty: "easy",
    likes: 0,
    plays: 1,
    downloads: 87,
    duration: "5:23",
    hpDrain: 6,
    approachRate: 6,
    level: "3.5",
    bpm: "113",
    notes: "185",
    sliders: "61",
    description: "Float through the cosmos with this ethereal symphony that captures the harmony of the stars. Each beat resonates with the pulse of distant galaxies, creating a celestial journey that will transport you beyond the boundaries of our universe.",
    source: ["Astronomical", "Ambient", "Space"],
    tags: ["Cosmic", "Ambient", "Ethereal"]
  },
  {
    id: 4,
    title: "Neon Pulse Symphony",
    artist: "ShadowWeaver",
    mappedBy: "ShadowWeaver",
    image: cover4,
    difficulty: "medium",
    likes: 0,
    plays: 0,
    downloads: 52,
    duration: "4:05",
    hpDrain: 6,
    approachRate: 8,
    level: "3.8",
    bpm: "113",
    notes: "185",
    sliders: "61",
    description: "Enter the shadows with this intense beat-driven track that follows a mysterious chase through moonlit streets. The rhythm accelerates and decelerates, mimicking the heart-pounding tension of pursuit and escape in the darkness of night.",
    source: ["Urban", "Night", "Mystery"],
    tags: ["Dark", "Intense", "Urban"]
  },
  {
    id: 5,
    title: "Tokyo, Japan",
    artist: "Liam Burnett-Blue",
    mappedBy: "Unsplash",
    image: cover2,
    difficulty: "medium",
    likes: 0,
    plays: 0,
    downloads: 38,
    duration: "3:29",
    hpDrain: 5,
    approachRate: 7,
    level: "3.0",
    bpm: "110",
    notes: "155",
    sliders: "31",
    description: "Experience the vibrant energy of Tokyo's cityscape in this dynamic electronic track. The melody captures the neon-lit streets, bustling crowds, and serene temple gardens that define Japan's captivating capital city.",
    source: ["Urban", "Japanese", "Electronic"],
    tags: ["Tokyo", "City", "Electronic"]
  },
  {
    id: 6,
    title: "Flowering Blossoms",
    artist: "Meric Dağlı",
    mappedBy: "meric",
    image: cover4,
    difficulty: "medium",
    likes: 0,
    plays: 0,
    downloads: 31,
    duration: "4:43",
    hpDrain: 4,
    approachRate: 5,
    level: "2.8",
    bpm: "113",
    notes: "120",
    sliders: "50",
    description: "A gentle yet intricate melody that unfolds like petals opening to the morning sun. This track combines traditional instruments with subtle electronic elements to create a soundscape as delicate and complex as nature itself.",
    source: ["Nature", "Seasonal", "Organic"],
    tags: ["Floral", "Spring", "Peaceful"]
  },
];

export default function BeatmapListingPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredBeatmap, setHoveredBeatmap] = useState(null);
  // const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();

  const [searchHistory, setSearchHistory] = useState(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const searchContainerRef = useRef(null);

  const filteredBeatmaps = beatmaps.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to render difficulty indicator
  const DifficultyIndicator = ({ difficulty }) => {
    return (
      <div className="flex gap-1">
        <div className={`h-4 w-1 rounded-full ${difficulty === "easy" ? "bg-green-500" : "bg-gray-500"}`}></div>
        <div className={`h-4 w-1 rounded-full ${difficulty === "medium" ? "bg-yellow-500" : "bg-gray-500"}`}></div>
        <div className={`h-4 w-1 rounded-full ${difficulty === "hard" ? "bg-red-500" : "bg-gray-500"}`}></div>
      </div>
    );
  };

  const handleBeatmapClick = (id) => {
    navigate(`/beatmaplisting/${id}`);
  };

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Add search to history
  useEffect(() => {
    if (searchTerm) {
      setSearchHistory((prevHistory) => {
        // Remove the searchTerm if it already exists
        const filteredHistory = prevHistory.filter((term) => term !== searchTerm);
        // Add the searchTerm at the top and keep the history limited to 5 items
        return [searchTerm, ...filteredHistory].slice(0, 5);
      });
    }
  }, [searchTerm]);

  // Function to remove individual search history items
  const removeSearchHistoryItem = (event, historicalSearch) => {
    // Prevent the click from bubbling up to the parent div
    event.stopPropagation();

    // Remove the item from search history
    setSearchHistory(prevHistory =>
      prevHistory.filter(item => item !== historicalSearch)
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    // Use capture phase to ensure this runs before other click handlers
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, []);

  const handleSearchHistoryClick = (historicalSearch) => {
    setSearchInput(historicalSearch);
    setSearchTerm(historicalSearch);
    setShowDropdown(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(searchInput);
      setShowDropdown(false);
    }
  };

  return (
    <div className="p-6 bg-[#2D294C] min-h-screen text-white mt-16">

      {/* Desktop Search - Hidden on Mobile */}
      <div className="hidden md:flex items-center mb-6">
        <div ref={searchContainerRef} className="relative w-full max-w-full rounded flex items-center mx-4">
          {/* <div className="bg-[#6D6D99] bg-opacity-50 w-full rounded flex items-center"> */}
          <div className={`${showDropdown && searchHistory.length > 0 ? 'bg-[#1D1D2E]' : 'bg-[#6D6D99] bg-opacity-50'} w-full rounded-t ${showDropdown && searchHistory.length > 0 ? 'rounded-b-none' : 'rounded'} flex items-center`}>
            <input
              type="text"
              placeholder="Search ..."
              className="text-white border-none w-full px-4 rounded focus:ring-0 placeholder:text-lg"
              style={{ border: "none"}} // to override styling in index.css (temporary)
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setShowDropdown(true);
              }}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (searchHistory.length > 0) {
                    setShowDropdown(true);
                  }
                }}
            />
            <div className="w-px h-6 bg-white mx-3"></div>
            <img src={searchIcon} alt="Search" className="w-6 h-6 fill-white-500 mr-4" />
          </div>
          {/* Search History Dropdown */}
          {showDropdown && searchHistory.length > 0 && (
            <div
              className="absolute top-full left-0 right-0 bg-[#1D1D2E] rounded-b-lg z-50 p-2"
            >
              {searchHistory.map((historyItem, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-[#2D294C] cursor-pointer rounded-lg group"
                  onClick={() => handleSearchHistoryClick(historyItem)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={timeIcon} alt="Search" className="w-4 h-4" />
                      <span>{historyItem}</span>
                    </div>
                    <img
                      src={closeIcon}
                      alt="Remove"
                      className="w-3 h-3"
                      onClick={(e) => removeSearchHistoryItem(e, historyItem)} 
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search - Shown only on mobile */} 
      {/* flex md:hidden items-center gap-2 mb-4 */}
      <div className="md:hidden mb-6">
        <div className="flex items-center bg-[#6D6D99] bg-opacity-50 rounded-lg">
          <input
            type="text"
            placeholder="Search ..."
            className="text-white border-none w-full rounded focus:ring-0 px-4 py-2"
            style={{ border: "none" }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="w-px h-6 bg-white"></div>
          {searchInput ? (
            <img src={closeIcon} alt="Close" onClick={() => setSearchInput("")} className="w-4 h-4 mx-3" /> 
          ) : (
            <img src={searchIcon} alt="Search" className="w-5 h-5 mx-3" />
          )}
        </div>
      </div>

      {/* Desktop Grid View - Hidden on Mobile */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 md:gap-6">
        {filteredBeatmaps.map((beatmap, index) => (
          <div
            key={index}
            className="p-4 rounded-xl hover:bg-[#1D1D2E]/70 cursor-pointer relative"
            onClick={() => handleBeatmapClick(beatmap.id)}
            onMouseEnter={() => setHoveredBeatmap(index)}
            onMouseLeave={() => setHoveredBeatmap(null)}
          >
            <img
              src={beatmap.image}
              alt={beatmap.title}
              className="rounded-lg mb-4 w-full h-70 object-cover"
            />
            <h3 className="text-lg font-semibold m-0">{beatmap.title}</h3>
            <p className="text-sm text-gray-400 mb-2">{beatmap.artist}</p>
            <p className="text-xs text-gray-500">Mapped: {beatmap.mappedBy}</p>
            {hoveredBeatmap === index && (
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pl-2">
                {/* Difficulty Indicator */}
                <DifficultyIndicator difficulty={beatmap.difficulty} />

                {/* Likes and Plays */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <img src={heartIcon} alt="heart" className="w-4 h-4" />
                    <span className="text-xs">{beatmap.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <img src={playIcon} alt="play" className="w-4 h-4" />
                    <span className="text-xs">{beatmap.plays}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile List View - Hidden on Desktop */}
      <div className="md:hidden space-y-1"> {/* space-y-4 */}
        {filteredBeatmaps.map((beatmap, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-1 rounded-xl hover:bg-[#2D294C]"
            onMouseEnter={() => setHoveredBeatmap(index)}
            onMouseLeave={() => setHoveredBeatmap(null)}
            onClick={() => handleBeatmapClick(beatmap.id)}
          >
            <img
              src={beatmap.image}
              alt={beatmap.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-medium">{beatmap.title}</h3>
                  <p className="text-sm text-gray-400">{beatmap.artist}</p>
                  <p className="text-xs text-gray-500">Mapped: {beatmap.mappedBy}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                 {/* Only show the Difficulty, Likes, and Plays on hover */}
                  {hoveredBeatmap === index && (
                    <>
                      {/* Difficulty Indicator */}
                      <DifficultyIndicator difficulty={beatmap.difficulty} />

                      {/* Likes and Plays */}
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          <img src={heartIcon} alt="heart" className="w-4 h-4" />
                          <span className="text-xs">{beatmap.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <img src={playIcon} alt="play" className="w-4 h-4" />
                          <span className="text-xs">{beatmap.plays}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
