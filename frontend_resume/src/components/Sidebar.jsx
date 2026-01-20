import React from "react";
import { useResume } from "../context/ResumeContext";

function Sidebar() {
  const { sections, toggleSection, toggle, setToggle } = useResume();
  return (
    <div
      className={`fixed top-0 left-0 ${
        toggle == false ? "w-1/4" : "w-0"
      }  h-screen bg-white p-4 shadow-md overflow-y-auto`}
    >
      <h2 className="text-xl font-bold mb-4">Add Sections</h2>
      {Object.keys(sections).map((section) => (
        <div key={section} className="flex items-center justify-between mb-2">
          <button
            onClick={() => toggleSection(section)}
            className="text-left w-full py-2 px-3 hover:bg-gray-200 rounded"
          >
            {section
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          </button>
          {sections[section] && (
            <span
              onClick={() => toggleSection(section)}
              className="text-red-500 cursor-pointer"
            >
              X
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
