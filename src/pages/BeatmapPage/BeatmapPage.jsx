import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import clockIcon from "../../assets/icons/clockIcon.svg";
import bpmIcon from "../../assets/icons/bpmIcon.svg";
import noteIcon from "../../assets/icons/notecountIcon.svg"
import sliderIcon from "../../assets/icons/sliderIcon.svg"
import toggleMusicIcon from "../../assets/icons/toggleMusicIcon.png"
import toggleMusicIconOff from "../../assets/icons/toggleMusicIconOff.png"
import { beatmaps as localBeatmaps } from "../../data/beatmaps";
import { getSong, getSongBeatmaps, getLeaderboard } from "../../services/songService";
import { getComments, createComment } from "../../services/commentService";
import { getFileUrl } from "../../services/storageService";

import CommunityReply from "../../components/CommunityReply/CommunityReply";

export default function BeatmapPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [beatmap, setBeatmap] = useState(null);
  const [currentDifficulty, setCurrentDifficulty] = useState("easy");
  const [currentDifficultyData, setCurrentDifficultyData] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [beatmapItems, setBeatmapItems] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  
  useEffect(() => {
    getSong(id)
      .then((found) => {
        if (found) {
          setBeatmap(found);
          setCurrentDifficulty("easy");
          setCurrentDifficultyData(found.difficulties?.easy ?? null);
        }
      })
      .catch(() => {
        const found = localBeatmaps.find(b => b.id === parseInt(id));
        if (found) {
          setBeatmap(found);
          setCurrentDifficulty("easy");
          setCurrentDifficultyData(found.difficulties?.easy ?? null);
        }
      });
  }, [id]);

  useEffect(() => {
    if (!id) return;
    getComments(`SONG#${id}`)
      .then(setComments)
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    if (!id) return;
    getSongBeatmaps(id)
      .then((items) => {
        if (!items || items.length === 0) return;
        const sorted = [...items].sort((a, b) => parseFloat(a.level) - parseFloat(b.level));
        setBeatmapItems(sorted);
        setCurrentDifficultyData(sorted[0]);
      })
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    if (!id || !currentDifficultyData?.id) return;
    getLeaderboard(id, currentDifficultyData.id)
      .then(setLeaderboard)
      .catch(() => {});
  }, [id, currentDifficultyData?.id]);

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    try {
      const newComment = await createComment({ entityPK: `SONG#${id}`, text: commentText });
      setComments(prev => [newComment, ...prev]);
      setCommentText("");
    } catch (err) {
      // comment failed silently — user can retry
    }
  };

  // Handle back button
  const handleBack = () => {
    navigate(-1);
  };

  const handleDownload = async () => {
    if (!beatmap.azaFileLink) return;
    try {
      const url = await getFileUrl(beatmap.azaFileLink);
      const a = document.createElement('a');
      a.href = url;
      a.download = beatmap.title || 'beatmap';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      // download failed silently
    }
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
    const diffIndex = { easy: 0, medium: 1, hard: 2 }[diff] ?? 0;
    if (beatmapItems.length > diffIndex) {
      setCurrentDifficultyData(beatmapItems[diffIndex]);
    } else if (beatmap?.difficulties?.[diff]) {
      setCurrentDifficultyData(beatmap.difficulties[diff]);
    }
  };


  if (!beatmap) {
    return (
      <div className="p-6 bg-main-off-black min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4 text-white">Beatmap not found</h2>
          <span
            onClick={handleBack}
            className="text-white px-6 py-2 inline-flex items-center justify-center cursor-pointer w-fit"
          >
            <span className="mr-2 text-main-accent font-mukta-mahee">
              ◀ Back
            </span>
          </span>
        </div>
      </div>
    );
  }

  if (!currentDifficultyData) {
    return (
      <div className="p-6 bg-main-off-black min-h-screen text-white flex items-center justify-center">
        <p className="text-light-grey font-nova-square">Loading...</p>
      </div>
    );
  }

  const topLevelReplies = comments.filter(r => r.parentId === null);

  return (
    <div className="p-6 bg-main-off-black min-h-screen text-white mt-16">
      {/* Back Button */}
      <span role="button"
        onClick={handleBack}
        className="mb-7 mt-3 md:mb-10 md:mt-7 inline-flex items-center text-lg font-medium cursor-pointer w-fit"
      >
        <span className="text-main-accent">◀ Back</span>
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
              <h1 className="text-2xl md:text-3xl mb-2 mt-2 text-white font-nova-square">{beatmap.title}</h1>

              <div className="hidden md:flex rounded-md py-2 px-4 gap-6 bg-khaki"
                // style={{ backgroundColor: "rgba(128, 128, 128, 0.3)" }}
              >
                {["easy", "medium", "hard"].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => handleDifficultyChange(diff)}
                    className={`flex items-center justify-center transition-all bg-transparent border-none shadow-lg rounded-full w-8 h-8`}
                    // style={{ // temporary styling to override bootstrap
                    //   border: "none",
                    //   backgroundColor: "transparent"
                    // }}
                  >
                    <div
                      className={`w-full h-full rounded-full flex items-center justify-center transition-opacity ${
                        currentDifficulty === diff ? "opacity-100" : "opacity-50"
                      } ${getDifficultyColor(diff)}`}
                    >
                      <div className="w-7 h-7 rounded-full bg-khaki flex items-center justify-center">
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
              <span className="text-khaki">{beatmap.artist}</span>
            </div>
            
            <p className="text-khaki mb-4">Mapped: {beatmap.mappedBy}</p>
            
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
                onClick={handleDownload}
                disabled={!beatmap.azaFileLink}
                className="bg-main-accent px-6 py-2 rounded-md font-medium text-black disabled:opacity-40 disabled:cursor-not-allowed"
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
            <p className="font-medium mb-0 text-off-white">Source:</p>
            <div className="flex flex-wrap gap-2">
              {beatmap.source.map((src, index) => (
                <span key={index} className="text-khaki">
                  {src}{index < beatmap.source.length - 1 ? "," : ""}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr]">
            <p className="font-medium mb-0 text-off-white">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {beatmap.tags.map((tag, index) => (
                <span key={index} className="text-khaki">
                  {tag}{index < beatmap.tags.length - 1 ? "," : ""}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Global Leaderboard */}
        <div className="mt-20">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-white font-nova-square">Global Leaderboard</h2>
          <div className="w-full h-[400px] overflow-y-auto no-scrollbar font-nova-square">
            {/* Table Head */}
            <div className="grid grid-cols-12 gap-4 py-3 px-4 border-t border-b text-sm sticky top-0 z-10">
              <div className="col-span-2 text-left text-gray-300 text-base">Rank</div>
              <div className="col-span-7 text-left text-gray-300 text-base">Player</div>
              <div className="col-span-3 text-right text-gray-300 text-base">Score</div>
            </div>

            {/* Table Rows */}
            {leaderboard.length === 0 ? (
              <p className="text-light-grey font-nova-square py-4 px-4 text-sm">No scores yet — be the first!</p>
            ) : (
              leaderboard.map((entry, index) => (
                <div
                  key={entry.UserID ?? index}
                  className="grid grid-cols-12 gap-4 py-3 px-4 items-center"
                >
                  <div className="col-span-2 flex items-center text-white font-medium">
                    <span className="text-xs">#</span>
                    <span>{entry.Rank ?? index + 1}</span>
                  </div>
                  <div className="col-span-7 text-main-accent font-medium">{entry.Username ?? entry.UserID ?? "—"}</div>
                  <div className="col-span-3 text-right text-white">{entry.Score?.toLocaleString() ?? "—"}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-5 mb-20">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-white font-nova-square">Comments</h2>

          {/* Reply Bar */}
          <div className="mt-4">
            <div className="w-full relative p-1 border border-main-midtone">
              <input
                type="text"
                placeholder="Add a Comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
                style={{
                  background: "linear-gradient(to right, #EFECE6, #DDD0B9)",
                  margin: 0,
                }}
                className="block w-full px-4 py-2 pr-24 font-nova-square text-multi-off-black italic placeholder-main-off-black focus:outline-none focus:ring-0 focus:border-light-grey rounded-none leading-none"
              />
              <button
                onClick={handleCommentSubmit}
                className="absolute top-[10px] right-3 px-4 py-2 md:px-7 bg-main-accent text-dark-purple font-nova-square rounded-none"
              >
                Reply
              </button>
            </div>
          </div>

          {/* Post Replies */}
          <div className="mt-6 w-full">
            {topLevelReplies.length === 0 ? (
              <p className="text-light-grey font-nova-square">Be the first to comment!</p>
            ) : (
              topLevelReplies.map((reply) => (
                  <div key={reply.id} className="border-t border-light-grey pt-4">
                    <CommunityReply
                      key={reply.id}
                      reply={reply}
                      allReplies={comments}
                    />
                  </div>
                ))
            )}
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
    <div className="w-[360px] bg-white h-4 overflow-hidden relative">
      <div
        className="bg-main-accent h-full transition-all duration-300 ease-in-out"
        style={{
          width: `${percentage}%`,
          clipPath: "polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)"
        }}
      ></div>
    </div>
  );
};

// Helper function to get difficulty color
const getDifficultyColor = (difficulty) => {
  switch(difficulty) {
    case "easy": return "bg-[#34A853]";
    case "medium": return "bg-[#CA9F28]";
    case "hard": return "bg-[#A83E34]";
    default: return "bg-gray-500";
  }
};
