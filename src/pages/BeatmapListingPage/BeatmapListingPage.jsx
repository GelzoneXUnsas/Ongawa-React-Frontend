import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import searchIcon from '../../assets/icons/searchIcon.svg';
import closeIcon from '../../assets/icons/closeNavDropdown.png';
import heartIcon from "../../assets/icons/heartIcon-white.svg";
import playIcon from "../../assets/icons/playIcon-white.svg";
import timeIcon from "../../assets/icons/timeIcon.svg"
import ellipseIcon from "../../assets/icons/ellipse.svg"
import filterIcon from "../../assets/icons/filterIcon.svg";
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

  const [activeFilter, setActiveFilter] = useState("Title");
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

  const [showMobileFilterModal, setShowMobileFilterModal] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);

  const [selectedTags, setSelectedTags] = useState([]);
  const [minDifficulty, setMinDifficulty] = useState("2");
  const [maxDifficulty, setMaxDifficulty] = useState("5");
  const [editingMinDifficulty, setEditingMinDifficulty] = useState(false);
  const [editingMaxDifficulty, setEditingMaxDifficulty] = useState(false);
  const [searchTag, setSearchTag] = useState("");

  const searchFilteredBeatmaps = beatmaps.filter((b) => {
    // First filter by search term
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase());

    // Then filter by selected tags (only if tags are selected)
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => b.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  const getAllAvailableTags = () => {
    const allTags = beatmaps.flatMap(beatmap => beatmap.tags);
    return [...new Set(allTags)].sort(); // Remove duplicates and sort alphabetically
  };

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
      // Default sorting by title
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

      // Check if click is outside ALL difficulty dropdown instances
      const allDifficultyDropdowns = document.querySelectorAll('[data-dropdown="difficulty"]');
      const isClickInsideAnyDifficultyDropdown = Array.from(allDifficultyDropdowns).some(
        dropdown => dropdown.contains(event.target)
      );

      if (!isClickInsideAnyDifficultyDropdown) {
        setDifficultyOpen(false);
      }

      // Check if click is outside ALL tags dropdown instances
      const allTagsDropdowns = document.querySelectorAll('[data-dropdown="tags"]');
      const isClickInsideAnyTagsDropdown = Array.from(allTagsDropdowns).some(
        dropdown => dropdown.contains(event.target)
      );

      if (!isClickInsideAnyTagsDropdown) {
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

  // Handle mobile filter selection from modal
  const handleMobileFilterSelect = (filter) => {
    setActiveFilter(filter);
  };

  const handleCloseModal = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setShowMobileFilterModal(false);
      setIsModalClosing(false);
    }, 200); // Match the animation duration? (seems to be smoother when a bit shorter)
  };

  // Add this function for tag selection
  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
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
    <div className="p-6 bg-main-off-black min-h-screen text-white mt-16">
      <h2 className="mt-2 text-white md:mx-4 font-nova-square font-medium pb-5">
        Beatmaps
      </h2>
      {/* Desktop Search - Hidden on Mobile */}
      <div className="hidden md:flex items-center mb-6">
        <div ref={searchContainerRef} className="relative w-full max-w-full rounded flex items-center mx-4">
          {/* <div className="bg-light-purple bg-opacity-50 w-full rounded flex items-center"> */}
          <div className={`${showDropdown && searchHistory.length > 0 ? 'bg-main-dark' : 'bg-khaki'} w-full rounded-t ${showDropdown && searchHistory.length > 0 ? 'rounded-b-none' : 'rounded'} h-12`}>
            <input
              type="text"
              placeholder="Search ..."
              className="text-white placeholder-black focus:placeholder-white border-none w-full px-4 rounded focus:ring-0 placeholder:text-lg placeholder:font-roboto h-full"
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
            <div className="absolute inset-y-0 right-4 flex items-center space-x-3">
              <div className="w-px h-6 bg-black"></div>
              <img src={searchIcon} alt="Search" className="w-6 h-6" />
            </div>
          </div>
          {/* Search History Dropdown */}
          {showDropdown && searchHistory.length > 0 && (
            <div
              className="absolute top-full left-0 right-0 bg-main-dark rounded-b-lg z-50 p-2"
            >
              {searchHistory.map((historyItem, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-khaki hover:bg-opacity-20 cursor-pointer rounded-lg group"
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
        <div className="bg-khaki rounded-lg h-10 relative">
          <input
            type="text"
            placeholder="Search ..."
            className="text-black placeholder-black border-none w-full h-full rounded focus:ring-0 px-4 py-2"
            style={{ border: "none" }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute inset-y-0 right-4 flex items-center space-x-3">
            <div className="w-px h-6 bg-black"></div>
            {searchInput ? (
              <img src={closeIcon} alt="Close" onClick={() => setSearchInput("")} className="w-4 h-4 mx-3" /> 
            ) : (
              <img src={searchIcon} alt="Search" className="w-5 h-5 mx-3" />
              )}
          </div>
        </div>
      </div>

      {/* Filtering Options Section - Desktop & Mobile */}
      <div className="mb-6 md:mx-4">
        {/* Desktop Layout - Single Row */}
        <div className="hidden md:flex flex-wrap items-center gap-3 font-nova-square">
          {/* Sort Button */}
          <button
            className="bg-khaki rounded-md px-4 py-2 flex items-center gap-2 text-black"
            onClick={toggleSortDirection}
            // style={{
            //   // temporary styling to override bootstrap
            //   border: "none",
            //   backgroundColor: "rgba(109, 109, 153, 0.5)",
            // }}
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
                <polyline points="18 15 12 9 6 15"></polyline>
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
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            )}
          </button>

          {/* Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {["Title", "Date", "Artist"].map((filter) => (
              <button
                key={filter}
                className={`px-3 py-1 rounded-md transition-all duration-200 hover:text-main-accent ${
                  activeFilter === filter
                    ? "border-b-4 text-main-accent"
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
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
            availableTags={getAllAvailableTags()}
          />
        </div>

        {/* Mobile Layout - Two Rows */}
        {/* <div className="md:hidden space-y-3"> */}
          {/* First Row: Sort Button and Filter Buttons */}
          {/* <div className="flex items-center gap-3"> */}
            {/* Sort Button */}
            {/* <button
              className="bg-khaki rounded-md px-4 py-2 flex items-center gap-2 flex-shrink-0 text-black"
              onClick={toggleSortDirection}
              // style={{
              //   // temporary styling to override bootstrap
              //   border: "none",
              //   backgroundColor: "rgba(109, 109, 153, 0.5)",
              // }}
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
                  <polyline points="18 15 12 9 6 15"></polyline>
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
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              )}
            </button> */}

            {/* Filter Buttons - Scrollable on mobile */}
            {/* <div className="flex gap-2 overflow-x-auto no-scrollbar flex-1">
              {["All", "Title", "Date", "Artist"].map((filter) => (
                <button
                  key={filter}
                  className={`px-3 py-1 rounded-md transition-all duration-200 hover:underline whitespace-nowrap flex-shrink-0 ${
                    activeFilter === filter
                      ? "border-b-4 text-main-accent underline"
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
            </div> */}
          {/* </div> */}

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
        {/* </div> */}
      </div>

      {/* Desktop Grid View - Hidden on Mobile */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 md:gap-3">
        {filteredBeatmaps.map((beatmap, index) => (
          <div
            key={index}
            className="p-4 rounded-xl hover:bg-main-dark/40 cursor-pointer relative"
            onClick={() => handleBeatmapClick(beatmap.id)}
            onMouseEnter={() => setHoveredBeatmap(index)}
            onMouseLeave={() => setHoveredBeatmap(null)}
          >
            <img
              src={beatmap.image}
              alt={beatmap.title}
              className="rounded-lg mb-4 w-full h-70 object-cover"
            />
            <p className="text-lg font-semibold mb-2 text-white font-overpass-mono">{beatmap.title}</p>
            <p className="text-sm text-gray-400 mb-2 font-overpass-mono">{beatmap.artist}</p>
            <p className="text-xs text-gray-500 font-overpass-mono">Mapped: {beatmap.mappedBy}</p>
            {hoveredBeatmap === index && (
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
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
              className="flex items-start gap-3 p-1 bg-main-off-black transition-transform duration-300 ease-out"
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
                    <p className="text-base font-medium font-overpass-mono mb-1">{beatmap.title}</p>
                    <p className="text-sm text-gray-400 mb-1 font-overpass-mono">{beatmap.artist}</p>
                    <p className="text-xs text-gray-500 font-overpass-mono">Mapped: {beatmap.mappedBy}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action panel that gets revealed */}
            <div
              className="absolute right-0 top-0 h-full flex items-center pr-7 pl-7 bg-main-dark transition-transform duration-300 ease-out"
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

      <button
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-main-accent hover:bg-border-purple-light rounded-full shadow-lg flex items-center justify-center z-40 transition-all duration-200"
        onClick={() => {
          setShowMobileFilterModal(true);
          setIsModalClosing(false); // reset closing state when opening modal?
        }}
      >
        <img src={filterIcon} alt="Search" className="w-6 h-6" />
      </button>

      {/* Mobile Filter Modal */}
      {showMobileFilterModal && (
        <div
          className={`md:hidden fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 ${
            isModalClosing ? "animate-fade-out" : "animate-fade-in"
          }`}
          onClick={handleCloseModal}
        >
          <div
            className={`bg-multi-off-black w-full rounded-t-xl p-6 max-h-[90vh] overflow-y-auto ${
              isModalClosing ? "animate-slide-down" : "animate-slide-up"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium text-white font-nova-square mb-0">
                Sorting
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white mb-12"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="border-t border-gray-600 mb-6"></div>

            {/* Sort Dropdown and Filter Options */}
            <div className="flex items-center gap-4 mb-10">
              {/* Sort Dropdown */}
              <button
                className="bg-khaki text-main-off-black px-4 py-2 rounded-lg flex items-center gap-2"
                onClick={toggleSortDirection}
              >
                <span className="font-nova-square">Sort</span>
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
                  className={`transition-transform duration-200 ${
                    sortDirection === "ascending" ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {/* Filter Options */}
              <div className="flex gap-4">
                {["Title", "Date", "Artist"].map((filter) => (
                  <button
                    key={filter}
                    className={`px-0 py-2 transition-colors font-nova-square ${
                      activeFilter === filter
                        ? "text-white"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleMobileFilterSelect(filter)}
                  >
                    {filter === "Title"
                      ? "Title"
                      : filter === "Artist"
                      ? "Artist"
                      : "Date"}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags Section */}
            <div className="mb-8">
              <h4 className="text-xl font-medium text-white font-nova-square mb-4">
                Tags
              </h4>
              <div className="border-t border-gray-600 mb-6"></div>

              {/* Search Input */}
              <div className="mb-4 bg-khaki rounded-md">
                <input
                  type="text"
                  placeholder="Search tags..."
                  className="w-full rounded-md p-3 focus:outline-none focus:ring-0 bg-khaki text-multi-off-black placeholder-multi-off-black"
                  style={{ border: "none" }}
                  value={searchTag}
                  onChange={(e) => setSearchTag(e.target.value)}
                />
              </div>

              {/* Tag Buttons */}
              <div className="flex flex-wrap gap-3">
                {(() => {
                  const allTags = getAllAvailableTags();
                  const filteredTags = allTags.filter(
                    (tag) =>
                      searchTag === "" ||
                      tag.toLowerCase().includes(searchTag.toLowerCase())
                  );

                  // If there's no search term, show only first 6 tags
                  // If there's a search term, show all filtered results

                  // const tagsToShow = searchTag === "" ? filteredTags.slice(0, 6) : filteredTags;

                  // If there's no search term, prioritize showing selected tags + remaining slots filled with unselected tags
                  let tagsToShow;
                  if (searchTag === "") {
                    // Show selected tags first, then fill remaining slots with unselected tags
                    const selectedInFiltered = filteredTags.filter((tag) =>
                      selectedTags.includes(tag)
                    );
                    const unselectedInFiltered = filteredTags.filter(
                      (tag) => !selectedTags.includes(tag)
                    );
                    const remainingSlots = Math.max(
                      0,
                      6 - selectedInFiltered.length
                    );
                    tagsToShow = [
                      ...selectedInFiltered,
                      ...unselectedInFiltered.slice(0, remainingSlots),
                    ];
                  } else {
                    // When searching, show all filtered results
                    tagsToShow = filteredTags;
                  }

                  return tagsToShow.map((tag) => (
                    <button
                      key={tag}
                      className={`px-4 py-2 rounded-lg transition-colors font-nova-square ${
                        selectedTags.includes(tag)
                          ? "bg-white text-gray-800 border border-white"
                          : "border border-gray-400 text-gray-400" // hover:border-white hover:text-white 
                      }`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </button>
                  ));
                })()}
              </div>

              {/* Show hint when no search and there are more than 6 tags */}
              {/* {searchTag === "" && getAllAvailableTags().length > 6 && (
                <p className="text-gray-400 text-sm mt-3 font-overpass-mono">
                  Showing 6 of {getAllAvailableTags().length} tags. Use search to find more.
                </p>
              )} */}
              {/* Clear Tags Button */}
              {selectedTags.length > 0 && (
                <div className="mb-4">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg font-nova-square transition-colors mt-5"
                    onClick={() => setSelectedTags([])}
                  >
                    Clear Tags ({selectedTags.length})
                  </button>
                </div>
              )}
            </div>

            {/* Difficulty Section */}
            <div className="mb-6">
              <h4 className="text-xl font-medium text-white font-nova-square mb-4">
                Difficulty
              </h4>
              <div className="border-t border-gray-600 mb-6"></div>

              {/* Difficulty Range */}
              <div className="flex items-center gap-4">
                <div
                  className="bg-khaki text-gray-800 px-4 py-2 rounded-lg font-nova-square cursor-pointer relative w-[60px] text-center flex items-center justify-center"
                  onClick={() => setEditingMinDifficulty(true)}
                >
                  {editingMinDifficulty ? (
                    <input
                      type="number"
                      value={minDifficulty}
                      onChange={(e) => setMinDifficulty(e.target.value)}
                      onBlur={() => {
                        if (minDifficulty === "" || minDifficulty === null) {
                          setMinDifficulty(0);
                        }
                        setEditingMinDifficulty(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setEditingMinDifficulty(false);
                        }
                      }}
                      className="bg-gray-300 text-gray-800 font-nova-square text-center"
                      style={{
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "textfield",
                        padding: "0",
                        margin: "0",
                        background: "transparent",
                        minWidth: "50px",
                        minHeight: "25px",
                      }}
                      min="0"
                      max="10"
                      step="0.1"
                      autoFocus
                    />
                  ) : (
                    minDifficulty
                  )}
                </div>
                <div className="w-16 h-px bg-gray-600"></div>
                <div
                  className="bg-khaki text-gray-800 px-4 py-2 rounded-lg font-nova-square cursor-pointer relative w-[60px] text-center flex items-center justify-center"
                  onClick={() => setEditingMaxDifficulty(true)}
                >
                  {editingMaxDifficulty ? (
                    <input
                      type="number"
                      value={maxDifficulty}
                      onChange={(e) => setMaxDifficulty(e.target.value)}
                      onBlur={() => {
                        if (maxDifficulty === "" || maxDifficulty === null) {
                          setMaxDifficulty(10);
                        }
                        setEditingMaxDifficulty(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setEditingMaxDifficulty(false);
                        }
                      }}
                      className="bg-gray-300 text-gray-800 font-nova-square text-center"
                      style={{
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "textfield",
                        padding: "0",
                        margin: "0",
                        background: "transparent",
                        width: "100%",
                        minWidth: "50px",
                        minHeight: "25px",
                      }}
                      min="0"
                      max="10"
                      step="0.1"
                      autoFocus
                    />
                  ) : (
                    maxDifficulty
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
