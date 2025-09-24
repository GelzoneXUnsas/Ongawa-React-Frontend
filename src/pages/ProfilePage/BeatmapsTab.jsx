import { useState } from "react";
import bpmIcon from "../../assets/icons/bpmIcon.svg";
import clockIcon from "../../assets/icons/clockIcon.svg";
import ellipseIcon from "../../assets/icons/ellipse.svg";
import bookmarkedIcon from "../../assets/icons/bookmarkedIcon.svg";
import editIcon from "../../assets/icons/editIcon.svg";
import triangleDownIcon from "../../assets/icons/triangleDown.svg";

import cover from "../../assets/images/musicCovers/neonpulsesym.png";

const BeatmapsTab = () => {
  const [activeTab, setActiveTab] = useState("bookmarked");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const beatmapsData = {
    bookmarked: [
      {
        id: 1,
        name: "Neon Pulse Symphony",
        artist: "Techno Maestro",
        mapper: "Techno Maestro",
        difficulty: 2.1,
        maxDifficulty: 4.8,
        level: 3,
        time: "3:47",
        plays: 113,
      },
      {
        id: 2,
        name: "Neon Pulse Symphony",
        artist: "Techno Maestro",
        mapper: "Techno Maestro",
        difficulty: 2.1,
        maxDifficulty: 4.8,
        level: 3,
        time: "3:47",
        plays: 113,
      },
      {
        id: 3,
        name: "Neon Pulse Symphony",
        artist: "Techno Maestro",
        mapper: "Techno Maestro",
        difficulty: 2.1,
        maxDifficulty: 4.8,
        level: 3,
        time: "3:47",
        plays: 113,
      },
      {
        id: 4,
        name: "Neon Pulse Symphony",
        artist: "Techno Maestro",
        mapper: "Techno Maestro",
        difficulty: 2.1,
        maxDifficulty: 4.8,
        level: 3,
        time: "3:47",
        plays: 113,
      },
    ],
    created: [
      {
        id: 5,
        name: "Neon Pulse Symphony",
        artist: "Techno Maestro",
        mapper: "Techno Maestro",
        difficulty: 2.3,
        maxDifficulty: 4.8,
        level: 3,
        time: "3:47",
        plays: 113,
      },
      {
        id: 6,
        name: "Neon Pulse Symphony",
        artist: "Techno Maestro",
        mapper: "Techno Maestro",
        difficulty: 2.3,
        maxDifficulty: 4.8,
        level: 3,
        time: "3:47",
        plays: 113,
      },
      {
        id: 7,
        name: "Neon Pulse Symphony",
        artist: "Techno Maestro",
        mapper: "Techno Maestro",
        difficulty: 2.3,
        maxDifficulty: 4.8,
        level: 3,
        time: "3:47",
        plays: 113,
      },
      {
        id: 8,
        name: "Neon Pulse Symphony",
        artist: "Techno Maestro",
        mapper: "Techno Maestro",
        difficulty: 2.3,
        maxDifficulty: 4.8,
        level: 3,
        time: "3:47",
        plays: 113,
      },
    ],
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-[#2D294C] text-white">
      {/* Desktop Tabs */}
      <div className="hidden md:block p-6 pb-0">
        <div className="flex border-b border-[#6D6D99] pb-2 gap-8">
          <div
            className={`py-3 cursor-pointer relative text-lg font-nova-square ${
              activeTab === "bookmarked" ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={() => handleTabChange("bookmarked")}
          >
            <span
              className={
                activeTab === "bookmarked"
                  ? "underline underline-offset-8 decoration-yellow-500 decoration-2"
                  : ""
              }
            >
              Bookmarked
            </span>
          </div>
          <div
            className={`py-3 cursor-pointer relative text-lg font-nova-square ${
              activeTab === "created" ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={() => handleTabChange("created")}
          >
            <span
              className={
                activeTab === "created"
                  ? "underline underline-offset-8 decoration-yellow-500 decoration-2"
                  : ""
              }
            >
              Created
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden px-4 py-3">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-between w-full bg-[#6D6D99]/20 px-4 py-3 rounded-lg text-white"
          >
            <span className="text-lg font-nova-square">
              {activeTab === "bookmarked" ? "Bookmarked" : "Created"}
            </span>
            <img src={triangleDownIcon} alt="disc" className="w-6 h-6" />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#1D1D2E] rounded-lg shadow-lg z-20">
              <button
                onClick={() => handleTabChange("bookmarked")}
                className={`w-full text-left px-4 py-3 hover:bg-[#5A5A7B] rounded-t-lg font-nova-square ${
                  activeTab === "bookmarked" ? "text-yellow-500" : "text-white"
                }`}
              >
                Bookmarked
              </button>
              <button
                onClick={() => handleTabChange("created")}
                className={`w-full text-left px-4 py-3 hover:bg-[#5A5A7B] rounded-b-lg font-nova-square ${
                  activeTab === "created" ? "text-yellow-500" : "text-white"
                }`}
              >
                Created
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-6">
        {/* Desktop Table Headers */}
        <div className="hidden md:grid grid-cols-12 gap-4 py-3 px-4 border-b border-[#6D6D99] text-sm sticky top-0 bg-[#2D294C] z-10">
          <div className="col-span-4 text-lg font-nova-square">Name</div>
          <div className="col-span-2 text-center text-lg font-nova-square">
            Difficulty{" "}
            <span className="inline-block w-4 h-4 rounded-full bg-gray-600 text-center text-md leading-4">
              ?
            </span>
          </div>
          <div className="col-span-2 text-center text-lg font-nova-square">
            # of Beatmaps
          </div>
          <div className="col-span-2 text-center text-lg font-nova-square">
            Statistics
          </div>
          <div className="col-span-2 text-center text-lg font-nova-square">
            Saved
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "bookmarked" && (
          <div className="w-full md:h-[450px] md:overflow-y-auto md:no-scrollbar">
            {/* Beatmap Items */}
            {beatmapsData.bookmarked.map((beatmap) => (
              <div
                key={beatmap.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 py-2 items-center"
              >
                {/* Mobile Layout */}
                <div className="md:hidden bg-[#6D6D99]/20 p-5 rounded-md">
                  <div className="flex items-center mb-3">
                    <div className="w-16 h-16 bg-gray-800 rounded mr-4 flex-shrink-0 overflow-hidden">
                      <img
                        src={cover}
                        alt="beatmap thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium font-nova-square">
                        {beatmap.name}
                      </div>
                      <div className="text-sm text-gray-400 font-roboto">
                        {beatmap.artist}
                      </div>
                      <div className="text-xs text-gray-500 font-roboto">
                        Mapped: {beatmap.mapper}
                      </div>
                    </div>
                    <img
                      src={bookmarkedIcon}
                      alt="Bookmarked"
                      className="w-6 h-6 text-yellow-500"
                    />
                  </div>
                  <div className="flex justify-between items-center text-sm font-nova-square">
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center">
                        <span className="w-2 h-4 bg-green-500 mr-1 rounded-sm"></span>
                        {beatmap.difficulty}
                      </span>
                      <span>-</span>
                      <span className="flex items-center">
                        <span className="w-2 h-4 bg-red-500 mr-1 rounded-sm"></span>
                        {beatmap.maxDifficulty}
                      </span>
                      <div className="col-span-2 flex justify-center items-center gap-1 pl-3">
                        <img
                          src={ellipseIcon}
                          alt="ellipse"
                          className="w-5 h-5"
                        />
                        {beatmap.level}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center gap-1">
                        <img
                          src={clockIcon}
                          alt="Duration"
                          className="w-4 h-4"
                        />
                        {beatmap.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <img src={bpmIcon} alt="plays" className="w-5 h-5" />
                        {beatmap.plays}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:contents">
                  <div className="col-span-4 flex items-center">
                    <div className="w-20 h-20 bg-gray-800 rounded mr-4 flex-shrink-0 overflow-hidden">
                      <img
                        src={cover}
                        alt="beatmap thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-white font-nova-square">
                        {beatmap.name}
                      </div>
                      <div className="text-sm text-gray-400 font-roboto">
                        {beatmap.artist}
                      </div>
                      <div className="text-xs text-gray-500 font-roboto">
                        Mapped: {beatmap.mapper}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-center space-x-2 font-nova-square">
                    <span className="flex items-center">
                      <span className="w-2 h-4 bg-green-500 mr-1 rounded-sm"></span>
                      {beatmap.difficulty}
                    </span>
                    <span>-</span>
                    <span className="flex items-center">
                      <span className="w-2 h-4 bg-red-500 mr-1 rounded-sm"></span>
                      {beatmap.maxDifficulty}
                    </span>
                  </div>
                  <div className="col-span-2 flex justify-center items-center gap-2 font-nova-square">
                    <img src={ellipseIcon} alt="ellipse" className="w-5 h-5" />
                    {beatmap.level}
                  </div>
                  <div className="col-span-2 flex justify-center items-center space-x-3 font-nova-square">
                    <div className="flex items-center gap-2">
                      <img src={clockIcon} alt="Duration" className="w-5 h-5" />
                      {beatmap.time}
                    </div>
                    <div className="flex items-center">
                      <img src={bpmIcon} alt="bpm" className="w-7 h-7" />
                      {beatmap.plays}
                    </div>
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <img
                      src={bookmarkedIcon}
                      alt="Bookmarked"
                      className="w-6 h-6"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "created" && (
          <div className="w-full md:h-[450px] md:overflow-y-auto md:no-scrollbar">
            {/* Beatmap Items for Created tab */}
            {beatmapsData.created.map((beatmap) => (
              <div
                key={beatmap.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 py-2 items-center"
              >
                {/* Mobile Layout */}
                <div className="md:hidden bg-[#6D6D99]/20 p-5 rounded-md">
                  <div className="flex items-center mb-3">
                    <div className="w-16 h-16 bg-gray-800 rounded mr-4 flex-shrink-0 overflow-hidden">
                      <img
                        src={cover}
                        alt="beatmap thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium font-nova-square">
                        {beatmap.name}
                      </div>
                      <div className="text-sm text-gray-400 font-roboto">
                        {beatmap.artist}
                      </div>
                      <div className="text-xs text-gray-500 font-roboto">
                        Mapped: {beatmap.mapper}
                      </div>
                    </div>
                    <img
                      src={editIcon}
                      alt="Edit"
                      className="w-6 h-6 text-gray-400"
                    />
                  </div>
                  <div className="flex justify-between items-center text-sm font-nova-square">
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center">
                        <span className="w-2 h-4 bg-green-500 mr-1 rounded-sm"></span>
                        {beatmap.difficulty}
                      </span>
                      <span>-</span>
                      <span className="flex items-center">
                        <span className="w-2 h-4 bg-red-500 mr-1 rounded-sm"></span>
                        {beatmap.maxDifficulty}
                      </span>
                      <div className="col-span-2 flex justify-center items-center gap-1 pl-3">
                        <img
                          src={ellipseIcon}
                          alt="ellipse"
                          className="w-5 h-5"
                        />
                        {beatmap.level}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center gap-1">
                        <img
                          src={clockIcon}
                          alt="Duration"
                          className="w-4 h-4"
                        />
                        {beatmap.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <img src={bpmIcon} alt="plays" className="w-5 h-5" />
                        {beatmap.plays}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:contents">
                  <div className="col-span-4 flex items-center">
                    <div className="w-20 h-20 bg-gray-800 rounded mr-4 flex-shrink-0 overflow-hidden">
                      <img
                        src={cover}
                        alt="beatmap thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-white font-nova-square">
                        {beatmap.name}
                      </div>
                      <div className="text-sm text-gray-400 font-roboto">
                        {beatmap.artist}
                      </div>
                      <div className="text-xs text-gray-500 font-roboto">
                        Mapped: {beatmap.mapper}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-center space-x-2 font-nova-square">
                    <span className="flex items-center">
                      <span className="w-2 h-4 bg-green-500 mr-1 rounded-sm"></span>
                      {beatmap.difficulty}
                    </span>
                    <span>-</span>
                    <span className="flex items-center">
                      <span className="w-2 h-4 bg-red-500 mr-1 rounded-sm"></span>
                      {beatmap.maxDifficulty}
                    </span>
                  </div>
                  <div className="col-span-2 flex justify-center items-center gap-2 font-nova-square">
                    <img src={ellipseIcon} alt="ellipse" className="w-5 h-5" />
                    {beatmap.level}
                  </div>
                  <div className="col-span-2 flex justify-center items-center space-x-3 font-nova-square">
                    <div className="flex items-center gap-2">
                      <img src={clockIcon} alt="Duration" className="w-5 h-5" />
                      {beatmap.time}
                    </div>
                    <div className="flex items-center">
                      <img src={bpmIcon} alt="bpm" className="w-7 h-7" />
                      {beatmap.plays}
                    </div>
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <img src={editIcon} alt="Edit" className="w-6 h-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BeatmapsTab;
