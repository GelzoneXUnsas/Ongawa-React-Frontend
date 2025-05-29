import { useState } from "react";
import bpmIcon from "../../assets/icons/bpmIcon.svg";
import clockIcon from "../../assets/icons/clockIcon.svg";
import ellipseIcon from "../../assets/icons/ellipse.svg";
import bookmarkedIcon from "../../assets/icons/bookmarkedIcon.svg";
import editIcon from "../../assets/icons/editIcon.svg";

import cover from "../../assets/images/musicCovers/neonpulsesym.png";

const BeatmapsTab = () => {
  const [activeTab, setActiveTab] = useState("bookmarked");

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
        difficulty_text: "Easy",
        time: "3:47",
        plays: 113,
      },
      {
        id: 6,
        name: "Neon Pulse Symphony",
        artist: "Techno Maestro",
        mapper: "Techno Maestro",
        difficulty: 2.3,
        difficulty_text: "Easy",
        time: "3:47",
        plays: 113,
      },
      {
        id: 7,
        name: "Neon Pulse Symphony",
        artist: "Techno Maestro",
        mapper: "Techno Maestro",
        difficulty: 2.3,
        difficulty_text: "Easy",
        time: "3:47",
        plays: 113,
      },
      {
        id: 8,
        name: "Neon Pulse Symphony",
        artist: "Techno Maestro",
        mapper: "Techno Maestro",
        difficulty: 2.3,
        difficulty_text: "Easy",
        time: "3:47",
        plays: 113,
      },
    ],
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-6 h-full w-full">
      {/* Tabs */}
      <div className="flex border-b border-[#6D6D99] pb-2 gap-8">
        <div
          className={`py-3 cursor-pointer relative text-lg ${
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
          className={`py-3 cursor-pointer relative text-lg ${
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

      {/* Content based on active tab */}
      {activeTab === "bookmarked" && (
        <div className="w-full h-[450px] overflow-y-auto no-scrollbar">
          {/* Table Headers */}
          <div className="grid grid-cols-12 gap-4 py-3 px-4 border-b border-[#6D6D99] text-sm sticky top-0 bg-[#2D294C] z-10">
            <div className="col-span-4 text-lg">Name</div>
            <div className="col-span-2 text-center text-lg">
              Difficulty{" "}
              <span className="inline-block w-4 h-4 rounded-full bg-gray-600 text-center text-md leading-4">
                ?
              </span>
            </div>
            <div className="col-span-2 text-center text-lg">
              # of Difficulties
            </div>
            <div className="col-span-2 text-center text-lg">Statistics</div>
            <div className="col-span-2 text-center text-lg">Saved</div>
          </div>

          {/* Beatmap Items */}
          {beatmapsData.bookmarked.map((beatmap) => (
            <div
              key={beatmap.id}
              className="grid grid-cols-12 gap-4 py-4 px-4 items-center"
            >
              <div className="col-span-4 flex items-center">
                <div className="w-20 h-20 bg-gray-800 rounded mr-4 flex-shrink-0 overflow-hidden">
                  <img
                    src={cover}
                    alt="beatmap thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-white">{beatmap.name}</div>
                  <div className="text-sm text-gray-400">{beatmap.artist}</div>
                  <div className="text-xs text-gray-500">
                    Mapped: {beatmap.mapper}
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-center space-x-2">
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
              <div className="col-span-2 flex justify-center items-center gap-2">
                <img src={ellipseIcon} alt="ellipse" className="w-5 h-5" />
                {beatmap.level}
              </div>
              <div className="col-span-2 flex justify-center items-center space-x-3">
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
          ))}
        </div>
      )}

      {activeTab === "created" && (
        <div className="w-full h-[450px] overflow-y-auto no-scrollbar">
          {/* Table Headers */}
          <div className="grid grid-cols-12 gap-4 py-3 px-4 border-b border-[#6D6D99] text-sm sticky top-0 bg-[#2D294C] z-10">
            <div className="col-span-4 text-lg">Name</div>
            <div className="col-span-2 text-center text-lg">
              Difficulty{" "}
              <span className="inline-block w-4 h-4 rounded-full bg-gray-600 text-center text-md leading-4">
                ?
              </span>
            </div>
            <div className="col-span-2 text-center text-lg">
              # of Difficulties
            </div>
            <div className="col-span-2 text-center text-lg">Statistics</div>
            <div className="col-span-2 text-center text-lg">Saved</div>
          </div>

          {/* Beatmap Items */}
          {beatmapsData.bookmarked.map((beatmap) => (
            <div
              key={beatmap.id}
              className="grid grid-cols-12 gap-4 py-4 px-4 items-center"
            >
              <div className="col-span-4 flex items-center">
                <div className="w-20 h-20 bg-gray-800 rounded mr-4 flex-shrink-0 overflow-hidden">
                  <img
                    src={cover}
                    alt="beatmap thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-white">{beatmap.name}</div>
                  <div className="text-sm text-gray-400">{beatmap.artist}</div>
                  <div className="text-xs text-gray-500">
                    Mapped: {beatmap.mapper}
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-center space-x-2">
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
              <div className="col-span-2 flex justify-center items-center gap-2">
                <img src={ellipseIcon} alt="ellipse" className="w-5 h-5" />
                {beatmap.level}
              </div>
              <div className="col-span-2 flex justify-center items-center space-x-3">
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
                <img src={editIcon} alt="bpm" className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BeatmapsTab;
