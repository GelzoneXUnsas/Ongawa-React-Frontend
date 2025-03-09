import { useState } from "react";
import PropTypes from "prop-types";

import { MusicianShape } from "../../types/types";

import selectedEllipseIcon from "../../assets/icons/musicianIcons/selected_ellipse_both.svg";
import unselectedEllipseIcon from "../../assets/icons/musicianIcons/unselected_ellipse.svg";
import ongawaIcon from "../../assets/icons/musicianIcons/OngawaIcon.png";
import leftArrowIcon from "../../assets/icons/leftArrowIcon.png";
import rightArrowIcon from "../../assets/icons/rightArrowIcon.png";

const MusicianSelector = ({
  musicians,
  currentMusician,
  setCurrentMusician,
}) => {
  const selectorCount = 4;
  const [startIndex, setStartIndex] = useState(0);

  // calculate the displayed musicians
  // will fill up empty cells with empty Icons
  const displayedMusicians = [
    ...musicians.slice(startIndex, startIndex + selectorCount),
    ...Array(Math.max(0, selectorCount - (musicians.length - startIndex))).fill(
      {
        id: `empty-${startIndex}`,
        imageIcon: ongawaIcon,
        name: "Empty",
      }
    ),
  ].slice(0, selectorCount);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - selectorCount));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(
        prev + selectorCount,
        Math.max(0, musicians.length - selectorCount)
      )
    );
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        disabled={startIndex === 0}
        className="p-2 disabled:opacity-50 bg-transparent border-none"
      >
        <img src={leftArrowIcon} alt="Previous" />
      </button>

      {/* Musician Cells */}
      <div className="flex gap-3 relative">
        {/* Decorative Boxes */}
        <div className="absolute top-6 -z-10 border-3 border-secondary-purple h-10 w-[105%] left-1/2 -translate-x-1/2"></div>
        <div className="absolute top-8 -z-10 border-2 border-secondary-purple h-6 w-[100%] left-1/2 -translate-x-1/2"></div>

        {/* Musicians */}
        {displayedMusicians.map((musician) => (
          <div
            key={musician.id}
            onClick={() =>
              musician.name !== "Empty" && setCurrentMusician(musician)
            }
            className={`
              w-16 h-16 flex items-center justify-center rounded-full 
             cursor-pointer relative
              ${musician.name === "Empty" ? "pointer-events-none" : ""}
            `}
          >
            {/* Selection indicator */}
            <img
              src={
                currentMusician?.id === musician.id
                  ? selectedEllipseIcon
                  : unselectedEllipseIcon
              }
              alt=""
              className="absolute inset-0 w-full h-full z-20"
            />

            {/* Background color with slightly smaller radius */}
            <div className="absolute inset-0.5 bg-light-grey rounded-full z-0"></div>

            {/* Musician icon */}
            <img
              src={musician.imageIcon}
              alt={musician.name}
              className="w-16 h-16 rounded-full object-cover z-10"
            />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        disabled={startIndex + selectorCount >= musicians.length}
        className="p-2 disabled:opacity-50 bg-transparent border-none outline-none shadow-none"
      >
        <img src={rightArrowIcon} alt="Next" />
      </button>
    </div>
  );
};

MusicianSelector.propTypes = {
  musicians: PropTypes.arrayOf(MusicianShape).isRequired,
  currentMusician: MusicianShape.isRequired,
  setCurrentMusician: PropTypes.func.isRequired,
};

export default MusicianSelector;
