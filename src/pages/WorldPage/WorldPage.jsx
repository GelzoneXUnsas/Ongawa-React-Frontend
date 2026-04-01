import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CommunityReply from "../../components/CommunityReply/CommunityReply";

import clockIcon from "../../assets/icons/clockIcon.svg";
import bpmIcon from "../../assets/icons/bpmIcon.svg";
import ellipseIcon from "../../assets/icons/ellipse.svg";
import redRectangleIcon from "../../assets/icons/rectangleRed.png";
import greenRectangleIcon from "../../assets/icons/rectangleGreen.png";

import geoBg from "../../assets/images/backgrounds/geo_bg.png";

import { worlds } from "../../data/worlds";

export default function BeatmapPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [world, setWorld] = useState(null);

  const [comments, setComments] = useState([
    {
      id: 101,
      parentId: null,
      replyThreadParentId: null,
      author: "Lior Mizrahi",
      profilePicture: null, // Placeholder if no image
      dateCreated: "June 13, 2025",
      text: "This map flow is incredible!",
    },
    {
      id: 201,
      parentId: 101,
      replyThreadParentId: 101,
      author: "Samira Khan",
      profilePicture: null,
      dateCreated: "June 14, 2025",
      text: "Agreed, especially the transition at 0:45.",
    },
    {
      id: 102,
      parentId: null,
      replyThreadParentId: null,
      author: "Takeshi Nakamura",
      profilePicture: null,
      dateCreated: "June 13, 2025",
      text: "Can't wait to try the hard difficulty.",
    },
  ]);

  const handleBack = () => {
    navigate(-1);
  };

  // Find the beatmap based on ID from URL params
  useEffect(() => {
    // For now, we'll use the mockup data
    const beatmapId = parseInt(id);
    const found = worlds.find((b) => b.id === beatmapId);
    if (found) {
      setWorld(found);
    }
  }, [id]);

  // If world is not found
  if (!world) {
    return (
      <div className="p-6 bg-gradient-b from-main-dark to-multi-off-black min-h-screen text-white flex items-center justify-center">
        {/* Background Image Elements */}
        <div
          className="absolute inset-0 w-full h-full bg-repeat bg-left-top opacity-10 pointer-events-none"
          style={{ backgroundImage: `url(${geoBg})` }}
        />
        <div className="text-center">
          <h2 className="text-2xl mb-4">World not found</h2>
          <span
            onClick={handleBack}
            className="text-white px-6 py-2 flex items-center justify-center cursor-pointer"
          >
            <span className="mr-2 text-yellow-accent">◄ Back</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-b from-main-dark to-multi-off-black min-h-screen text-white mt-16">
      {/* Background Image Elements */}
      <div
        className="absolute inset-0 w-full h-full bg-repeat bg-left-top opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(${geoBg})` }}
      />
      {/* Heading Image */}
      <div className="relative h-[50vh] w-full border-b border-main-accent mb-4">
        {/* Top Image */}
        <img
          src={world.image} // assuming world has an imageUrl property
          alt={world.name}
          className="w-full h-full object-cover"
        />

        {/* Back Button */}
        <span
          role="button"
          onClick={handleBack}
          className="absolute top-6 left-6 md:top-14 md:left-14 flex items-center text-lg font-medium font-mukta-mahee cursor-pointer"
        >
          <span className="bg-black/50 px-[10px] py-[6px] rounded-[5px] text-main-accent">
            ◄ Back
          </span>
        </span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col px-6 md:px-24">
        {/* Intro Section */}
        <section className="flex flex-col gap-6">
          <h1 className="text-4xl mb-2 font-nova-square font-medium text-white">
            {world.title}
          </h1>

          {/* Musician Info */}
          <div className="flex flex-col gap-8 md:px-10">
            {/* Musician name and image */}
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={world.artistImage}
                  alt={world.artist}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-gray-300 font-nova-square">
                {world.artist}
              </span>
            </div>

            {/* Musician Bio */}
            <div>
              <p className="text-gray-300 leading-relaxed font-roboto">
                {world.artistBio}
              </p>
            </div>
          </div>
        </section>

        {/* Discography Section */}
        <section className="my-6">
          <h2 className="text-3xl font-nova-square font-medium mb-6 text-white">
            Discography
          </h2>

          {/* Beatmaps List */}
          <div className="flex flex-col gap-6 md:px-10">
            {world.discography.map((track, index) => (
              <div
                key={index}
                className="flex rounded-xl gap-4 items-center justify-between hover:scale-[1.01] transition-transform duration-300"
              >
                <div className="flex gap-4">
                  {/* Album Cover */}
                  <img
                    src={track.image}
                    alt={track.title}
                    className="w-24 h-24 object-cover rounded-md"
                  />

                  {/* Text Info */}
                  <div className="flex flex-col justify-center gap-1">
                    <h3 className="text-xl font-nova-square text-white font-light m-0">
                      {track.title}
                    </h3>
                    <p className="text-gray-300 font-roboto text-sm m-0">
                      {track.artist}
                    </p>
                    <p className="text-gray-300 font-roboto text-sm m-0">
                      Mapped: {track.mappedBy}
                    </p>
                  </div>
                </div>

                {/* Difficulty range */}
                <div className="hidden md:flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <img
                      src={greenRectangleIcon}
                      alt="Duration"
                      className="w-2"
                    />
                    <span>{track.difficulties.easy.level}</span>
                  </div>
                  -
                  <div className="flex items-center gap-1">
                    <img
                      src={redRectangleIcon}
                      alt="Duration"
                      className="w-2"
                    />
                    <span>{track.difficulties.hard.level}</span>
                  </div>
                </div>

                {/* HP drain */}
                <div className="hidden md:flex items-center gap-2">
                  <img src={ellipseIcon} alt="Duration" className="w-5" />
                  {/* this part needs to be thought out. do we want an average hpDrain from all difficulties or a range? */}
                  <span>{track.difficulties.easy.hpDrain}</span>
                </div>

                {/* Duration and BPM */}
                <div className="hidden md:flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <img src={clockIcon} alt="Duration" className="w-5 h-5" />
                    <span>{track.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <img src={bpmIcon} alt="BPM" className="w-7 h-7" />
                    <span>{track.bpm}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Musician Notes Section */}
        <section className="flex flex-col gap-6 my-6">
          <h3 className="text-3xl mb-2 font-nova-square font-medium text-white">
            From the Musician
          </h3>

          {/* Musician Remarks */}
          <div className="md:flex md:gap-8 md:px-10 items-start">
            {/* Musician image */}
            <div className="w-32 md:w-36 bg-blue-600 rounded-xl flex overflow-hidden float-left md:float-none mr-4 md:mr-0 my-2 flex-shrink-0">
              <img
                src={world.artistImage}
                alt={world.artist}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Musician words */}
            <div className="flex-1">
              <p className="text-gray-300 leading-relaxed font-roboto">
                {world.artistQuote}
              </p>
            </div>
          </div>
        </section>

        {/* Comments Section */}
        {/* Post Replies */}
        <section className="mt-10 pt-6">
          <h3 className="text-3xl mb-6 font-nova-square font-medium text-white">
            Comments
          </h3>

          {/* Reply Bar */}
          <div className="mt-4">
            <div className="relative p-1 border border-main-midtone">
              <input
                type="text"
                placeholder="Add a Comment"
                style={{
                  background: "linear-gradient(to right, #EFECE6, #DDD0B9)",
                  margin: 0,
                }}
                className="block w-full px-4 py-2 pr-24 font-nova-square text-multi-off-black italic placeholder-main-off-black focus:outline-none focus:ring-0 focus:border-light-grey rounded-none leading-none"
              />
              <button className="absolute top-[10px] right-3 px-4 py-2 md:px-7 bg-main-accent text-dark-purple font-nova-square rounded-none">
                Reply
              </button>
            </div>
          </div>

          {/* Post Replies */}
          <div className="mt-6">
            <div>
              {comments
                .filter((r) => r.parentId === null)
                .map((reply) => (
                  <div
                    key={reply.id}
                    className="border-t border-light-grey pt-4"
                  >
                    <CommunityReply
                      key={reply.id}
                      reply={reply}
                      allReplies={comments}
                    />
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
