import classNames from "classnames";
import PropTypes from "prop-types";

const ToggleButton = ({ title, isActive, toggleButton }) => {
  return (
    <button
      onClick={toggleButton}
      className={classNames(
        "px-8 py-2 font-nova-square font-light text-xl whitespace-nowrap bg-inactive-button hover:bg-inactive-button focus:bg-inactive-button active:bg-inactive-button",
        {
          "border-none text-inactive-text hover:text-inactive-text hover:border-none":
            !isActive,
          "border-2 border-white text-white": isActive,
        }
      )}
    >
      {title}
    </button>
  );
};

ToggleButton.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  toggleButton: PropTypes.func.isRequired,
};

export default ToggleButton;
