import PropTypes from "prop-types";
import leftArrowIcon from "../../assets/icons/leftArrowIconLarge.svg";
import rightArrowIcon from "../../assets/icons/rightArrowIconLarge.svg";

const ToggleArrow = ({ toggleButton, isActive, direction }) => {
  return (
    <button
      onClick={toggleButton}
    >
      <img
        src={direction === "left" ? leftArrowIcon : rightArrowIcon}
        alt="Toggle Icon"
        className={`w-10 h-10 transition-opacity duration-300 ${
            isActive ? "opacity-50": "opacity-95"
          }`}
      />
    </button>
  );
};

ToggleArrow.propTypes = {
  toggleButton: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  direction: PropTypes.oneOf(["left", "right"]).isRequired,
};

export default ToggleArrow;