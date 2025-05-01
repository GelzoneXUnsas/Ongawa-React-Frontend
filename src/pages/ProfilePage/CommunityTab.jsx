import { useState } from "react";

import artist1Image from "../../assets/images/featuredArtists/artist1.jpg";

const CommunityTab = () => {
  const [activeTab, setActiveTab] = useState("interacted");

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
      },
      {
        id: 2,
        name: "Morem ipsum dolor",
        author: "Techno Maestro",
        authorImg: artist1Image,
        comments: 4,
        date: "2 hr. ago",
      },
      {
        id: 3,
        name: "Morem ipsum dolor",
        author: "Techno Maestro",
        authorImg: artist1Image,
        comments: 4,
        date: "2 hr. ago",
      },
      {
        id: 4,
        name: "Morem ipsum dolor",
        author: "Techno Maestro",
        authorImg: artist1Image,
        comments: 4,
        date: "2 hr. ago",
      },
      {
        id: 5,
        name: "Morem ipsum dolor",
        author: "Techno Maestro",
        authorImg: artist1Image,
        comments: 4,
        date: "2 hr. ago",
      },
      {
        id: 6,
        name: "Morem ipsum dolor",
        author: "Techno Maestro",
        authorImg: artist1Image,
        comments: 4,
        date: "2 hr. ago",
      },
      {
        id: 7,
        name: "Morem ipsum dolor",
        author: "Techno Maestro",
        authorImg: artist1Image,
        comments: 4,
        date: "2 hr. ago",
      },
      {
        id: 8,
        name: "Morem ipsum dolor",
        author: "Techno Maestro",
        authorImg: artist1Image,
        comments: 4,
        date: "2 hr. ago",
      },
      {
        id: 9,
        name: "Morem ipsum dolor",
        author: "Techno Maestro",
        authorImg: artist1Image,
        comments: 4,
        date: "2 hr. ago",
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
  };

  return (
    <div className="bg-[#2D294C] p-6 h-full">
      {/* Tabs */}
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
                ? "font-medium underline underline-offset-8 decoration-yellow-500 decoration-2"
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
                ? "font-medium underline underline-offset-8 decoration-yellow-500 decoration-2"
                : ""
            }
          >
            Created
          </span>
        </div>
      </div>

      {/* Content based on active tab */}

      {activeTab === "interacted" && (
        <div className="w-full h-[450px] overflow-y-auto no-scrollbar">
          {/* Table Headers */}
          <div className="grid grid-cols-12 gap-4 py-3 px-4 border-b border-[#6D6D99] text-sm sticky top-0 bg-[#2D294C] z-10">
            <div className="col-span-4 text-lg">Name</div>
            <div className="col-span-4 text-center text-lg">Author</div>
            <div className="col-span-2 text-center text-lg">Comments</div>
            <div className="col-span-2 text-center text-lg">Date</div>
          </div>

          {/* Table Rows */}
          {communityData.interacted.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-4 py-5 px-4 items-center"
            >
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
              <div className="col-span-2 text-center">{item.comments}</div>
              <div className="col-span-2 text-center text-gray-300">
                {item.date}
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
            <div className="col-span-4 text-center text-lg">Bookmarked</div>
            <div className="col-span-2 text-center text-lg">Comments</div>
            <div className="col-span-2 text-center text-lg">Date</div>
          </div>

          {/* Table Rows */}
          {communityData.created.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-4 py-5 px-4 items-center"
            >
              <div className="col-span-4 text-white">{item.name}</div>
              <div className="col-span-4 text-center h-8">
                {item.bookmarked}
              </div>
              <div className="col-span-2 text-center">{item.comments}</div>
              <div className="col-span-2 text-center text-gray-300">
                {item.date}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityTab;
