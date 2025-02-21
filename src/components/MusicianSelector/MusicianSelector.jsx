import React, { useState } from "react";
import PropTypes from "prop-types";

import { MusicianShape } from "../../types/types";

import emptyIcon from "../../assets/images/musicianIcons/musicianIconEmpty.png";
import leftArrowIcon from "../../assets/icons/leftArrowIcon.png";
import rightArrowIcon from "../../assets/icons/rightArrowIcon.png";

const MusicianSelector = ({
  musicians,
  currentMusician,
  setCurrentMusician,
}) => {
  const selectorCount = 4;
  const [startIndex, setStartIndex] = useState(0);

  // Calculate the displayed musicians, filling with empty icons if necessary
  const displayedMusicians = musicians
    .slice(startIndex, startIndex + selectorCount)
    .concat(
      Array(Math.max(0, selectorCount - musicians.length + startIndex)).fill({
        id: `empty-${startIndex}`,
        imageIcon: emptyIcon,
        name: "Empty",
      })
    )
    .slice(0, selectorCount);

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - selectorCount);
    }
  };

  const handleNext = () => {
    if (startIndex + selectorCount < musicians.length) {
      setStartIndex(startIndex + selectorCount);
    }
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
        <div className="z-0 " />
        {displayedMusicians.map((musician) => (
          <div
            key={musician.id}
            onClick={() =>
              musician.imageIcon !== emptyIcon && setCurrentMusician(musician)
            }
            className={`flex items-center justify-center rounded-full  ${
              currentMusician?.id === musician.id
                ? "outline outline-3 outline-[#a482be]"
                : ""
            }`}
          >
            <img src={musician.imageIcon} alt={musician.name} />
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
