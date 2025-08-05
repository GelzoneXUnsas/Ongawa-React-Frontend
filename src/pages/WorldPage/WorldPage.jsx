import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { worlds } from "../../data/worlds";

export default function BeatmapPage() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [world, setWorld] = useState(null);

  const handleBack = () => {
    navigate(-1);
  };

  // Find the beatmap based on ID from URL params
  useEffect(() => {
    // For now, we'll use the mockup data
    const beatmapId = parseInt(id);
    const found = worlds.find(b => b.id === beatmapId);
    if (found) {
      setWorld(found);
    }
  }, [id]);

  // If world is not found
  if (!world) {
    return (
      <div className="p-6 bg-beatmaps-background min-h-screen text-white flex items-center justify-center">
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

    <div className="bg-beatmaps-background min-h-screen text-white mt-16">
      {/* Heading Image */}
      <div className="relative h-[50vh] w-full border-b border-yellow-accent">
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
          <span className="bg-black/50 px-[10px] py-[6px] rounded-[5px] text-yellow-accent">◄ Back</span>
        </span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col px-6 md:px-24">

        {/* Intro Section */}
        <section className="flex flex-col gap-6">
          <h1 className="text-4xl mb-2 font-nova-square font-medium text-white">{world.title}</h1>

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
              <span className="text-gray-300 font-nova-square">{world.artist}</span>
            </div>
            
            {/* Musician Bio */}
            <div>
              <p className="text-gray-300 leading-relaxed font-roboto">{world.artistBio}</p>
            </div>
          </div>
        </section>


        {/* Discography Section */}
        <section className="my-6">
          <h2 className="text-3xl font-nova-square font-medium mb-6 text-white">Discography</h2>

          {/* Beatmaps List */}
          <div className="flex flex-col gap-6 md:px-10">
            {world.discography.map((track, index) => (
              <div
                key={index}
                className="flex rounded-xl gap-4 items-center hover:scale-[1.01] transition-transform duration-300"
              >
                {/* Album Cover */}
                <img
                  src={track.image}
                  alt={track.title}
                  className="w-24 h-24 object-cover rounded-md"
                />

                {/* Text Info */}
                <div className="flex flex-col justify-center gap-1">
                  <h3 className="text-xl font-nova-square text-white font-light m-0">{track.title}</h3>
                  <p className="text-gray-300 font-roboto text-sm m-0">{track.artist}</p>
                  <p className="text-gray-300 font-roboto text-sm m-0">Mapped: {track.mappedBy}</p>
                </div>


                {/* Difficulty range */}

                {/* HP drain */}

                {/* Duration and BPM */}

                
              </div>
            ))}
          </div>
        </section>

        {/* Musician Notes Section */}
        <section className="flex flex-col gap-6 my-6">
          <h3 className="text-3xl mb-2 font-nova-square font-medium text-white">From the Musician</h3>

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
              <p className="text-gray-300 leading-relaxed font-roboto">{world.artistQuote}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
