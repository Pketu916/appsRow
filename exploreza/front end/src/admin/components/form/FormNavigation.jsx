import React from "react";

const FormNavigation = ({
  formSections,
  activeSection,
  onSectionChange,
  isAutoSaving,
  onSubmit,
  onCancel,
  loading,
  initialData,
  validationErrors,
  validationWarnings,
  onShowErrors,
}) => {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Travel Destination Form
        </h2>
        {isAutoSaving && (
          <div className="flex items-center mt-2 text-sm text-blue-600">
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600 mr-2"></div>
            Auto-saving...
          </div>
        )}

        {/* Validation Status */}
        {(validationErrors && Object.keys(validationErrors).length > 0) ||
        (validationWarnings && Object.keys(validationWarnings).length > 0) ? (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-red-500 mr-2"
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
                  Validation Issues
                </span>
              </div>
              <button
                onClick={onShowErrors}
                className="text-xs text-red-600 hover:text-red-800 underline"
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
        ) : (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium text-green-800">
                Form looks good!
              </span>
            </div>
          </div>
        )}
      </div>

      <nav className="space-y-2">
        {formSections.map((section) => (
          <button
            type="button"
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              activeSection === section.id
                ? "bg-blue-100 text-blue-700 border-r-2 border-blue-500"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <span className="mr-3 text-lg">{section.icon}</span>
            {section.name}
          </button>
        ))}
      </nav>

      {/* Form Actions */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="space-y-3">
          <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Saving..." : initialData ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormNavigation;
