import { useState } from "react";

const CustomizationTab = () => {
  const [profileData, setProfileData] = useState({
    name: "[Name]",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.",
  });

  const handleNameChange = (e) => {
    setProfileData({
      ...profileData,
      name: e.target.value,
    });
  };

  const handleAboutChange = (e) => {
    setProfileData({
      ...profileData,
      about: e.target.value,
    });
  };

  return (
    <div className="flex flex-col p-6 max-w-6xl mx-auto">
      {/* Profile/Banner Image Section */}
      <div className="flex flex-wrap items-end justify-between gap-5 mb-5">
        {/* Profile Picture */}
        <div className="flex items-end gap-5">
          <div className="w-24 h-24 bg-teal-400 rounded-full"></div>
          <button className="bg-[#3D3B63] hover:bg-[#4A4878] border-none hover:border-none text-white py-3 px-4 rounded-md mb-0">
            Change Profile Picture
          </button>
        </div>

        {/* Banner */}
        <div className="flex items-end gap-5">
          <div className="w-80 h-24 bg-gray-200"></div>
          <button className="bg-[#3D3B63] hover:bg-[#4A4878] border-none hover:border-none text-white py-3 px-4 rounded-md mb-0">
            Change Banner
          </button>
        </div>
      </div>

      {/* Name Section */}
      <div className="mb-5">
        <h2 className="text-2xl mb-4 text-white">Name</h2>
        <input
          type="text"
          value={profileData.name}
          onChange={handleNameChange}
          placeholder="Enter your display name"
          className="w-full p-4 rounded-md bg-[#3D3B63] text-white border-none"
          style={{ border: "none", background: "#3D3B63" }} // temporary (overwrite bootstrap styling?)
        />
      </div>

      {/* About Me Section */}
      <div className="mb-5">
        <h2 className="text-2xl mb-4 text-white">About Me</h2>
        <textarea
          value={profileData.about}
          onChange={handleAboutChange}
          placeholder="Write something about yourself..."
          className="w-full p-6 rounded-md bg-[#3D3B63] text-white border-none h-48 resize-none hover:border-none focus:border-none"
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-yellow-500 hover:bg-yellow-600 border-none hover:border-none text-white font-bold py-3 px-8 rounded-md">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default CustomizationTab;
