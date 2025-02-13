import React from "react";
import classNames from "classnames";

const ToggleButton = ({ title, isActive, toggleButton }) => {
  return (
    <button
      onClick={toggleButton}
      className={classNames(
        "px-8 py-2 font-nova-square font-light text-2xl bg-inactive-button hover:bg-inactive-button focus:bg-inactive-button active:bg-inactive-button",
        {
          "border-none text-inactive-text hover:text-inactive-text hover:border-none":
            !isActive,
          "border-2 border-white": isActive,
        }
      )}
    >
      {title}
    </button>
  );
};

export default ToggleButton;
