import React from "react";

const FormNavigation = ({
  formSections,
  activeSection,
  onSectionChange,
  loading,
  validationErrors,
  validationWarnings,
  onShowErrors,
}) => {
  const currentIndex = formSections.findIndex((s) => s.id === activeSection);

  return (
    <div className="border-b border-gray-200 bg-white">
      {/* Horizontal Step Navigation */}
      <div className="px-6 py-6">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between">
            {formSections.map((section, index) => {
              const isActive = section.id === activeSection;
              const isCompleted = index < currentIndex;

              return (
                <li key={section.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center w-full">
                    <button
                      type="button"
                      onClick={() => onSectionChange(section.id)}
                      disabled={loading}
                      className={`flex items-center justify-center rounded-full transition-all duration-200 mb-2 ${
                        isActive
                          ? "bg-blue-600 text-white border-2 border-blue-600 ring-4 ring-blue-100"
                          : isCompleted
                          ? "bg-blue-600 text-white border-2 border-blue-600 cursor-pointer hover:bg-blue-700"
                          : "bg-gray-200 text-gray-600 border-2 border-gray-200 hover:bg-gray-300"
                      } ${
                        loading
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                      style={{ width: "44px", height: "44px" }}
                      title={section.name}
                    >
                      {isCompleted ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-lg">{section.icon}</span>
                      )}
                    </button>
                    <span
                      className={`text-xs font-medium text-center ${
                        isActive ? "text-blue-600" : "text-gray-500"
                      }`}
                    >
                      {section.name}
                    </span>
                  </div>
                  {index < formSections.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 mt-[-32px] ${
                        isCompleted ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      {/* Validation Banner */}
      {((validationErrors && Object.keys(validationErrors).length > 0) ||
        (validationWarnings && Object.keys(validationWarnings).length > 0)) && (
        <div className="px-6 py-3 bg-red-50 border-t border-red-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-red-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium text-red-800">
                Validation Issues Detected
              </span>
            </div>
            <button
              onClick={onShowErrors}
              className="text-sm text-red-600 hover:text-red-800 underline"
            >
              View Details
            </button>
          </div>
          <div className="mt-1 text-xs text-red-700">
            {validationErrors && Object.keys(validationErrors).length > 0 && (
              <span>{Object.keys(validationErrors).length} errors</span>
            )}
            {validationErrors &&
              Object.keys(validationErrors).length > 0 &&
              validationWarnings &&
              Object.keys(validationWarnings).length > 0 && <span> • </span>}
            {validationWarnings &&
              Object.keys(validationWarnings).length > 0 && (
                <span>{Object.keys(validationWarnings).length} warnings</span>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormNavigation;
