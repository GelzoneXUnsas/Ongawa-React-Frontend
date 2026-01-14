import { useState, forwardRef, useEffect } from "react";
import PropTypes from "prop-types";

const DifficultyDropdown = forwardRef(({ isOpen, onToggle }, ref) => {
  const [minDifficulty, setMinDifficulty] = useState(2.0);
  const [maxDifficulty, setMaxDifficulty] = useState(2.0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative" data-dropdown="difficulty" ref={ref}>
      <button
        className="bg-khaki rounded-md px-4 py-2 flex items-center gap-2 text-black"
        onClick={onToggle}
        // style={{
        //   border: "none",
        //   backgroundColor: "rgba(109, 109, 153, 0.5)",
        // }}
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

      {/* Desktop Dropdown */}
      {isOpen && !isMobile && (
        <div className="absolute mt-1 w-62 z-50">
          <div className="bg-main-off-black rounded-md shadow-lg z-10 p-4 border border-main-accent">
            <p className="text-lg">Difficulty</p>
            <div className="flex items-center justify-center gap-4">
              <div className="bg-khaki rounded-md w-16 text-center">
                <input
                  type="number"
                  className="bg-transparent text-center focus:outline-none m-0 focus:ring-0 text-black"
                  style={{ border: "none" }}
                  value={minDifficulty}
                  onChange={(e) => setMinDifficulty(parseFloat(e.target.value))}
                  step="0.1"
                  min="0"
                  max="10"
                />
              </div>
              <span className="text-xl">-</span>
              <div className="bg-khaki rounded-md w-16 text-center">
                <input
                  type="number"
                  className="bg-transparent text-center w-full focus:outline-none m-0 focus:ring-0 text-black"
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
        </div>
      )}

      {/* Mobile Modal */}
      {isOpen && isMobile && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onToggle}
          />

          {/* Modal */}
          <div className="fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ease-out">
            <div className="bg-main-off-black rounded-t-xl p-6 max-h-96 overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-10">
                <p className="text-lg font-semibold mb-0">Difficulty</p>
                <button
                  onClick={onToggle}
                  className="text-gray-400 hover:text-white"
                  style={{ border: "none", backgroundColor: "transparent" }}
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

              {/* Modal Content */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="bg-khaki text-black rounded-md w-20 text-center">
                  <input
                    type="number"
                    className="bg-transparent text-center focus:outline-none m-0 focus:ring-0 py-3"
                    style={{ border: "none" }}
                    value={minDifficulty}
                    onChange={(e) =>
                      setMinDifficulty(parseFloat(e.target.value))
                    }
                    step="0.1"
                    min="0"
                    max="10"
                  />
                </div>
                <span className="text-xl">-</span>
                <div className="bg-khaki text-black rounded-md w-20 text-center">
                  <input
                    type="number"
                    className="bg-transparent text-center w-full focus:outline-none m-0 focus:ring-0 py-3"
                    style={{ border: "none" }}
                    value={maxDifficulty}
                    onChange={(e) =>
                      setMaxDifficulty(parseFloat(e.target.value))
                    }
                    step="0.1"
                    min="0"
                    max="10"
                  />
                </div>
              </div>

              {/* Apply Button for Mobile */}
              <button
                onClick={onToggle}
                className="w-full bg-main-accent text-black font-semibold py-3 px-4 rounded-md"
                style={{ border: "none" }}
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

DifficultyDropdown.displayName = "DifficultyDropdown";

DifficultyDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default DifficultyDropdown;
