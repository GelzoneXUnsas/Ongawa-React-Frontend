import classNames from "classnames";
import PropTypes from "prop-types";

const ToggleButton = ({ title, isActive, toggleButton }) => {
  return (
    <button
      onClick={toggleButton}
      className={classNames(
        "px-8 py-2 font-nova-square font-light text-xl whitespace-nowrap bg-main-off-black hover:bg-main-off-black focus:bg-main-off-black active:bg-main-off-black",
        {
          "border-none text-white hover:text-white hover:border-none":
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
