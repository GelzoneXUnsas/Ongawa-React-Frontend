import { useState } from "react";

import cover1 from "../../assets/images/musicCovers/celticwhispersballadHD.png";
import cover2 from "../../assets/images/musicCovers/neonpulsesymHD.png";
import cover3 from "../../assets/images/musicCovers/celestialechoesHD.png";
import cover4 from "../../assets/images/musicCovers/nocturnalpursuitHD.png";
import filterIcon from "../../assets/icons/filterIcon.svg";
import searchIcon from '../../assets/icons/searchIcon.svg';

const beatmaps = [
  {
    title: "Neon Pulse Symphony",
    artist: "Techno Maestro",
    mappedBy: "Techno Maestro",
    image: cover1,
    difficulty: "medium",
    likes: 0,
    plays: 0
  },
  {
    title: "Celtic Whispers Ballad",
    artist: "Folklore Minstrel",
    mappedBy: "Folklore Minstrel",
    image: cover2,
    difficulty: "hard",
    likes: 2,
    plays: 0
  },
  {
    title: "Celestial Echoes",
    artist: "Celestial Harmonics",
    mappedBy: "StarNavigator",
    image: cover3,
    difficulty: "easy",
    likes: 0,
    plays: 1
  },
  {
    title: "Neon Pulse Symphony",
    artist: "ShadowWeaver",
    mappedBy: "ShadowWeaver",
    image: cover4,
    difficulty: "medium",
    likes: 0,
    plays: 0
  },
  {
    title: "Tokyo, Japan",
    artist: "Liam Burnett-Blue",
    mappedBy: "Unsplash",
    image: cover2,
    difficulty: "medium",
    likes: 0,
    plays: 0
  },
  {
    title: "Flowering Blossoms",
    artist: "Meric Dağlı",
    mappedBy: "meric",
    image: cover4,
    difficulty: "medium",
    likes: 0,
    plays: 0
  },
];

export default function BeatmapsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  // const [hoveredItem, setHoveredItem] = useState(null);
  // const [isSearchActive, setIsSearchActive] = useState(false);

  const filteredBeatmaps = beatmaps.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(searchInput);
    }
  };

  // // Function to render difficulty indicator
  // const DifficultyIndicator = ({ difficulty }) => {
  //   return (
  //     <div className="flex gap-1">
  //       <div className="h-4 w-1 rounded-full bg-green-500"></div>
  //       <div className="h-4 w-1 rounded-full bg-yellow-500"></div>
  //       <div className={`h-4 w-1 rounded-full ${difficulty === "hard" ? "bg-red-500" : "bg-gray-500"}`}></div>
  //     </div>
  //   );
  // };

  // const handleSearchClear = () => {
  //   setSearch("");
  // };

  return (
    <div className="p-6 md:p-6 bg-[#2D294C] min-h-screen text-white mt-16">
      <div className="flex items-center gap-10 mb-6">
        <div className="relative w-full max-w-full bg-[#6D6D99] rounded flex items-center">
          <input
            type="text"
            placeholder="Search ..."
            className="text-white border-none w-full px-4 rounded focus:ring-0 placeholder:text-lg"
            style={{ border: "none"}} // to override styling in index.css (temporary)
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="w-px h-6 bg-white mx-3"></div>
          <img src={searchIcon} alt="Search" className="w-6 h-6 fill-white-500 mr-4" />
        </div>
        <button
          className="bg-[#6D6D99] text-white px-10 rounded border-none flex items-center gap-2"
          style={{
            backgroundColor: "#6D6D99",
            color: "white",
            border: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#6D6D99";
            e.currentTarget.style.border = "none";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#6D6D99";
            e.currentTarget.style.border = "none";
          }}
        >
          <img src={ filterIcon } className="w-7 h-7"/>
          Filter
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredBeatmaps.map((beatmap, index) => (
          <div key={index} className="p-4 rounded-xl hover:bg-[#1D1D2E] cursor-pointer">
            <img
              src={beatmap.image}
              alt={beatmap.title}
              className="rounded-lg mb-4 w-full h-70 object-cover"
            />
            <h3 className="text-lg font-semibold m-0">{beatmap.title}</h3>
            <p className="text-sm text-gray-400 mb-2">{beatmap.artist}</p>
            <p className="text-xs text-gray-500">Mapped: {beatmap.mappedBy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
