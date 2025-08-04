import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import searchIcon from "../../assets/icons/searchIcon.svg";
import closeIcon from "../../assets/icons/closeNavDropdown.png";
import timeIcon from "../../assets/icons/timeIcon.svg";
import { musicians } from "../../data/musicians";

export default function MusicianListingPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  // const [hoveredMusician, setHoveredMusician] = useState(null);

  // const [swipePositions, setSwipePositions] = useState({});
  // const [touchStart, setTouchStart] = useState(null);
  // const [isSwiping, setIsSwiping] = useState(false);

  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("All");
  // const [difficultyOpen, setDifficultyOpen] = useState(false);
  // const [tagsOpen, setTagsOpen] = useState(false);

  const [searchHistory, setSearchHistory] = useState(() => {
    const savedHistory = localStorage.getItem("musicianSearchHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const searchContainerRef = useRef(null);
  const [sortDirection, setSortDirection] = useState("ascending");

  const searchFilteredMusicians = musicians.filter((m) =>
    m.musicianName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const applyFilterAndSort = (musiciansToFilter) => {
    // Apply filters based on active filter type
    let filtered = [...musiciansToFilter];

    // Add sorting logic based on the active filter and sort direction
    if (activeFilter === "Name") {
      filtered.sort((a, b) => {
        const valueA = a.musicianName.toLowerCase();
        const valueB = b.musicianName.toLowerCase();

        return sortDirection === "ascending"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      });
    } else if (activeFilter === "Songs") {
      filtered.sort((a, b) => {
        const valueA = a.totalSongs;
        const valueB = b.totalSongs;

        return sortDirection === "ascending"
          ? valueA - valueB
          : valueB - valueA;
      });
    } else if (activeFilter === "Plays") {
      filtered.sort((a, b) => {
        const valueA = a.totalPlaycount;
        const valueB = b.totalPlaycount;

        return sortDirection === "ascending"
          ? valueA - valueB
          : valueB - valueA;
      });
    } else {
      // Default "All" sorting by name
      filtered.sort((a, b) => {
        const valueA = a.musicianName.toLowerCase();
        const valueB = b.musicianName.toLowerCase();

        return sortDirection === "ascending"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      });
    }

    return filtered;
  };

  const filteredMusicians = applyFilterAndSort(searchFilteredMusicians);

  const handleMusicianClick = (id) => {
    navigate(`/musician/${id}`);
  };

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "musicianSearchHistory",
      JSON.stringify(searchHistory)
    );
  }, [searchHistory]);

  // Add search to history
  useEffect(() => {
    if (searchTerm) {
      setSearchHistory((prevHistory) => {
        // Remove the searchTerm if it already exists
        const filteredHistory = prevHistory.filter(
          (term) => term !== searchTerm
        );
        // Add the searchTerm at the top and keep the history limited to 5 items
        return [searchTerm, ...filteredHistory].slice(0, 5);
      });
    }
  }, [searchTerm]);

  // Function to remove individual search history items
  const removeSearchHistoryItem = (event, historicalSearch) => {
    // Prevent the click from bubbling up to the parent div
    event.stopPropagation();

    // Remove the item from search history
    setSearchHistory((prevHistory) =>
      prevHistory.filter((item) => item !== historicalSearch)
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }

      // // Check if click is outside ALL difficulty dropdown instances
      // const allDifficultyDropdowns = document.querySelectorAll(
      //   '[data-dropdown="difficulty"]'
      // );
      // const isClickInsideAnyDifficultyDropdown = Array.from(
      //   allDifficultyDropdowns
      // ).some((dropdown) => dropdown.contains(event.target));

      // if (!isClickInsideAnyDifficultyDropdown) {
      //   setDifficultyOpen(false);
      // }

      // // Check if click is outside ALL tags dropdown instances
      // const allTagsDropdowns = document.querySelectorAll(
      //   '[data-dropdown="tags"]'
      // );
      // const isClickInsideAnyTagsDropdown = Array.from(allTagsDropdowns).some(
      //   (dropdown) => dropdown.contains(event.target)
      // );

      // if (!isClickInsideAnyTagsDropdown) {
      //   setTagsOpen(false);
      // }
    };

    // Use capture phase to ensure this runs before other click handlers
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, []);

  const handleSearchHistoryClick = (historicalSearch) => {
    setSearchInput(historicalSearch);
    setSearchTerm(historicalSearch);
    setShowDropdown(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(searchInput);
      setShowDropdown(false);
    }
  };

  // Filter click handlers
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  // const toggleDifficultyDropdown = () => {
  //   setDifficultyOpen(!difficultyOpen);
  //   setTagsOpen(false);
  // };

  // const toggleTagsDropdown = () => {
  //   setTagsOpen(!tagsOpen);
  //   setDifficultyOpen(false);
  // };

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(
      sortDirection === "ascending" ? "descending" : "ascending"
    );
  };

  // Swipe threshold values
  // const minSwipeDistance = 50;
  // const maxSwipeDistance = 96; // This is the width of the action panel (24rem)

  // // Touch gesture handlers
  // const onTouchStart = (e) => {
  //   setTouchStart(e.targetTouches[0].clientX);
  //   setIsSwiping(true);
  // };

  // const onTouchMove = (e, index) => {
  //   if (!touchStart || !isSwiping) return;

  //   const currentTouch = e.targetTouches[0].clientX;
  //   const diff = touchStart - currentTouch;

  //   // Constrain the swipe to be between 0 and maxSwipeDistance
  //   let swipeAmount = Math.max(0, Math.min(diff, maxSwipeDistance));

  //   // Update the swipe position for this specific musician
  //   setSwipePositions((prev) => ({
  //     ...prev,
  //     [index]: swipeAmount,
  //   }));
  // };

  // const onTouchEnd = (index) => {
  //   if (!touchStart || !isSwiping) return;

  //   // Get the current swipe amount for this musician
  //   const currentSwipeAmount = swipePositions[index] || 0;

  //   // If swiped more than minSwipeDistance, snap to full open
  //   // Otherwise, snap back to closed
  //   const finalSwipeAmount =
  //     currentSwipeAmount > minSwipeDistance ? maxSwipeDistance : 0;

  //   // Update the swipe position for this specific musician
  //   setSwipePositions((prev) => ({
  //     ...prev,
  //     [index]: finalSwipeAmount,
  //   }));

  //   setTouchStart(null);
  //   setIsSwiping(false);
  // };

  // // Function to determine the transform value based on swipe position
  // const getTransformValue = (index) => {
  //   const swipeAmount = swipePositions[index] || 0;
  //   return `translateX(-${swipeAmount}px)`;
  // };

  // // Function to determine the action panel transform value
  // const getActionPanelTransform = (index) => {
  //   const swipeAmount = swipePositions[index] || 0;
  //   const percentage = (swipeAmount / maxSwipeDistance) * 100;
  //   return `translateX(${100 - percentage}%)`;
  // };

  return (
    <div className="p-6 bg-beatmaps-background min-h-screen text-white mt-16">
      <h2 className="mt-2 text-white md:mx-4">Musicians</h2>
      {/* Desktop Search - Hidden on Mobile */}
      <div className="hidden md:flex items-center mb-6">
        <div
          ref={searchContainerRef}
          className="relative w-full max-w-full rounded flex items-center mx-4"
        >
          <div
            className={`${
              showDropdown && searchHistory.length > 0
                ? "bg-dropdown-background-color"
                : "bg-light-purple bg-opacity-50"
            } w-full rounded-t ${
              showDropdown && searchHistory.length > 0
                ? "rounded-b-none"
                : "rounded"
            } h-12`}
          >
            <input
              type="text"
              placeholder="Search for musicians"
              className="text-white border-none w-full px-4 rounded focus:ring-0 placeholder:text-lg h-full"
              style={{ border: "none" }} // to override styling in index.css (temporary)
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setShowDropdown(true);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (searchHistory.length > 0) {
                  setShowDropdown(true);
                }
              }}
            />
            <div className="absolute inset-y-0 right-4 flex items-center space-x-3">
              <div className="w-px h-6 bg-white"></div>
              <img src={searchIcon} alt="Search" className="w-6 h-6" />
            </div>
          </div>
          {/* Search History Dropdown */}
          {showDropdown && searchHistory.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-dropdown-background-color rounded-b-lg z-50 p-2">
              {searchHistory.map((historyItem, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-beatmaps-background cursor-pointer rounded-lg group"
                  onClick={() => handleSearchHistoryClick(historyItem)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={timeIcon} alt="Search" className="w-4 h-4" />
                      <span>{historyItem}</span>
                    </div>
                    <img
                      src={closeIcon}
                      alt="Remove"
                      className="w-3 h-3"
                      onClick={(e) => removeSearchHistoryItem(e, historyItem)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search - Shown only on mobile */}
      <div className="md:hidden mb-6">
        <div className="bg-light-purple bg-opacity-50 rounded-lg h-10 relative">
          <input
            type="text"
            placeholder="Search for musicians"
            className="text-white border-none w-full h-full rounded focus:ring-0 px-4 py-2"
            style={{ border: "none" }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute inset-y-0 right-4 flex items-center space-x-3">
            <div className="w-px h-6 bg-white"></div>
            {searchInput ? (
              <img
                src={closeIcon}
                alt="Close"
                onClick={() => setSearchInput("")}
                className="w-4 h-4 mx-3"
              />
            ) : (
              <img src={searchIcon} alt="Search" className="w-5 h-5 mx-3" />
            )}
          </div>
        </div>
      </div>

      {/* Filtering Options Section - Desktop & Mobile */}
      <div className="mb-6 md:mx-4 mr-2">
        {/* Desktop Layout - Single Row */}
        <div className="hidden md:flex flex-wrap items-center gap-3">
          {/* Sort Button */}
          <button
            className="bg-light-purple bg-opacity-50 rounded-md px-4 py-2 flex items-center gap-2"
            onClick={toggleSortDirection}
            style={{
              // temporary styling to override bootstrap
              border: "none",
              backgroundColor: "rgba(109, 109, 153, 0.5)",
            }}
          >
            <span>Sort</span>
            {sortDirection === "ascending" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            )}
          </button>

          {/* Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {["All", "Name", "Songs", "Plays"].map((filter) => (
              <button
                key={filter}
                className={`px-3 py-1 rounded-md transition-all duration-200 hover:text-yellow-500 hover:underline ${
                  activeFilter === filter
                    ? "border-b-4 text-yellow-500 underline"
                    : "text-gray-400"
                }`}
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent default button behavior
                  handleFilterClick(filter);
                }}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Vertical Separator */}
          {/* <div className="h-8 w-px bg-gray-500 mx-1"></div>

          <DifficultyDropdown
            ref={difficultyDropdownRef}
            isOpen={difficultyOpen}
            onToggle={toggleDifficultyDropdown}
          />

          <TagsDropdown
            ref={tagsDropdownRef}
            isOpen={tagsOpen}
            onToggle={toggleTagsDropdown}
          /> */}
        </div>

        {/* Mobile Layout - Two Rows */}
        <div className="md:hidden space-y-3">
          {/* First Row: Sort Button and Filter Buttons */}
          <div className="flex items-center gap-3">
            {/* Sort Button */}
            <button
              className="bg-light-purple bg-opacity-50 rounded-md px-4 py-2 flex items-center gap-2 flex-shrink-0"
              onClick={toggleSortDirection}
              style={{
                // temporary styling to override bootstrap
                border: "none",
                backgroundColor: "rgba(109, 109, 153, 0.5)",
              }}
            >
              <span>Sort</span>
              {sortDirection === "ascending" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              )}
            </button>

            {/* Filter Buttons - Scrollable on mobile */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar flex-1">
              {["All", "Name", "Songs", "Plays"].map((filter) => (
                <button
                  key={filter}
                  className={`px-3 py-1 rounded-md transition-all duration-200 hover:text-yellow-500 hover:underline whitespace-nowrap flex-shrink-0 ${
                    activeFilter === filter
                      ? "border-b-4 text-yellow-500 underline"
                      : "text-gray-400"
                  }`}
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent default button behavior
                    handleFilterClick(filter);
                  }}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Second Row: Difficulty and Tags Dropdowns */}
          {/* <div className="flex items-center gap-3">
            <DifficultyDropdown
              ref={difficultyDropdownRef}
              isOpen={difficultyOpen}
              onToggle={toggleDifficultyDropdown}
            />

            <TagsDropdown
              ref={tagsDropdownRef}
              isOpen={tagsOpen}
              onToggle={toggleTagsDropdown}
            />
          </div> */}
        </div>
      </div>

      {/* Desktop Grid View - Hidden on Mobile */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 md:gap-3">
        {filteredMusicians.map((musician, index) => (
          <div
            key={index}
            className="p-4 rounded-xl hover:bg-dropdown-background-color/70 cursor-pointer relative"
            onClick={() => handleMusicianClick(musician.id)}
            // onMouseEnter={() => setHoveredMusician(index)}
            // onMouseLeave={() => setHoveredMusician(null)}
          >
            <img
              src={musician.artistImg}
              alt={musician.musicianName}
              className="rounded-lg mb-4 w-full h-70 object-cover"
            />
            <p className="text-lg font-semibold mb-2 text-white font-overpass-mono text-center">
              {musician.musicianName}
            </p>
            <p className="text-xs text-gray-500 font-overpass-mono text-center">
              {musician.totalSongs} songs | {musician.totalPlaycount} plays
            </p>
            {/* {hoveredMusician === index && (
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">

                <div className="flex items-center gap-2">
                  <img src={ellipseIcon} alt="ellipse" className="w-4 h-4" />
                  <span className="text-xs">{musician.totalSongs} songs</span>
                </div>

                <div className="flex items-center gap-1">
                  <img src={playIcon} alt="play" className="w-4 h-4" />
                  <span className="text-xs">{musician.totalPlaycount}</span>
                </div>
              </div>
            )} */}
          </div>
        ))}
      </div>

      {/* Mobile List View - Hidden on Desktop */}
      <div className="md:hidden space-y-1">
        {filteredMusicians.map((musician, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl"
            // onTouchStart={(e) => onTouchStart(e)}
            // onTouchMove={(e) => onTouchMove(e, index)}
            // onTouchEnd={() => onTouchEnd(index)}
          >
            {/* Main content that slides */}
            <div
              className="flex items-start gap-3 p-1 bg-beatmaps-background transition-transform duration-300 ease-out cursor-pointer"
              // style={{ transform: getTransformValue(index) }}
              // onClick={() => {
              //   // Only navigate if not swiping
              //   if (!isSwiping && (swipePositions[index] || 0) === 0) {
              //     handleMusicianClick(musician.id);
              //   }
              // }}
              onClick={() => handleMusicianClick(musician.id)}
            >
              <img
                src={musician.artistImg}
                alt={musician.musicianName}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-base font-medium font-overpass-mono mb-1">
                      {musician.musicianName}
                    </p>
                    <p className="text-xs text-gray-500 font-overpass-mono">
                      {musician.totalSongs} songs | {musician.totalPlaycount}{" "}
                      plays
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action panel that gets revealed */}
            {/* <div
              className="absolute right-0 top-0 h-full flex items-center pr-7 pl-7 bg-dropdown-background-color transition-transform duration-300 ease-out"
              style={{ transform: getActionPanelTransform(index) }}
            >
              <div className="flex flex-col gap-3 items-center">
                <div className="flex items-center gap-1">
                  <img src={ellipseIcon} alt="ellipse" className="w-4 h-4" />
                  <span className="text-xs">{musician.totalSongs} songs</span>
                </div>
                <div className="flex items-center gap-1">
                  <img src={playIcon} alt="play" className="w-4 h-4" />
                  <span className="text-xs">{musician.totalPlaycount}</span>
                </div>
              </div>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
