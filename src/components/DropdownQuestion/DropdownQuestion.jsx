import { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import rightArrowIcon from "../../assets/icons/rightArrowIcon.png";

const DropdownQuestion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="py-3 ml-4 mr-4 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex">
        {/* Arrow Icon with Framer Motion */}
        <motion.img
          src={rightArrowIcon}
          alt="Toggle Arrow"
          className="w-4 h-4 mt-1"
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        />
        {/* Question */}
        <p
          className="w-full ml-4 p-0 pb-3 my-0 text-white font-nova-square border-b-2 border-border-purple-light
                       short:text-sm short:pb-1"
        >
          {question}
        </p>
      </div>

      {/* AnimatePresence for the answer container */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.3, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.2 },
              },
            }}
            className="overflow-hidden ml-8"
          >
            <p className="mt-2 text-gray-300 font-nova-square short:text-xs short:mb-0">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

DropdownQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default DropdownQuestion;
