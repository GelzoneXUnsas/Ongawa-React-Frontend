import React, { useState, useEffect, useMemo } from "react";

const DisplayStatusBar = () => {
  const sections = useMemo(
    () => ["Home", "Gameplay", "About Us", "Musicians", "FAQs"],
    []
  );
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Function to determine which section is currently in view
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Middle of the viewport

      for (const section of sections) {
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
          const { top, bottom } = sectionElement.getBoundingClientRect();
          const offsetTop = top + window.scrollY;
          const offsetBottom = bottom + window.scrollY;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Add the event listener
    window.addEventListener("scroll", handleScroll, true);

    // Initial check for the active section
    handleScroll();

    // Clean up function
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [sections]);

  const handleNavClick = (section) => {
    const sectionElement = document.getElementById(section);

    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex-col items-center">
      {sections.map((section, index) => (
        <div key={section} className="flex items-start">
          <div className="flex flex-col items-center mt-[3px]">
            {/* Active Button */}
            <button
              onClick={() => handleNavClick(section)}
              className={`relative w-4 h-4 rounded-full 
                flex items-center justify-center 
                transition-all duration-300 group
                ${activeSection === section ? "bg-light-grey" : "bg-transparent"}
                before:absolute before:w-4 before:h-4 before:rounded-full 
                before:border-4 before:border-light-grey
                after:absolute after:w-[calc(100%+4px)] after:h-[calc(100%+4px)] after:rounded-full 
                after:border-2 after:border-transparent 
                after:outline after:outline-2 after:outline-light-grey
              `}
              aria-label={`Navigate to ${section} section`}
            />

            {/* Section dividers */}
            {index < sections.length - 1 && (
              <div className="flex flex-col items-center py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-light-grey/40 my-2"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-light-grey/40 my-2"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-light-grey/40  my-2"></div>
              </div>
            )}
          </div>

          {/* Section Title (on the right of the button) */}
          <span
            className={`text-light-grey font-nova-square ml-3 cursor-pointer
                ${activeSection === section
                  && "underline"
                }
              `}
            onClick={() => handleNavClick(section)}
          >
            {section}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DisplayStatusBar;
