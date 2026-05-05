import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService";
import { uploadFile } from "../../services/storageService";

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
  const [tags, setTags] = useState([]);
  const [media, setMedia] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!title.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      let mediaPointer;
      if (media && media.length > 0) {
        const file = media[0];
        const key = `posts/${Date.now()}-${file.name}`;
        mediaPointer = await uploadFile(file, key);
      }
      await createPost({ title, text: description, tags, mediaPointer });
      navigate("/community");
    } catch (err) {
      setError("Failed to create post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-main-off-black text-light-grey ">
      {/* Back Button */}
      <Link
        className="w-10 mt-24 ml-6 flex gap-2 font-nova-square"
        to="/community"
      >
        <img className="h-5 self-center" src={leftArrowIcon} />
        Back
      </Link>

      {/* Background image with opacity */}
      <div
        className="absolute inset-0 w-full h-full bg-repeat bg-left-top opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(${geoBg})` }}
      />

      <div className="py-4 px-8 md:px-12 font-nova-square">
        <h1 className="mt-4 text-3xl font-normal font-nova-square mb-8 text-light-grey">
          Create a Post
        </h1>

        {/* Title Input */}
        <label className="block mb-4">
          <p className="m-0 text-lg font-normal">Title</p>
          <input
            type="text"
            className="w-full mt-2 px-4 py-2 rounded text-khaki placeholder:text-khaki placeholder:italic font-normal focus:outline-none focus:ring-0 focus:border-white"
            style={{ backgroundColor: "#1A1816" }}
            placeholder="Title of Post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        {/* Description Input */}
        <label className="block mb-4">
          <p className="m-0 text-lg font-normal">Description</p>
          <textarea
            rows="4"
            className="w-full mt-2 px-4 py-2 h-40 rounded text-khaki placeholder:text-khaki placeholder:italic font-normal focus:outline-none focus:ring-0 focus:border-white"
            value={description}
            style={{ backgroundColor: "#1A1816" }}
            placeholder="Add Description"
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
                    ? "bg-main-accent text-dark-purple border-main-accent"
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
          className="mb-2 bg-main-accent font-nova-square text-dark-purple px-6 py-2 rounded-lg text-lg disabled:opacity-50"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Creating..." : "Create"}
        </button>
        {error && (
          <p className="mb-8 text-red-400 font-nova-square text-sm">{error}</p>
        )}
      </div>
    </div>
  );
}

export default CreatePostPage;
