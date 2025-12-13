import React from "react";
import PropTypes from "prop-types";

const SlideOutDrawer = ({ isOpen, onClose, children }) => {
  // Base classes for the fixed container and transition
  const baseClasses =
    "fixed top-0 left-0 h-full z-50 transition-transform duration-500 ease-in-out";

  // Tailwind/CSS class to control the slide-out position
  const transformClass = isOpen ? "translate-x-0" : "-translate-x-full";

  return (
    <>
      {/* 1. Backdrop Overlay (Visible when isOpen is true) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-40"
          onClick={onClose}
        />
      )}

      {/* 2. Slide-out Panel (The Drawer) */}
      <div
        className={`${baseClasses} ${transformClass}`}
        style={{ width: "400px", maxWidth: "80vw" }} // Adjust width as needed
      >
        <div className="h-full w-full overflow-y-auto bg-dark-purple shadow-2xl">
          {/* Close button (optional but recommended) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white text-2xl z-50 p-2"
          >
            &times; {/* Simple 'X' close icon */}
          </button>

          {/* Content (your Login component goes here) */}
          {children}
        </div>
      </div>
    </>
  );
};

SlideOutDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default SlideOutDrawer;
