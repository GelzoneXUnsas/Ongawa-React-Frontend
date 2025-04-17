import { useState, forwardRef } from "react";

const DifficultyDropdown = forwardRef(({ isOpen, onToggle }, ref) => {
  const [minDifficulty, setMinDifficulty] = useState(2.0);
  const [maxDifficulty, setMaxDifficulty] = useState(2.0);

  return (
    <div className="relative" ref={ref}>
      <button
        className="bg-beatmaps-background rounded-md px-4 py-2 flex items-center gap-2"
        onClick={onToggle}
        style={{
          border: "none",
          backgroundColor: "rgba(109, 109, 153, 0.5)",
        }}
      >
        <span>Difficulty</span>
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
          className="feather feather-chevron-down"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-62 bg-dropdown-background rounded-md shadow-lg z-10 p-4 border border-yellow-500">
          <p className="text-lg">Difficulty</p>
          <div className="flex items-center justify-center gap-4">
            <div className="bg-light-purple bg-opacity-50 rounded-md w-16 text-center">
              <input
                type="number"
                className="bg-transparent text-center focus:outline-none m-0 focus:ring-0"
                style={{ border: "none" }}
                value={minDifficulty}
                onChange={(e) => setMinDifficulty(parseFloat(e.target.value))}
                step="0.1"
                min="0"
                max="10"
              />
            </div>
            <span className="text-xl">-</span>
            <div className="bg-light-purple bg-opacity-50 rounded-md w-16 text-center">
              <input
                type="number"
                className="bg-transparent text-center w-full focus:outline-none m-0 focus:ring-0"
                style={{ border: "none" }}
                value={maxDifficulty}
                onChange={(e) => setMaxDifficulty(parseFloat(e.target.value))}
                step="0.1"
                min="0"
                max="10"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

DifficultyDropdown.displayName = "DifficultyDropdown";

export default DifficultyDropdown;
