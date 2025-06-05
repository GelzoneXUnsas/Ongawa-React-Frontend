import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import clockIcon from "../../assets/icons/clockIcon.svg";
import bpmIcon from "../../assets/icons/bpmIcon.svg";
import noteIcon from "../../assets/icons/notecountIcon.svg"
import sliderIcon from "../../assets/icons/sliderIcon.svg"
import toggleMusicIcon from "../../assets/icons/toggleMusicIcon.png"
import toggleMusicIconOff from "../../assets/icons/toggleMusicIconOff.png"
import { beatmaps } from "../../data/beatmaps";

export default function BeatmapPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [beatmap, setBeatmap] = useState(null);
  const [currentDifficulty, setCurrentDifficulty] = useState("easy");
  const [currentDifficultyData, setCurrentDifficultyData] = useState(null);
  
  // Find the beatmap based on ID from URL params
  useEffect(() => {
    // For now, we'll use the mockup data
    const beatmapId = parseInt(id);
    const found = beatmaps.find(b => b.id === beatmapId);
    if (found) {
      setBeatmap(found);
      setCurrentDifficulty("easy"); // Default to easy difficulty
      setCurrentDifficultyData(found.difficulties.easy);
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

  // Handle difficulty change
  const handleDifficultyChange = (diff) => {
    setCurrentDifficulty(diff);
    if (beatmap && beatmap.difficulties[diff]) {
      setCurrentDifficultyData(beatmap.difficulties[diff]);
    }
  }

  // Mock leaderboard data for the specific beatmap
  const leaderboardData = [
    { rank: 1, player: "Techno Maestro", score: "100,000" },
    { rank: 2, player: "Be4tM4ster", score: "98,947" },
    { rank: 3, player: "QuestCompoSer", score: "98,234" },
    { rank: 4, player: "sOnicH4rmony", score: "98,123" },
    { rank: 5, player: "melodicexplorer94", score: "97,351" }
  ];

  // If beatmap is not found
  if (!beatmap) {
    return (
      <div className="p-6 bg-beatmaps-background min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Beatmap not found</h2>
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
    <div className="p-6 bg-beatmaps-background min-h-screen text-white mt-16">
      {/* Back Button */}
      <span role="button"
        onClick={handleBack}
        className="mb-7 mt-3 md:mb-10 md:mt-7 flex items-center text-lg font-medium cursor-pointer"
      >
        <span className="text-yellow-accent">◄ Back</span>
      </span>

      <div className="max-w-5xl mx-auto">
        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Image */}
          <div className="md:flex-[0.3] md:max-w-sm">
            <img 
              src={beatmap.image} 
              alt={beatmap.title} 
              className="w-full aspect-square object-cover rounded-xl"
            />
          </div>

          {/* Details */}
          <div className="md:flex-[0.7] flex flex-col md:justify-between">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 mt-2 text-white">{beatmap.title}</h1>

              <div className="hidden md:flex rounded-md py-2 px-4 gap-6" style={{ backgroundColor: "rgba(128, 128, 128, 0.3)" }}>
                {["easy", "medium", "hard"].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => handleDifficultyChange(diff)}
                    className={`flex items-center justify-center transition-all bg-transparent border-none`}
                    // style={{ // temporary styling to override bootstrap
                    //   border: "none",
                    //   backgroundColor: "transparent"
                    // }}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-opacity ${
                        currentDifficulty === diff ? "opacity-100" : "opacity-60"
                      } ${getDifficultyColor(diff)}`}
                    >
                      <div className="w-7 h-7 rounded-full bg-beatmaps-background flex items-center justify-center">
                        <div className={`w-5 h-5 rounded-full ${getDifficultyColor(diff)}`}></div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
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
                <img src={bpmIcon} alt="BPM" className="w-7 h-7" />
                <span>{beatmap.bpm}</span>
              </div>
              <div className="flex items-center gap-1">
                <img src={noteIcon} alt="Plays" className="w-5 h-5" />
                <span>{currentDifficultyData.notes}</span>
              </div>
              <div className="flex items-center gap-1">
              <img src={sliderIcon} alt="Sliders" className="w-7 h-7" />
                <span>{currentDifficultyData.sliders}</span>
              </div>
            </div>
            
            {/* Difficulty */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-3 h-3 rounded-full ${getDifficultyColor(currentDifficulty)}`}></div>
              <span>{currentDifficultyData.level} | {currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)}</span>
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-4 items-center">
              <button
                className="bg-yellow-accent px-6 py-2 rounded-md font-medium text-black"
                // style={{ // temporary styling to override bootstrap
                //   border: "none",
                //   backgroundColor: "#CA9F28"
                // }}
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
        <div className="mb-16">
          <div className="flex flex-col gap-4">
            {/* HP Drain section */}
            <div className="flex items-center gap-2">
              <span className="font-medium w-36">HP Drain:</span>
              <span className="font-medium mr-3 w-5 text-right">{currentDifficultyData.hpDrain}</span>
              <Meter value={currentDifficultyData.hpDrain} max={10} />
            </div>

            {/* Approach Rate section */}
            <div className="flex items-center gap-2">
              <span className="font-medium w-36">Approach Rate:</span>
              <span className="font-medium mr-3 w-5 text-right">{currentDifficultyData.approachRate}</span>
              <Meter value={currentDifficultyData.approachRate} max={10} />
            </div>
          </div>
        </div>
        
        {/* Description */}
        <div className="mb-12">
          <p className="text-gray-300 leading-relaxed">
            {beatmap.description}
          </p>
        </div>
        
        {/* Source and Tags */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
        <div className="grid grid-cols-1 gap-4">
          {/* Source */}
          <div className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr]">
            <p className="font-medium mb-0">Source:</p>
            <div className="flex flex-wrap gap-2">
              {beatmap.source.map((src, index) => (
                <span key={index} className="text-gray-300">
                  {src}{index < beatmap.source.length - 1 ? "," : ""}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr]">
            <p className="font-medium mb-0">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {beatmap.tags.map((tag, index) => (
                <span key={index} className="text-gray-300">
                  {tag}{index < beatmap.tags.length - 1 ? "," : ""}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Global Leaderboard */}
        <div className="mb-12 mt-20">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Global Leaderboard:</h2>
          <div className="w-full h-[400px] overflow-y-auto no-scrollbar">
            {/* Table Head */}
            <div className="grid grid-cols-12 gap-4 py-3 px-4 border-t border-b text-sm sticky top-0 z-10">
              <div className="col-span-2 text-left text-gray-300 text-base">Rank</div>
              <div className="col-span-7 text-left text-gray-300 text-base">Player</div>
              <div className="col-span-3 text-right text-gray-300 text-base">Score</div>
            </div>

            {/* Table Rows */}
            {leaderboardData.map((entry) => (
              <div
                key={entry.rank}
                className="grid grid-cols-12 gap-4 py-3 px-4 items-center"
              >
                <div className="col-span-2 flex items-center text-white font-medium">
                  <span className="text-xs">#</span>
                  <span>{entry.rank}</span>
                </div>
                <div className="col-span-7 text-yellow-accent font-medium">{entry.player}</div>
                <div className="col-span-3 text-right text-white">{entry.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const Meter = ({ value, max }) => {
  const percentage = (value / max) * 100;
  return (
    <div className="w-[360px] bg-white rounded-full h-4 overflow-hidden">
      <div
        className="bg-light-purple h-full rounded-full transition-all duration-300 ease-in-out"
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
