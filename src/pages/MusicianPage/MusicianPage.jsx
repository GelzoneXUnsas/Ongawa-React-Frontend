import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import igIcon from "../../assets/icons/instagramIcon.svg";
import xIcon from "../../assets/icons/xIcon.svg";
import spotifyIcon from "../../assets/icons/spotifyIcon.svg";
import soundCloudIcon from "../../assets/icons/soundcloudIcon2.svg";

import { musicians } from "../../data/musicians";

export default function MusicianPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedAlbums, setExpandedAlbums] = useState(new Set());

  const musician = musicians.find((m) => m.id === parseInt(id));

  const handleBack = () => {
    navigate(-1);
  };

  const handleSongClick = (beatmapId) => {
    navigate(`/beatmaplisting/${beatmapId}`);
  };

  const toggleAlbum = (albumIndex) => {
    const newExpanded = new Set(expandedAlbums);
    if (newExpanded.has(albumIndex)) {
      newExpanded.delete(albumIndex);
    } else {
      newExpanded.add(albumIndex);
    }
    setExpandedAlbums(newExpanded);
  };

  if (!musician) {
    return (
      <div className="p-6 bg-main-off-black min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4 text-white">Musician not found</h2>
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

  return (
    <div className="p-6 bg-main-off-black min-h-screen text-white mt-16">
      {/* Back Button */}
      <span
        role="button"
        onClick={handleBack}
        className="mb-7 mt-3 md:mb-10 md:mt-7 inline-flex items-center text-lg cursor-pointer w-fit"
      >
        <span className="text-main-accent font-mukta-mahee">◀ Back</span>
      </span>

      <div className="max-w-5xl mx-auto">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Artist Image */}
          <div className="md:flex-[0.3] md:max-w-sm shadow-lg rounded-xl overflow-hidden">
            <img
              src={musician.artistImg}
              alt={musician.musicianName}
              className="w-full aspect-square object-cover rounded-xl"
            />
          </div>

          {/* Artist Info */}
          <div className="md:flex-[0.7] flex flex-col md:justify-end">
            <div>
              <h1 className="text-2xl md:text-4xl font-medium mb-2 mt-2 text-white font-nova-square">
                {musician.musicianName}
              </h1>

              <div className="text-main-accent mb-6 font-roboto">
                <span>{musician.totalSongs} songs</span>
                <span className="mx-2">•</span>
                <span>{musician.totalPlaycount} total playcount</span>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <button
                // className="p-3 rounded-md transition-colors"
                // style={{ backgroundColor: "rgba(128, 128, 128, 0.3)" }}
                >
                  <img src={igIcon} alt="Instagram" className="w-5 h-5" />
                </button>
                <button
                // className="p-3 rounded-md transition-colors"
                // style={{ backgroundColor: "rgba(128, 128, 128, 0.3)" }}
                >
                  <img src={xIcon} alt="X" className="w-5 h-5" />
                </button>
                <button
                // className="p-3 rounded-md transition-colors"
                // style={{ backgroundColor: "rgba(128, 128, 128, 0.3)" }}
                >
                  <img src={spotifyIcon} alt="Spotify" className="w-5 h-5" />
                </button>
                <button
                // className="p-3 rounded-md transition-colors"
                // style={{ backgroundColor: "rgba(128, 128, 128, 0.3)" }}
                >
                  <img
                    src={soundCloudIcon}
                    alt="SoundCloud"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#4A4667] my-8"></div>

        <div className="mb-12">
          {/* Description */}
          <p className="text-white leading-relaxed mb-6 font-roboto">
            {musician.description}
          </p>
        </div>

        {/* Discography Section */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-medium mb-6 text-white font-nova-square">
            Discography
          </h2>

          {musician.albums.length === 0 ? (
            <div className="text-gray-400 font-roboto">
              This musician has no albums yet.
            </div>
          ) : (
            <div className="space-y-6 md:space-y-12">
              {musician.albums.map((album, albumIndex) => (
                <div key={albumIndex} className="rounded-xl">
                  {/* Mobile View with Dropdown */}
                  <div className="md:hidden">
                    {/* Album Header */}
                    <div className="flex gap-4 items-start">
                      {/* Album Art */}
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={album.albumArt}
                          alt={album.albumTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Album Info */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-white text-lg font-normal mb-1 mt-0 font-nova-square">
                              {album.albumTitle}
                            </h3>
                            <div className="text-xs text-gray-400 font-nova-square mb-1">
                              {album.releaseDate}
                            </div>
                            <div className="text-xs text-gray-400 font-nova-square">
                              {/* Mapped: {musician.musicianName} */}
                              Total Playtime: {album.totalPlaytime}
                            </div>
                          </div>

                          {/* Dropdown Arrow - Mobile Only */}
                          <button
                            onClick={() => toggleAlbum(albumIndex)}
                            className="ml-4 p-2 text-white hover:text-gray-300 transition-colors"
                          >
                            {/* <svg
                              className={`w-4 h-4 transform transition-transform ${
                                expandedAlbums.has(albumIndex) ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg> */}
                            <div
                              className={`w-0 h-0 transform transition-transform ${
                                expandedAlbums.has(albumIndex)
                                  ? "rotate-180"
                                  : ""
                              }`}
                              style={{
                                borderLeft: "10px solid transparent",
                                borderRight: "10px solid transparent",
                                borderTop: "10px solid white",
                              }}
                            />
                          </button>
                        </div>

                        {/* Expandable Track List - Mobile (Right under album info) */}
                        {expandedAlbums.has(albumIndex) && (
                          <div className="mt-4">
                            {/* <div className="w-full h-px bg-[#4A4667] mb-2"></div> */}
                            <div className="overflow-y-auto max-h-32 pr-4">
                              <div className="space-y-1">
                                {album.tracks.map((track, trackIndex) => (
                                  <div
                                    key={trackIndex}
                                    className="flex items-center justify-between py-2 text-sm text-white cursor-pointer"
                                    onClick={() =>
                                      handleSongClick(track.beatmapId)
                                    }
                                  >
                                    <span className="text-gray-300">
                                      {track.name}
                                    </span>
                                    <span className="text-gray-400">
                                      {track.duration}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Desktop View - Always Expanded */}
                  <div className="hidden md:flex gap-6 rounded-xl">
                    {/* Album Art */}
                    <div className="w-56 h-56 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={album.albumArt}
                        alt={album.albumTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Right Content: Info + Tracklist */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                      {/* Album Info */}
                      <div className="mb-2">
                        <h3 className="text-white text-xl font-normal mb-1 mt-0 font-nova-square">
                          {album.albumTitle}
                        </h3>
                        <div className="text-xs text-gray-400 font-nova-square mb-1">
                          {album.releaseDate}
                        </div>
                        <div className="text-xs text-gray-400 font-nova-square">
                          Total Playtime: {album.totalPlaytime}
                        </div>
                      </div>
                      <div className="w-full h-px bg-[#4A4667] my-1"></div>
                      {/* Scrollable Track List */}
                      <div className="overflow-y-auto max-h-32 pr-4 mt-2">
                        {album.tracks.map((track, trackIndex) => (
                          <div
                            key={trackIndex}
                            className="flex items-center justify-between py-2 px-2 text-sm text-white cursor-pointer hover:bg-[#4A4667] rounded-md transition-colors"
                            onClick={() => handleSongClick(track.beatmapId)}
                          >
                            <span className="text-gray-300">{track.name}</span>
                            <span className="text-gray-400">
                              {track.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
