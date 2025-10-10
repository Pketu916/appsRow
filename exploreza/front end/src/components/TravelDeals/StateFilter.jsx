import React from "react";

const StateFilter = ({ states, selectedState, onStateChange }) => {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onStateChange("All")}
        className={`${
          selectedState === "All" ? "text-orange-600" : "text-gray-700/60"
        }`}
      >
        All States
      </button>
      {states.map((state) => (
        <button
          key={state}
          onClick={() => onStateChange(state)}
          className={`${
            selectedState === state ? "text-orange-600" : "text-gray-700/60"
          }`}
        >
          {state}
        </button>
      ))}
    </div>
  );
};

export default StateFilter;
