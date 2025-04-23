import { useState } from "react";
import PropTypes from "prop-types";

import { MusicianShape } from "../../types/types";

import selectedEllipseIcon from "../../assets/icons/musicianIcons/selected_ellipse_both.svg";
import unselectedEllipseIcon from "../../assets/icons/musicianIcons/unselected_ellipse.svg";
import ongawaIcon from "../../assets/icons/musicianIcons/OngawaIcon.png";
import leftArrowIcon from "../../assets/icons/leftArrowIconLarge.svg";
import rightArrowIcon from "../../assets/icons/rightArrowIconLarge.svg";

const MusicianSelector = ({
  musicians,
  currentMusician,
  setCurrentMusician,
  className,
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
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        disabled={startIndex === 0}
        className="p-2 lg:p-3 disabled:opacity-60 bg-transparent border-none flex items-center justify-center min-w-8"
      >
        <img src={leftArrowIcon} alt="Previous" className="w-3 lg:w-4 h-auto" />
      </button>

      {/* Musician Cells */}
      <div className="flex gap-3 relative">
        {/* Decorative Boxes Mobile */}
        <div className="lg:hidden absolute top-7 z-20 border-[3px] border-secondary-purple h-8 w-[105%] left-1/2 -translate-x-1/2" />
        <div className="lg:hidden absolute top-[33px] z-20 border-[1px] border-secondary-purple h-[22px] w-[100%] left-1/2 -translate-x-1/2" />

        {/* Decorative Boxes Desktop */}
        <div
          className="hidden lg:block absolute top-7 z-20 border-[5px]
         border-secondary-purple h-12 w-[105%] left-1/2 -translate-x-1/2"
        />
        <div
          className="hidden lg:block absolute top-[36px] z-20 border-[2px]
         border-secondary-purple h-8 w-[100%] left-1/2 -translate-x-1/2"
        />

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
              lg:w-24 lg:h-24
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
              className="absolute inset-0 w-full h-full z-40"
            />

            {/* Background color with slightly smaller radius */}
            <div className="absolute inset-0.5 bg-light-grey rounded-full z-20"></div>

            {/* Musician icon */}
            <img
              src={musician.imageIcon}
              alt={musician.name}
              className="w-16 h-16 rounded-full object-cover z-30
                          lg:w-24 lg:h-24"
            />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        disabled={startIndex + selectorCount >= musicians.length}
        className="p-2 lg:p-3 disabled:opacity-60 bg-transparent border-none outline-none shadow-none flex items-center justify-center min-w-8"
      >
        <img src={rightArrowIcon} alt="Next" className="w-3 lg:w-4 h-auto" />
      </button>
    </div>
  );
};

MusicianSelector.propTypes = {
  musicians: PropTypes.arrayOf(MusicianShape).isRequired,
  currentMusician: MusicianShape.isRequired,
  setCurrentMusician: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default MusicianSelector;
