import { useState } from "react";
import { useNavigate } from "react-router-dom";

import leftArrowIcon from "../../assets/icons/leftArrowIcon.png";
import geoBg from "../../assets/images/backgrounds/geo_bg.png";

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

function CreatePostPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [tags, setTags] = useState([]);
  const [media, setMedia] = useState(null);

  return (
    <div className="min-h-screen bg-page-background text-white ">
      <button
        className=" mt-24 ml-6 flex gap-2 font-nova-square"
        onClick={() => navigate("/community")}
      >
        <img className="w-2 h-auto" src={leftArrowIcon} />
        Back
      </button>

      {/* Background image with opacity */}
      <div
        className="absolute inset-0 w-full h-full bg-repeat bg-left-top opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(${geoBg})` }}
      />

      <div className="py-4 px-8 md:px-12 font-nova-square">
        <h1 className="mt-4 text-3xl font-normal font-nova-square mb-8 text-white">
          Create a Post
        </h1>

        {/* Title Input */}
        <label className="block mb-4">
          <p className="m-0 text-lg font-normal">Title</p>
          <input
            type="text"
            className="w-full mt-2 px-4 py-2 rounded text-white font-normal focus:outline-none focus:ring-0 focus:border-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        {/* Description Input */}
        <label className="block mb-4">
          <p className="m-0 text-lg font-normal">Description</p>
          <textarea
            rows="4"
            className="w-full mt-2 px-4 py-2 h-40 rounded text-white font-normal focus:outline-none focus:ring-0 focus:border-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        {/* Add Tags */}
        <div className="mb-4">
          <span className="text-lg">Add Tags</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`px-3 py-1 rounded border ${
                  tags.includes(tag)
                    ? "bg-accent-yellow text-dark-purple border-accent-yellow"
                    : "text-light-grey border-light-grey"
                }`}
                onClick={() =>
                  setTags((prev) =>
                    prev.includes(tag)
                      ? prev.filter((t) => t !== tag)
                      : [...prev, tag]
                  )
                }
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Media Upload */}
        <div className="mb-8">
          <span className="text-lg block mb-2">Add Media</span>
          <input
            type="file"
            multiple
            accept="image/*,video/*,audio/*"
            className="text-sm"
            onChange={(e) => setMedia(e.target.files)}
          />
        </div>

        {/* Create Button */}
        <button
          className="mb-8 bg-accent-yellow text-dark-purple px-6 py-2 rounded-lg text-lg font-semibold"
          onClick={() => {
            // Placeholder action
            console.log({
              title,
              description,
              source,
              tags,
              media,
            });
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default CreatePostPage;
