import { useState } from "react";
import discIcon from "../../assets/icons/disc.svg";
import settingsIcon from "../../assets/icons/settings.svg";

import BeatmapsTab from "./BeatmapsTab";
import CommunityTab from "./CommunityTab";
import CustomizationTab from "./CustomizationTab";

const ProfilePage = () => {
  // Active page state
  const [activePage, setActivePage] = useState("statistics");

  // Mock data
  const [playerData, setPlayerData] = useState({
    name: "RhythmMaster",
    level: 35,
    maxLevel: 100,
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
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
  });

  // Handle navigation
  const handleNavigation = (page) => {
    setActivePage(page);
  };

  return (
    <div className="bg-[#2D294C] flex flex-col min-h-screen pt-16">
      {/* Top banner */}
      <div className="h-32 md:h-48 bg-gray-200"></div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row flex-1 text-white">
        {/* Left sidebar (visible on larger screens) */}
        <div className="md:flex md:w-64 md:border-r md:border-[#6D6D99] mt-5 mb-5 flex-col hidden">
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

        {/* Mobile navigation bar */}
        <div>
          {/* Profile info for mobile */}
          <div className="flex items-center md:hidden mb-3 pl-3">
            <div className="w-24 h-24 bg-teal-400 rounded-full border-4 border-[#2D294C] -mt-12"></div>
            <div className="mt-2 text-xl">[Name]</div>
          </div>

          <div className="md:hidden overflow-x-auto">
            <div className="flex items-center w-max py-2">
              <button
                className={`py-2 px-4 text-md whitespace-nowrap relative ${
                  activePage === "statistics"
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
                onClick={() => handleNavigation("statistics")}
              >
                <span className="relative inline-block">
                  Statistics
                  {activePage === "statistics" && (
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-yellow-500"></span>
                  )}
                </span>
              </button>

              <button
                className={`py-2 px-4 text-md whitespace-nowrap relative ${
                  activePage === "beatmaps"
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
                onClick={() => handleNavigation("beatmaps")}
              >
                <span className="relative inline-block">
                  Beatmaps
                  {activePage === "beatmaps" && (
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-yellow-500"></span>
                  )}
                </span>
              </button>

              <button
                className={`py-2 px-4 text-md whitespace-nowrap relative ${
                  activePage === "community"
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
                onClick={() => handleNavigation("community")}
              >
                <span className="relative inline-block">
                  Community
                  {activePage === "community" && (
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-yellow-500"></span>
                  )}
                </span>
              </button>

              <button
                className={`py-2 px-4 text-md whitespace-nowrap relative ${
                  activePage === "customization"
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
                onClick={() => handleNavigation("customization")}
              >
                <span className="relative inline-block">
                  Customization
                  {activePage === "customization" && (
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-yellow-500"></span>
                  )}
                </span>
              </button>
            </div>
          </div>
          <div className="mt-1 mx-2 border-b border-gray-600" />
        </div>

        {/* Main content area hidden md:flex */}
        <div className="flex-1 p-3">
          {activePage === "statistics" && (
            <div className="flex flex-col lg:flex-row w-full">
              {/* Statistics left content */}
              <div className="lg:flex-1 mb-6 lg:mb-0 lg:mr-6">
                {/* Level and progress */}
                <div className="flex items-center mb-6">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border-2 border-white rounded-full">
                    <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border-2 border-[#6D6D99] rounded-full">
                      <span className="text-lg md:text-2xl">
                        {playerData.level}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="text-sm text-white">
                      {playerData.level}/{playerData.maxLevel}
                    </div>
                    <div className="h-3 md:h-5 bg-white rounded-full mt-2">
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

                <div className="mb-8 md:ml-6">
                  {/* About me */}
                  <div className="mb-6 md:mb-8">
                    <h2 className="text-xl mb-2 text-white">About Me</h2>
                    <div className="bg-[#6D6D99]/30 bg-opacity-70 p-4 rounded-xl text-sm md:text-base">
                      {playerData.about}
                    </div>
                  </div>

                  {/* Grades section */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex-1 min-w-[100px]">
                      <div className="flex mb-2">
                        <div className="w-8 h-8 md:w-12 md:h-12 bg-[#6D6D99]/30 flex items-center justify-center">
                          <span className="font-bold">SS</span>
                        </div>
                        <div className="ml-2 md:ml-4 flex items-center">
                          {playerData.grades.ss}
                        </div>
                      </div>
                      <div className="flex mb-2">
                        <div className="w-8 h-8 md:w-12 md:h-12 bg-[#6D6D99]/30 flex items-center justify-center">
                          <span className="font-bold">S</span>
                        </div>
                        <div className="ml-2 md:ml-4 flex items-center">
                          {playerData.grades.s}
                        </div>
                      </div>
                      <div className="flex">
                        <div className="w-8 h-8 md:w-12 md:h-12 bg-[#6D6D99]/30 flex items-center justify-center">
                          <span className="font-bold">A</span>
                        </div>
                        <div className="ml-2 md:ml-4 flex items-center">
                          {playerData.grades.a}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 min-w-[100px]">
                      <div className="flex mb-2">
                        <div className="w-8 h-8 md:w-12 md:h-12 bg-[#6D6D99]/30 flex items-center justify-center">
                          <span className="font-bold">SS</span>
                        </div>
                        <div className="ml-2 md:ml-4 flex items-center">
                          {playerData.grades.ss}
                        </div>
                      </div>
                      <div className="flex mb-2">
                        <div className="w-8 h-8 md:w-12 md:h-12 bg-[#6D6D99]/30 flex items-center justify-center">
                          <span className="font-bold">S</span>
                        </div>
                        <div className="ml-2 md:ml-4 flex items-center">
                          {playerData.grades.s}
                        </div>
                      </div>
                      <div className="flex">
                        <div className="w-8 h-8 md:w-12 md:h-12 bg-[#6D6D99]/30 flex items-center justify-center">
                          <span className="font-bold">A</span>
                        </div>
                        <div className="ml-2 md:ml-4 flex items-center">
                          {playerData.grades.a}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right stats panel */}
              <div className="lg:w-[45%] md:p-6">
                <div className="bg-[#6D6D99]/30 bg-opacity-50 p-4 md:p-6 rounded relative text-sm md:text-lg before:content-[''] before:absolute before:inset-[4px] md:before:inset-[6px] before:rounded before:border before:border-white">
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

          {activePage === "beatmaps" && <BeatmapsTab />}

          {activePage === "community" && <CommunityTab />}

          {activePage === "customization" && <CustomizationTab />}

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
