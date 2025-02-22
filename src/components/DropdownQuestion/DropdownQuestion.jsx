import React, { useState } from "react";
import PropTypes from "prop-types";
import rightArrowIcon from "../../assets/icons/rightArrowIcon.png";

const DropdownQuestion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

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
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        />
        {/* Question */}
        <p className="w-full ml-4 p-0 pb-3 my-0 text-white font-nova-square border-b-2 border-border-purple-light">
          {question}
        </p>
      </div>
      {/* Answer */}
      {isOpen && (
        <p className="mt-2 text-gray-300 font-nova-square ml-6">{answer}</p>
      )}
    </div>
  );
};

DropdownQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default DropdownQuestion;
