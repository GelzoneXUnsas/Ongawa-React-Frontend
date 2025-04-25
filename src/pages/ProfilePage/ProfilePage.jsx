import { useState } from "react";
import discIcon from "../../assets/icons/disc.svg";
import settingsIcon from "../../assets/icons/settings.svg";
import bpmIcon from "../../assets/icons/bpmIcon.svg";
import clockIcon from "../../assets/icons/clockIcon.svg";
import ellipseIcon from "../../assets/icons/ellipse.svg";
import bookmarkedIcon from "../../assets/icons/bookmarkedIcon.svg";
import editIcon from "../../assets/icons/editIcon.svg";

import cover from "../../assets/images/musicCovers/neonpulsesym.png";

const ProfilePage = () => {
  // Active page state
  const [activePage, setActivePage] = useState("statistics");
  // Active tab in beatmaps section
  const [activeTab, setActiveTab] = useState("bookmarked");

  // Mock data
  const [playerData, setPlayerData] = useState({
    name: "RhythmMaster",
    level: 35,
    maxLevel: 100,
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rankings: {
      global: 1360,
      country: 540,
      rankedScore: 1027989371,
      hitAccuracy: 97.14,
      playCount: 24147,
      totalScore: 9216719069,
      totalHits: 12775419,
      maxCombo: 2986,
      totalPlayTime: "18d 19h 6m",
    },
    grades: {
      ss: 5,
      s: 32,
      a: 690,
    },
    beatmaps: {
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
    },
  });

  // Handle navigation
  const handleNavigation = (page) => {
    setActivePage(page);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-[#2D294C] flex flex-col min-h-screen pt-16">
      {/* Top banner */}
      <div className="h-48 bg-gray-200"></div>

      {/* Main content */}
      <div className="flex flex-1 text-white">
        {/* Left sidebar */}
        <div className="w-64 border-r border-[#6D6D99] mt-5 mb-5 flex flex-col">
          {/* <div className="flex flex-col justify-between h-full"> */}
          <div className="flex-1">
            {/* Profile pic and name */}
            <div className="flex flex-col items-center mt-4">
              <div className="w-32 h-32 bg-teal-400 rounded-full border-8 border-[#2D294C] -mt-28"></div>
              <div className="mt-4 text-xl">[Name]</div>
            </div>

            {/* Menu items */}
            <div className="mt-16">
              <div className="relative">
                <div
                  className={`flex items-center py-3 px-6 cursor-pointer ${
                    activePage === "statistics"
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleNavigation("statistics")}
                >
                  <div className="w-10 flex justify-start">
                    {activePage === "statistics" && (
                      <img src={discIcon} alt="disc" className="w-6 h-6" />
                    )}
                  </div>
                  <span>Statistics</span>
                  {activePage === "statistics" && (
                    <div className="absolute bottom-0 left-16 right-3 h-0.5 bg-yellow-500"></div>
                  )}
                </div>
              </div>

              <div className="relative">
                <div
                  className={`flex items-center py-3 px-6 cursor-pointer ${
                    activePage === "beatmaps"
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleNavigation("beatmaps")}
                >
                  <div className="w-10 flex justify-start">
                    {activePage === "beatmaps" && (
                      <img src={discIcon} alt="disc" className="w-6 h-6" />
                    )}
                  </div>
                  <span>Beatmaps</span>
                  {activePage === "beatmaps" && (
                    <div className="absolute bottom-0 left-16 right-3 h-0.5 bg-yellow-500"></div>
                  )}
                </div>
              </div>

              <div className="relative">
                <div
                  className={`flex items-center py-3 px-6 cursor-pointer ${
                    activePage === "community"
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleNavigation("community")}
                >
                  <div className="w-10 flex justify-start">
                    {activePage === "community" && (
                      <img src={discIcon} alt="disc" className="w-6 h-6" />
                    )}
                  </div>
                  <span>Community</span>
                  {activePage === "community" && (
                    <div className="absolute bottom-0 left-16 right-3 h-0.5 bg-yellow-500"></div>
                  )}
                </div>
              </div>

              <div className="relative">
                <div
                  className={`flex items-center py-3 px-6 cursor-pointer ${
                    activePage === "customization"
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleNavigation("customization")}
                >
                  <div className="w-10 flex justify-start">
                    {activePage === "customization" && (
                      <img src={discIcon} alt="disc" className="w-6 h-6" />
                    )}
                  </div>
                  <span>Customization</span>
                  {activePage === "customization" && (
                    <div className="absolute bottom-0 left-16 right-3 h-0.5 bg-yellow-500"></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Settings at bottom */}
          <div
            className="px-6 py-6 flex items-center cursor-pointer"
            onClick={() => handleNavigation("settings")}
          >
            {/* <Settings className="mr-2" size={20} /> */}
            <img src={settingsIcon} alt="disc" className="w-6 h-6 mr-3" />
            <span>Settings</span>
          </div>
          {/* </div> */}
        </div>

        {/* Main content area */}
        <div
          className={`${activePage === "statistics" ? "flex-1" : "flex-1"} p-3`}
        >
          {activePage === "statistics" && (
            <div className="flex">
              {/* Statistics left content */}
              <div className="flex-1">
                {/* Level and progress */}
                <div className="flex items-center mb-6">
                  <div className="relative w-20 h-20 flex items-center justify-center border-2 border-white rounded-full">
                    <div className="relative w-16 h-16 flex items-center justify-center border-2 border-[#6D6D99] rounded-full">
                      <span className="text-2xl">{playerData.level}</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="text-sm text-white">
                      {playerData.level}/{playerData.maxLevel}
                    </div>
                    <div className="h-5 bg-white rounded-full mt-2">
                      <div
                        className="h-full bg-[#6D6D99] rounded-full"
                        style={{
                          width: `${
                            (playerData.level / playerData.maxLevel) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="ml-6">
                  {/* About me */}
                  <div className="mb-8">
                    <h2 className="text-xl mb-4 text-white">About Me</h2>
                    <div className="bg-[#6D6D99]/30 bg-opacity-70 p-6 rounded-xl">
                      {playerData.about}
                    </div>
                  </div>

                  {/* Grades section */}
                  <div className="flex mb-8 space-x-6">
                    <div className="flex-1">
                      <div className="flex mb-2">
                        <div className="w-12 h-12 bg-[#6D6D99]/30 flex items-center justify-center">
                          <span className="font-bold">SS</span>
                        </div>
                        <div className="ml-4 flex items-center">
                          {playerData.grades.ss}
                        </div>
                      </div>
                      <div className="flex mb-2">
                        <div className="w-12 h-12 bg-[#6D6D99]/30 flex items-center justify-center">
                          <span className="font-bold">S</span>
                        </div>
                        <div className="ml-4 flex items-center">
                          {playerData.grades.s}
                        </div>
                      </div>
                      <div className="flex">
                        <div className="w-12 h-12 bg-[#6D6D99]/30 flex items-center justify-center">
                          <span className="font-bold">A</span>
                        </div>
                        <div className="ml-4 flex items-center">
                          {playerData.grades.a}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex mb-2">
                        <div className="w-12 h-12 bg-[#6D6D99]/30 flex items-center justify-center">
                          <span className="font-bold">SS</span>
                        </div>
                        <div className="ml-4 flex items-center">
                          {playerData.grades.ss}
                        </div>
                      </div>
                      <div className="flex mb-2">
                        <div className="w-12 h-12 bg-[#6D6D99]/30 flex items-center justify-center">
                          <span className="font-bold">S</span>
                        </div>
                        <div className="ml-4 flex items-center">
                          {playerData.grades.s}
                        </div>
                      </div>
                      <div className="flex">
                        <div className="w-12 h-12 bg-[#6D6D99]/30 flex items-center justify-center">
                          <span className="font-bold">A</span>
                        </div>
                        <div className="ml-4 flex items-center">
                          {playerData.grades.a}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right stats panel */}
              <div className="w-[45%] p-6">
                <div className="bg-[#6D6D99]/30 bg-opacity-50 p-6 rounded relative text-lg before:content-[''] before:absolute before:inset-[6px] before:rounded before:border before:border-white">
                  <div className="space-y-2">
                    <div className="flex justify-between py-2">
                      <span>Global Ranking</span>
                      <span className="text-white">
                        #{playerData.rankings.global}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Country Ranking</span>
                      <span className="text-white">
                        #{playerData.rankings.country}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Ranked Score</span>
                      <span className="text-white">
                        {playerData.rankings.rankedScore.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Hit Accuracy</span>
                      <span className="text-white">
                        {playerData.rankings.hitAccuracy}%
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Play Count</span>
                      <span className="text-white">
                        {playerData.rankings.playCount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Total Score</span>
                      <span className="text-white">
                        {playerData.rankings.totalScore.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Total Hits</span>
                      <span className="text-white">
                        {playerData.rankings.totalHits.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Maximum Combo</span>
                      <span className="text-white">
                        {playerData.rankings.maxCombo.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Total Play Time</span>
                      <span className="text-white">
                        {playerData.rankings.totalPlayTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePage === "beatmaps" && (
            <div className="w-full">
              {/* Tabs */}
              <div className="flex mb-6 border-b border-[#6D6D99]">
                <div
                  className={`py-3 px-6 cursor-pointer relative ${
                    activeTab === "bookmarked"
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleTabChange("bookmarked")}
                >
                  <span>Bookmarked</span>
                  {activeTab === "bookmarked" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"></div>
                  )}
                </div>
                <div
                  className={`py-3 px-6 cursor-pointer relative ${
                    activeTab === "created"
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleTabChange("created")}
                >
                  <span>Created</span>
                  {activeTab === "created" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"></div>
                  )}
                </div>
              </div>

              {/* Content based on active tab */}
              {activeTab === "bookmarked" && (
                <div>
                  {/* Table Headers */}
                  <div className="grid grid-cols-12 gap-4 py-3 px-4 border-b border-[#6D6D99] text-sm">
                    <div className="col-span-4">Name</div>
                    <div className="col-span-2 text-center">
                      Difficulty{" "}
                      <span className="inline-block w-4 h-4 rounded-full bg-gray-600 text-center text-xs leading-4">
                        ?
                      </span>
                    </div>
                    <div className="col-span-2 text-center">
                      # of Difficulties
                    </div>
                    <div className="col-span-2 text-center">Statistics</div>
                    <div className="col-span-2 text-center">Saved</div>
                  </div>

                  {/* Beatmap Items */}
                  {playerData.beatmaps.bookmarked.map((beatmap) => (
                    <div
                      key={beatmap.id}
                      className="grid grid-cols-12 gap-4 py-4 px-4 items-center border-b border-[#6D6D99]/30"
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
                          <div className="text-sm text-gray-400">
                            {beatmap.artist}
                          </div>
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
                        <img
                          src={ellipseIcon}
                          alt="ellipse"
                          className="w-5 h-5"
                        />
                        {beatmap.level}
                      </div>
                      <div className="col-span-2 flex justify-center items-center space-x-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={clockIcon}
                            alt="Duration"
                            className="w-5 h-5"
                          />
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
                <div>
                  {/* Table Headers */}
                  <div className="grid grid-cols-12 gap-4 py-3 px-4 border-b border-[#6D6D99] text-sm">
                    <div className="col-span-4">Name</div>
                    <div className="col-span-2 text-center">
                      Difficulty{" "}
                      <span className="inline-block w-4 h-4 rounded-full bg-gray-600 text-center text-xs leading-4">
                        ?
                      </span>
                    </div>
                    <div className="col-span-2 text-center">
                      # of Difficulties
                    </div>
                    <div className="col-span-2 text-center">Statistics</div>
                    <div className="col-span-2 text-center">Saved</div>
                  </div>

                  {/* Beatmap Items */}
                  {playerData.beatmaps.bookmarked.map((beatmap) => (
                    <div
                      key={beatmap.id}
                      className="grid grid-cols-12 gap-4 py-4 px-4 items-center border-b border-[#6D6D99]/30"
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
                          <div className="text-sm text-gray-400">
                            {beatmap.artist}
                          </div>
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
                        <img
                          src={ellipseIcon}
                          alt="ellipse"
                          className="w-5 h-5"
                        />
                        {beatmap.level}
                      </div>
                      <div className="col-span-2 flex justify-center items-center space-x-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={clockIcon}
                            alt="Duration"
                            className="w-5 h-5"
                          />
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
          )}

          {activePage === "community" && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-2xl mb-4">Community</h2>
                {/* <p className="text-gray-300">
                  This section is currently empty.
                </p> */}
              </div>
            </div>
          )}

          {activePage === "customization" && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-2xl mb-4">Customization</h2>
                {/* <p className="text-gray-300">
                  This section is currently empty.
                </p> */}
              </div>
            </div>
          )}

          {activePage === "settings" && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-2xl mb-4">Settings</h2>
                {/* <p className="text-gray-300">
                  This section is currently empty.
                </p> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
