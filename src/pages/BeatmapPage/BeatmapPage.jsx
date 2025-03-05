import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import cover1 from "../../assets/images/musicCovers/celticwhispersballadHD.png";
import cover2 from "../../assets/images/musicCovers/neonpulsesymHD.png";
import cover3 from "../../assets/images/musicCovers/celestialechoesHD.png";
import cover4 from "../../assets/images/musicCovers/nocturnalpursuitHD.png";

import clockIcon from "../../assets/icons/clockIcon.svg";
import bpmIcon from "../../assets/icons/bpmIcon.svg";
import noteIcon from "../../assets/icons/notecountIcon.svg"
import sliderIcon from "../../assets/icons/sliderIcon.svg"
import toggleMusicIcon from "../../assets/icons/toggleMusicIcon.png"
import toggleMusicIconOff from "../../assets/icons/toggleMusicIconOff.png"

const beatmaps = [
  {
    id: 1,
    title: "Neon Pulse Symphony",
    artist: "Techno Maestro",
    mappedBy: "Techno Maestro",
    image: cover1,
    difficulty: "medium",
    likes: 0,
    plays: 0,
    downloads: 61,
    duration: "3:47",
    hpDrain: 5,
    approachRate: 7,
    level: "2.3",
    bpm: "113",
    notes: "185",
    sliders: "61",
    description: "Dive into the cutting-edge realm of Techno Adventures World, where futuristic technology meets thrilling escapades. Explore cyber landscapes, master advanced gadgets, and overcome digital challenges in this electrifying journey through the next frontier.",
    source: ["Techno", "Adventures", "World"],
    tags: ["Neon", "Synth wave"]
  },
  {
    id: 2,
    title: "Celtic Whispers Ballad",
    artist: "Folklore Minstrel",
    mappedBy: "Folklore Minstrel",
    image: cover2,
    difficulty: "hard",
    likes: 2,
    plays: 0,
    downloads: 43,
    duration: "4:12",
    hpDrain: 8,
    approachRate: 9,
    level: "4.7",
    bpm: "113",
    notes: "185",
    sliders: "61",
    description: "Journey through ancient Celtic landscapes with this mystical ballad that weaves tales of legend and lore. Each note carries the whispers of ancient druids and the echoes of forgotten rituals, creating an immersive experience that transcends time.",
    source: ["Celtic", "Mythology", "Ballads"],
    tags: ["Celtic", "Folk", "Mystical"]
  },
  {
    id: 3,
    title: "Celestial Echoes",
    artist: "Celestial Harmonics",
    mappedBy: "StarNavigator",
    image: cover3,
    difficulty: "easy",
    likes: 0,
    plays: 1,
    downloads: 87,
    duration: "5:23",
    hpDrain: 6,
    approachRate: 6,
    level: "3.5",
    bpm: "113",
    notes: "185",
    sliders: "61",
    description: "Float through the cosmos with this ethereal symphony that captures the harmony of the stars. Each beat resonates with the pulse of distant galaxies, creating a celestial journey that will transport you beyond the boundaries of our universe.",
    source: ["Astronomical", "Ambient", "Space"],
    tags: ["Cosmic", "Ambient", "Ethereal"]
  },
  {
    id: 4,
    title: "Neon Pulse Symphony",
    artist: "ShadowWeaver",
    mappedBy: "ShadowWeaver",
    image: cover4,
    difficulty: "medium",
    likes: 0,
    plays: 0,
    downloads: 52,
    duration: "4:05",
    hpDrain: 6,
    approachRate: 8,
    level: "3.8",
    bpm: "113",
    notes: "185",
    sliders: "61",
    description: "Enter the shadows with this intense beat-driven track that follows a mysterious chase through moonlit streets. The rhythm accelerates and decelerates, mimicking the heart-pounding tension of pursuit and escape in the darkness of night.",
    source: ["Urban", "Night", "Mystery"],
    tags: ["Dark", "Intense", "Urban"]
  },
  {
    id: 5,
    title: "Tokyo, Japan",
    artist: "Liam Burnett-Blue",
    mappedBy: "Unsplash",
    image: cover2,
    difficulty: "medium",
    likes: 0,
    plays: 0,
    downloads: 38,
    duration: "3:29",
    hpDrain: 5,
    approachRate: 7,
    level: "3.0",
    bpm: "110",
    notes: "155",
    sliders: "31",
    description: "Experience the vibrant energy of Tokyo's cityscape in this dynamic electronic track. The melody captures the neon-lit streets, bustling crowds, and serene temple gardens that define Japan's captivating capital city.",
    source: ["Urban", "Japanese", "Electronic"],
    tags: ["Tokyo", "City", "Electronic"]
  },
  {
    id: 6,
    title: "Flowering Blossoms",
    artist: "Meric Dağlı",
    mappedBy: "meric",
    image: cover4,
    difficulty: "medium",
    likes: 0,
    plays: 0,
    downloads: 31,
    duration: "4:43",
    hpDrain: 4,
    approachRate: 5,
    level: "2.8",
    bpm: "113",
    notes: "120",
    sliders: "50",
    description: "A gentle yet intricate melody that unfolds like petals opening to the morning sun. This track combines traditional instruments with subtle electronic elements to create a soundscape as delicate and complex as nature itself.",
    source: ["Nature", "Seasonal", "Organic"],
    tags: ["Floral", "Spring", "Peaceful"]
  },
];

export default function BeatmapPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [beatmap, setBeatmap] = useState(null);
  
  // Find the beatmap based on ID from URL params
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For now, we'll use the mockup data
    const beatmapId = parseInt(id);
    const found = beatmaps.find(b => b.id === beatmapId);
    if (found) {
      setBeatmap(found);
    }
  }, [id]);

  // Handle back button
  const handleBack = () => {
    navigate(-1);
  };

  const [musicIsPlaying, setMusicIsPlaying] = useState(true);
  // const audioRef = useRef(new Audio("/path-to-your-audio-file.mp3"));
  const toggleMusic = () => {
    // if (musicIsPlaying) {
    //   audioRef.current.pause();
    // } else {
    //   audioRef.current.play();
    // }
    setMusicIsPlaying(!musicIsPlaying);
  };

  // If beatmap is not found
  if (!beatmap) {
    return (
      <div className="p-6 bg-[#2D294C] min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Beatmap not found</h2>
          <span 
            onClick={handleBack}
            className="bg-[#6D6D99] text-white px-6 py-2 rounded-md flex items-center justify-center cursor-pointer"
          >
            <span className="mr-2">◄</span> Back
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#2D294C] min-h-screen text-white mt-16">
      {/* Back Button */}
      <span role="button"
        onClick={handleBack}
        className="mb-6 flex items-center text-lg font-medium hover:text-gray-300 transition cursor-pointer"
      >
        <span className="mr-2">◄</span> Back
      </span>

      <div className="max-w-4xl mx-auto">
        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Image */}
          <div className="md:w-1/3">
            <img 
              src={beatmap.image} 
              alt={beatmap.title} 
              className="w-full aspect-square object-cover rounded-xl"
            />
          </div>

          {/* Details */}
          <div className="md:w-2/3">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{beatmap.title}</h1>
            
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
                <span className="text-xs">{beatmap.artist.charAt(0)}</span>
              </div>
              <span className="text-gray-300">{beatmap.artist}</span>
            </div>
            
            <p className="text-gray-400 mb-4">Mapped: {beatmap.mappedBy}</p>
            
            {/* Stats */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-1">
                <img src={clockIcon} alt="Duration" className="w-5 h-5" />
                <span>{beatmap.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <img src={bpmIcon} alt="Likes" className="w-7 h-7" />
                <span>{beatmap.bpm}</span>
              </div>
              <div className="flex items-center gap-1">
                <img src={noteIcon} alt="Plays" className="w-5 h-5" />
                <span>{beatmap.notes}</span>
              </div>
              <div className="flex items-center gap-1">
              <img src={sliderIcon} alt="Plays" className="w-7 h-7" />
                <span>{beatmap.sliders}</span>
              </div>
            </div>
            
            {/* Difficulty */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-3 h-3 rounded-full ${getDifficultyColor(beatmap.difficulty)}`}></div>
              <span>{beatmap.level} | {beatmap.difficulty.charAt(0).toUpperCase() + beatmap.difficulty.slice(1)}</span>
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-4">
              <button
                className="bg-[#2D294C] hover:bg-[#616088] transition px-6 py-2 rounded-md font-medium border border-gray-500"
                style={{
                  border: "none",
                  backgroundColor: "#2D294C"
                }} 
              >
                Download
              </button>
              {/* <button
                className="bg-[#3D3854] hover:bg-[#4A445E] transition p-2 rounded-md"
                style={{ border: "none"}} 
              >
                <span className="text-2xl">♫</span>
              </button> */}
              <img
                className="h-9 cursor-pointer"
                src={musicIsPlaying ? toggleMusicIcon : toggleMusicIconOff}
                alt="Music Toggle"
                onClick={toggleMusic}
              />
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-[#4A4667] my-8"></div>
        
        {/* Game stats */}
        <div className="mb-8">
          <div className="flex flex-col gap-4">
            {/* HP Drain section */}
            <div className="flex items-center gap-2">
              <span className="font-medium w-36">HP Drain:</span>
              <span className="font-medium mr-3">{beatmap.hpDrain}</span>
              <ProgressBar value={beatmap.hpDrain} max={10} />
            </div>

            {/* Approach Rate section */}
            <div className="flex items-center gap-2">
              <span className="font-medium w-36">Approach Rate:</span>
              <span className="font-medium mr-3">{beatmap.approachRate}</span>
              <ProgressBar value={beatmap.approachRate} max={10} />
            </div>
          </div>
        </div>
        
        {/* Description */}
        <div className="mb-8">
          <p className="text-gray-300 leading-relaxed">
            {beatmap.description}
          </p>
        </div>
        
        {/* Source and Tags */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
        <div className="grid grid-cols-1 gap-4">
          {/* Source */}
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium mb-0">Source:</h3>
            <div className="flex flex-wrap gap-2">
              {beatmap.source.map((src, index) => (
                <span key={index} className="text-gray-300">
                  {src}{index < beatmap.source.length - 1 ? "," : ""}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium mb-0">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {beatmap.tags.map((tag, index) => (
                <span key={index} className="text-gray-300">
                  {tag}{index < beatmap.tags.length - 1 ? "," : ""}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const ProgressBar = ({ value, max }) => {
  const percentage = (value / max) * 100;
  return (
    <div className="w-50 bg-white rounded-full h-4">
      <div 
        className="bg-[#6D6D99] rounded-full h-4" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

// Helper function to get difficulty color
const getDifficultyColor = (difficulty) => {
  switch(difficulty) {
    case "easy": return "bg-green-500";
    case "medium": return "bg-yellow-500";
    case "hard": return "bg-red-500";
    default: return "bg-gray-500";
  }
};
