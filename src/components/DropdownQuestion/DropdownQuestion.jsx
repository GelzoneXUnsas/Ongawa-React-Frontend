import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import rightArrowIcon from "../../assets/icons/rightArrowIcon.png";

const DropdownQuestion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  // useEffect to calculate height of dropdown if open or not
  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight + 12);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      className="py-3 ml-4 mr-4 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center">
        {/* Arrow Icon */}
        <img
          src={rightArrowIcon}
          alt="Toggle Arrow"
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        />
        {/* Question */}
        <p className="w-full ml-4 p-0 pb-3 my-0 text-white font-nova-square border-b-2 border-border-purple-light">
          {question}
        </p>
      </div>
      {/* Answer container with height transition */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: `${height}px` }}
      >
        {/* Container for opacity while transitioning */}
        <div
          ref={contentRef}
          className={`transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="mt-2  ml-8 text-gray-300 font-nova-square">{answer}</p>
        </div>
      </div>
    </div>
  );
};

DropdownQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default DropdownQuestion;
