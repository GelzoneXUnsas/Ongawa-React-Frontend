import { useState } from "react";

import artist1Image from "../../assets/images/featuredArtists/artist1.jpg";
import triangleDownIcon from "../../assets/icons/triangleDown.svg";

const CommunityTab = () => {
  const [activeTab, setActiveTab] = useState("interacted");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Mock data
  const communityData = {
    interacted: [
      {
        id: 1,
        name: "Morem ipsum dolor",
        author: "Techno Maestro",
        authorImg: artist1Image,
        comments: 4,
        date: "2 hr. ago",
        description:
          "Morem ipsum dolor orem ipsum dolor orem ipsum dolor orem ipsum dolor",
      },
      {
        id: 2,
        name: "Morem ipsum dolor",
        author: "Techno Maestro",
        authorImg: artist1Image,
        comments: 4,
        date: "2 hr. ago",
        description:
          "Morem ipsum dolor orem ipsum dolor orem ipsum dolor orem ipsum dolor",
      },
      {
        id: 3,
        name: "Morem ipsum dolor",
        author: "Techno Maestro",
        authorImg: artist1Image,
        comments: 4,
        date: "2 hr. ago",
        description:
          "Morem ipsum dolor orem ipsum dolor orem ipsum dolor orem ipsum dolor",
      },
      {
        id: 4,
        name: "Morem ipsum dolor",
        author: "Techno Maestro",
        authorImg: artist1Image,
        comments: 4,
        date: "2 hr. ago",
        description:
          "Morem ipsum dolor orem ipsum dolor orem ipsum dolor orem ipsum dolor",
      },
      {
        id: 5,
        name: "Morem ipsum dolor",
        author: "Techno Maestro",
        authorImg: artist1Image,
        comments: 4,
        date: "2 hr. ago",
        description:
          "Morem ipsum dolor orem ipsum dolor orem ipsum dolor orem ipsum dolor",
      },
      {
        id: 6,
        name: "Morem ipsum dolor",
        author: "Techno Maestro",
        authorImg: artist1Image,
        comments: 4,
        date: "2 hr. ago",
        description:
          "Morem ipsum dolor orem ipsum dolor orem ipsum dolor orem ipsum dolor",
      },
      {
        id: 7,
        name: "Morem ipsum dolor",
        author: "Techno Maestro",
        authorImg: artist1Image,
        comments: 4,
        date: "2 hr. ago",
        description:
          "Morem ipsum dolor orem ipsum dolor orem ipsum dolor orem ipsum dolor",
      },
      {
        id: 8,
        name: "Morem ipsum dolor",
        author: "Techno Maestro",
        authorImg: artist1Image,
        comments: 4,
        date: "2 hr. ago",
        description:
          "Morem ipsum dolor orem ipsum dolor orem ipsum dolor orem ipsum dolor",
      },
      {
        id: 9,
        name: "Morem ipsum dolor",
        author: "Techno Maestro",
        authorImg: artist1Image,
        comments: 4,
        date: "2 hr. ago",
        description:
          "Morem ipsum dolor orem ipsum dolor orem ipsum dolor orem ipsum dolor",
      },
    ],
    created: [
      {
        id: 1,
        name: "Morem ipsum dolor",
        bookmarked: 120,
        comments: 4,
        date: "2 hr. ago",
      },
      {
        id: 2,
        name: "Morem ipsum dolor",
        bookmarked: 120,
        comments: 4,
        date: "2 hr. ago",
      },
      {
        id: 3,
        name: "Morem ipsum dolor",
        bookmarked: 120,
        comments: 4,
        date: "2 hr. ago",
      },
      {
        id: 4,
        name: "Morem ipsum dolor",
        bookmarked: 120,
        comments: 4,
        date: "2 hr. ago",
      },
      {
        id: 5,
        name: "Morem ipsum dolor",
        bookmarked: 120,
        comments: 4,
        date: "2 hr. ago",
      },
      {
        id: 6,
        name: "Morem ipsum dolor",
        bookmarked: 120,
        comments: 4,
        date: "2 hr. ago",
      },
      {
        id: 7,
        name: "Morem ipsum dolor",
        bookmarked: 120,
        comments: 4,
        date: "2 hr. ago",
      },
      {
        id: 8,
        name: "Morem ipsum dolor",
        bookmarked: 120,
        comments: 4,
        date: "2 hr. ago",
      },
      {
        id: 9,
        name: "Morem ipsum dolor",
        bookmarked: 120,
        comments: 4,
        date: "2 hr. ago",
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
    <div className="bg-[#2D294C] h-full w-full">
      {/* Desktop Tabs */}
      <div className="hidden md:block p-6 pb-0">
        <div className="flex border-b border-[#6D6D99] pb-2 gap-8">
          <div
            className={`py-3 cursor-pointer relative text-lg ${
              activeTab === "interacted" ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={() => handleTabChange("interacted")}
          >
            <span
              className={
                activeTab === "interacted"
                  ? "underline underline-offset-8 decoration-yellow-500 decoration-2"
                  : ""
              }
            >
              Interacted
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
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden px-4 py-3">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-between w-full bg-[#6D6D99]/20 px-4 py-3 rounded-lg text-white"
          >
            <span className="text-lg">
              {activeTab === "interacted" ? "Interacted" : "Created"}
            </span>
            <img src={triangleDownIcon} alt="disc" className="w-6 h-6" />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#1D1D2E] rounded-lg shadow-lg z-20">
              <button
                onClick={() => handleTabChange("interacted")}
                className={`w-full text-left px-4 py-3 hover:bg-[#5A5A7B] rounded-t-lg ${
                  activeTab === "interacted" ? "text-yellow-500" : "text-white"
                }`}
              >
                Interacted
              </button>
              <button
                onClick={() => handleTabChange("created")}
                className={`w-full text-left px-4 py-3 hover:bg-[#5A5A7B] rounded-b-lg ${
                  activeTab === "created" ? "text-yellow-500" : "text-white"
                }`}
              >
                Created
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="px-4 md:px-6">
        {activeTab === "interacted" && (
          <div className="w-full h-[600px] md:h-[450px] overflow-y-auto no-scrollbar">
            {/* Desktop Table Headers */}
            <div className="hidden md:grid grid-cols-12 gap-4 py-3 px-4 border-b border-[#6D6D99] text-sm sticky top-0 bg-[#2D294C] z-10">
              <div className="col-span-4 text-lg">Name</div>
              <div className="col-span-4 text-center text-lg">Author</div>
              <div className="col-span-2 text-center text-lg">Comments</div>
              <div className="col-span-2 text-center text-lg">Date</div>
            </div>

            {/* Table Rows */}
            <div className="space-y-4 md:space-y-0 pt-4 md:pt-0">
              {communityData.interacted.map((item) => (
                <div key={item.id}>
                  {/* Desktop Row */}
                  <div className="hidden md:grid grid-cols-12 gap-4 py-5 px-4 items-center">
                    <div className="col-span-4 text-white">{item.name}</div>
                    <div className="col-span-4 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                        <img
                          src={item.authorImg}
                          alt="Author"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-gray-400">{item.author}</span>
                    </div>
                    <div className="col-span-2 text-center">
                      {item.comments}
                    </div>
                    <div className="col-span-2 text-center text-gray-300">
                      {item.date}
                    </div>
                  </div>

                  {/* Mobile Card */}
                  {/* p-4 */}
                  <div className="md:hidden rounded-lg">
                    {/* Author Info */}
                    <div className="flex pb-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <img
                          src={item.authorImg}
                          alt="Author"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium flex flex-wrap items-center pb-2">
                          <span>{item.author}</span>
                          {/* Date and Comments - styled differently based on screen size */}
                          <span className="hidden sm:inline mx-2">•</span>{" "}
                          {/* Bullet only shows on larger small screens */}
                          <div className="text-gray-400 text-sm sm:text-white sm:font-medium flex items-center flex-wrap sm:ml-0 w-full sm:w-auto">
                            <span>{item.date}</span>
                            <span className="mx-2">•</span>
                            <span>{item.comments} comments</span>
                          </div>
                        </div>
                        {/* <div className="text-gray-400 text-sm flex items-center">
                          <span>{item.date}</span>
                          <span className="mx-2">•</span>
                          <span>{item.comments} comments</span>
                        </div> */}
                        <div className="text-gray-300 text-sm leading-relaxed">
                          {item.description}
                        </div>
                      </div>
                    </div>
                    {/* <div className="text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "created" && (
          <div className="w-full h-[600px] md:h-[450px] overflow-y-auto no-scrollbar">
            {/* Desktop Table Headers */}
            <div className="hidden md:grid grid-cols-12 gap-4 py-3 px-4 border-b border-[#6D6D99] text-sm sticky top-0 bg-[#2D294C] z-10">
              <div className="col-span-4 text-lg">Name</div>
              <div className="col-span-4 text-center text-lg">Bookmarked</div>
              <div className="col-span-2 text-center text-lg">Comments</div>
              <div className="col-span-2 text-center text-lg">Date</div>
            </div>

            {/* Table Rows */}
            <div className="space-y-4 md:space-y-0 pt-4 md:pt-0">
              {communityData.created.map((item) => (
                <div key={item.id}>
                  {/* Desktop Row */}
                  <div className="hidden md:grid grid-cols-12 gap-4 py-5 px-4 items-center">
                    <div className="col-span-4 text-white">{item.name}</div>
                    <div className="col-span-4 text-center h-8">
                      {item.bookmarked}
                    </div>
                    <div className="col-span-2 text-center">
                      {item.comments}
                    </div>
                    <div className="col-span-2 text-center text-gray-300">
                      {item.date}
                    </div>
                  </div>

                  {/* Mobile Card */}
                  <div className="md:hidden bg-[#3A3559] rounded-lg p-4">
                    {/* Header with stats */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-white font-medium">{item.name}</div>
                      <div className="text-gray-400 text-sm">{item.date}</div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500 text-sm font-medium">
                            {item.bookmarked}
                          </span>
                          <span className="text-gray-400 text-sm ml-1">
                            bookmarked
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-300 text-sm font-medium">
                            {item.comments}
                          </span>
                          <span className="text-gray-400 text-sm ml-1">
                            comments
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityTab;
