import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import searchIcon from '../../assets/icons/searchIcon.svg';
import closeIcon from '../../assets/icons/closeNavDropdown.png';
import heartIcon from "../../assets/icons/heartIcon-white.svg";
import playIcon from "../../assets/icons/playIcon-white.svg";
import timeIcon from "../../assets/icons/timeIcon.svg"
import ellipseIcon from "../../assets/icons/ellipse.svg"
import { beatmaps } from "../../data/beatmaps";

import DifficultyDropdown from '../../components/DifficultyDropdown/DifficultyDropdown';
import TagsDropdown from '../../components/TagsDropdown/TagsDropdown';

export default function BeatmapListingPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredBeatmap, setHoveredBeatmap] = useState(null);

  const [swipePositions, setSwipePositions] = useState({});
  const [touchStart, setTouchStart] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);

  // const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("All");
  const [difficultyOpen, setDifficultyOpen] = useState(false);
  const [tagsOpen, setTagsOpen] = useState(false);

  const [searchHistory, setSearchHistory] = useState(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const searchContainerRef = useRef(null);
  const difficultyDropdownRef = useRef(null);
  const tagsDropdownRef = useRef(null);
  const [sortDirection, setSortDirection] = useState("ascending");

  const searchFilteredBeatmaps = beatmaps.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const applyFilterAndSort = (beatmapsToFilter) => {
    // Apply filters based on active filter type
    let filtered = [...beatmapsToFilter];

    // Add sorting logic based on the active filter and sort direction
    if (activeFilter === "Title") {
      filtered.sort((a, b) => {
        const valueA = a.title.toLowerCase();
        const valueB = b.title.toLowerCase();

        return sortDirection === "ascending"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      });
    } else if (activeFilter === "Artist") {
      filtered.sort((a, b) => {
        const valueA = a.artist.toLowerCase();
        const valueB = b.artist.toLowerCase();

        return sortDirection === "ascending"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      });
    } else if (activeFilter === "Date") {
      filtered.sort((a, b) => {
        // Parse dates for comparison
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return sortDirection === "ascending"
          ? dateA - dateB
          : dateB - dateA;
      });
    } else {
      // Default "All" sorting by title
      filtered.sort((a, b) => {
        const valueA = a.title.toLowerCase();
        const valueB = b.title.toLowerCase();

        return sortDirection === "ascending"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      });
    }

    return filtered;
  };

  const filteredBeatmaps = applyFilterAndSort(searchFilteredBeatmaps);

  // Function to render difficulty indicator
  const DifficultyIndicator = () => {
    return (
      <div className="flex gap-1">
        {/* <div className={`h-4 w-1 rounded-full ${difficulty === "easy" ? "bg-green-500" : "bg-gray-500"}`}></div>
        <div className={`h-4 w-1 rounded-full ${difficulty === "medium" ? "bg-yellow-500" : "bg-gray-500"}`}></div>
        <div className={`h-4 w-1 rounded-full ${difficulty === "hard" ? "bg-red-500" : "bg-gray-500"}`}></div> */}
        <div className={`h-4 w-1 rounded-full bg-green-500`}></div>
        <div className={`h-4 w-1 rounded-full bg-yellow-500`}></div>
        <div className={`h-4 w-1 rounded-full bg-red-500`}></div>
      </div>
    );
  };

  const handleBeatmapClick = (id) => {
    navigate(`/beatmaplisting/${id}`);
  };

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Add search to history
  useEffect(() => {
    if (searchTerm) {
      setSearchHistory((prevHistory) => {
        // Remove the searchTerm if it already exists
        const filteredHistory = prevHistory.filter((term) => term !== searchTerm);
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
    setSearchHistory(prevHistory =>
      prevHistory.filter(item => item !== historicalSearch)
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

      if (
        difficultyDropdownRef.current &&
        !difficultyDropdownRef.current.contains(event.target)
      ) {
        setDifficultyOpen(false);
      }

      if (
        tagsDropdownRef.current &&
        !tagsDropdownRef.current.contains(event.target)
      ) {
        setTagsOpen(false);
      }
    };

    // Use capture phase to ensure this runs before other click handlers
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
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

  const toggleDifficultyDropdown = () => {
    setDifficultyOpen(!difficultyOpen);
    setTagsOpen(false);
  };

  const toggleTagsDropdown = () => {
    setTagsOpen(!tagsOpen);
    setDifficultyOpen(false);
  };

   // Toggle sort direction
   const toggleSortDirection = () => {
    setSortDirection(sortDirection === "ascending" ? "descending" : "ascending");
  };

  // Swipe threshold values
  const minSwipeDistance = 50;
  const maxSwipeDistance = 96; // This is the width of the action panel (24rem)

  // Touch gesture handlers
  const onTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(true);
  };

  const onTouchMove = (e, index) => {
    if (!touchStart || !isSwiping) return;

    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;

    // Constrain the swipe to be between 0 and maxSwipeDistance
    let swipeAmount = Math.max(0, Math.min(diff, maxSwipeDistance));

    // Update the swipe position for this specific beatmap
    setSwipePositions(prev => ({
      ...prev,
      [index]: swipeAmount
    }));
  };

  const onTouchEnd = (index) => {
    if (!touchStart || !isSwiping) return;

    // Get the current swipe amount for this beatmap
    const currentSwipeAmount = swipePositions[index] || 0;

    // If swiped more than minSwipeDistance, snap to full open
    // Otherwise, snap back to closed
    const finalSwipeAmount = currentSwipeAmount > minSwipeDistance
      ? maxSwipeDistance
      : 0;

    // Update the swipe position for this specific beatmap
    setSwipePositions(prev => ({
      ...prev,
      [index]: finalSwipeAmount
    }));

    setTouchStart(null);
    setIsSwiping(false);
  };

  // Function to determine the transform value based on swipe position
  const getTransformValue = (index) => {
    const swipeAmount = swipePositions[index] || 0;
    return `translateX(-${swipeAmount}px)`;
  };

  // Function to determine the action panel transform value
  const getActionPanelTransform = (index) => {
    const swipeAmount = swipePositions[index] || 0;
    const percentage = (swipeAmount / maxSwipeDistance) * 100;
    return `translateX(${100 - percentage}%)`;
  };

  return (
    <div className="p-6 bg-beatmaps-background min-h-screen text-white mt-16">

      {/* Desktop Search - Hidden on Mobile */}
      <div className="hidden md:flex items-center mb-6">
        <div ref={searchContainerRef} className="relative w-full max-w-full rounded flex items-center mx-4">
          {/* <div className="bg-light-purple bg-opacity-50 w-full rounded flex items-center"> */}
          <div className={`${showDropdown && searchHistory.length > 0 ? 'bg-dropdown-background' : 'bg-light-purple bg-opacity-50'} w-full rounded-t ${showDropdown && searchHistory.length > 0 ? 'rounded-b-none' : 'rounded'} flex items-center`}>
            <input
              type="text"
              placeholder="Search ..."
              className="text-white border-none w-full px-4 rounded focus:ring-0 placeholder:text-lg"
              style={{ border: "none"}} // to override styling in index.css (temporary)
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
            <div className="w-px h-6 bg-white mx-3"></div>
            <img src={searchIcon} alt="Search" className="w-6 h-6 fill-white-500 mr-4" />
          </div>
          {/* Search History Dropdown */}
          {showDropdown && searchHistory.length > 0 && (
            <div
              className="absolute top-full left-0 right-0 bg-dropdown-background rounded-b-lg z-50 p-2"
            >
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
      {/* flex md:hidden items-center gap-2 mb-4 */}
      <div className="md:hidden mb-6">
        <div className="flex items-center bg-light-purple bg-opacity-50 rounded-lg">
          <input
            type="text"
            placeholder="Search ..."
            className="text-white border-none w-full rounded focus:ring-0 px-4 py-2"
            style={{ border: "none" }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="w-px h-6 bg-white"></div>
          {searchInput ? (
            <img src={closeIcon} alt="Close" onClick={() => setSearchInput("")} className="w-4 h-4 mx-3" /> 
          ) : (
            <img src={searchIcon} alt="Search" className="w-5 h-5 mx-3" />
          )}
        </div>
      </div>

      {/* Filtering Options Section - Desktop & Mobile */}
      <div className="flex flex-wrap items-center gap-3 mb-6 ml-6">
        {/* Sort Button - Now toggles between ascending/descending */}
        <button
          className="bg-light-purple bg-opacity-50 rounded-md px-4 py-2 flex items-center gap-2"
          onClick={toggleSortDirection}
          style={{ // temporary styling to override bootstrap
            border: "none",
            backgroundColor: "rgba(109, 109, 153, 0.5)"
          }}
        >
          <span>Sort</span>
          {sortDirection === "ascending" ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          )}
        </button>

        {/* Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {["All", "Title", "Date", "Artist"].map((filter) => (
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
        <div className="h-8 w-px bg-gray-500 mx-1"></div>

        {/* Difficulty Dropdown */}
        {/* Difficulty Dropdown Component */}
        <DifficultyDropdown
          ref={difficultyDropdownRef}
          isOpen={difficultyOpen}
          onToggle={toggleDifficultyDropdown}
        />

        {/* Tags Dropdown */}
        <TagsDropdown
          ref={tagsDropdownRef}
          isOpen={tagsOpen}
          onToggle={toggleTagsDropdown}
        />
      </div>

      {/* Desktop Grid View - Hidden on Mobile */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 md:gap-6">
        {filteredBeatmaps.map((beatmap, index) => (
          <div
            key={index}
            className="p-4 rounded-xl hover:bg-dropdown-background/70 cursor-pointer relative"
            onClick={() => handleBeatmapClick(beatmap.id)}
            onMouseEnter={() => setHoveredBeatmap(index)}
            onMouseLeave={() => setHoveredBeatmap(null)}
          >
            <img
              src={beatmap.image}
              alt={beatmap.title}
              className="rounded-lg mb-4 w-full h-70 object-cover"
            />
            <h3 className="text-lg font-semibold m-0">{beatmap.title}</h3>
            <p className="text-sm text-gray-400 mb-2">{beatmap.artist}</p>
            <p className="text-xs text-gray-500">Mapped: {beatmap.mappedBy}</p>
            {hoveredBeatmap === index && (
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pl-2">
                {/* Difficulty Indicator */}
                <div className="flex items-center gap-2">
                  <img src={ellipseIcon} alt="ellipse" className="w-4 h-4" />
                  <DifficultyIndicator />
                </div>

                {/* Likes and Plays */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <img src={heartIcon} alt="heart" className="w-4 h-4" />
                    <span className="text-xs">{beatmap.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <img src={playIcon} alt="play" className="w-4 h-4" />
                    <span className="text-xs">{beatmap.plays}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile List View - Hidden on Desktop */}
      <div className="md:hidden space-y-1"> {/* space-y-4 */}
        {filteredBeatmaps.map((beatmap, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl"
            onTouchStart={(e) => onTouchStart(e)}
            onTouchMove={(e) => onTouchMove(e, index)}
            onTouchEnd={() => onTouchEnd(index)}
          >
            {/* Main content that slides */}
            <div 
              className="flex items-start gap-3 p-1 bg-beatmaps-background transition-transform duration-300 ease-out"
              style={{ transform: getTransformValue(index) }}
              onClick={() => {
                // Only navigate if not swiping
                if (!isSwiping && (swipePositions[index] || 0) === 0) {
                  handleBeatmapClick(beatmap.id);
                }
              }}
            >
              <img
                src={beatmap.image}
                alt={beatmap.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-medium">{beatmap.title}</h3>
                    <p className="text-sm text-gray-400">{beatmap.artist}</p>
                    <p className="text-xs text-gray-500">Mapped: {beatmap.mappedBy}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action panel that gets revealed */}
            <div
              className="absolute right-0 top-0 h-full flex items-center pr-7 pl-7 bg-dropdown-background transition-transform duration-300 ease-out"
              style={{ transform: getActionPanelTransform(index) }}
            >
              <div className="flex flex-col gap-3 items-center">
                <div className="flex items-center gap-1">
                  <img src={ellipseIcon} alt="ellipse" className="w-4 h-4" />
                  <DifficultyIndicator />
                </div>
                <div className="flex items-center gap-1">
                  <img src={heartIcon} alt="heart" className="w-4 h-4" />
                  <span className="text-xs">{beatmap.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <img src={playIcon} alt="play" className="w-4 h-4" />
                  <span className="text-xs">{beatmap.plays}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
