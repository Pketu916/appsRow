import React from "react";

const ErrorDisplay = ({ errors, warnings, onClose }) => {
  const allErrors = [];
  const allWarnings = [];

  // Flatten nested errors and warnings
  const flattenMessages = (obj, prefix = "") => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      const fieldPath = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "string") {
        if (key.includes("error") || key.includes("Error")) {
          allErrors.push({ field: fieldPath, message: value });
        } else if (key.includes("warning") || key.includes("Warning")) {
          allWarnings.push({ field: fieldPath, message: value });
        } else {
          // Determine if it's an error or warning based on context
          const isError =
            fieldPath.includes("price") ||
            fieldPath.includes("title") ||
            fieldPath.includes("country") ||
            fieldPath.includes("duration") ||
            fieldPath.includes("category") ||
            fieldPath.includes("image");

          if (isError) {
            allErrors.push({ field: fieldPath, message: value });
          } else {
            allWarnings.push({ field: fieldPath, message: value });
          }
        }
      } else if (typeof value === "object" && value !== null) {
        flattenMessages(value, fieldPath);
      }
    });
  };

  if (errors) flattenMessages(errors);
  if (warnings) flattenMessages(warnings);

  if (allErrors.length === 0 && allWarnings.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-red-600 px-4 py-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            Form Validation Issues
          </h3>
          {onClose && (
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="max-h-96 overflow-y-auto">
          {/* Errors Section */}
          {allErrors.length > 0 && (
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center mb-3">
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
                <h4 className="text-sm font-semibold text-red-800">
                  Errors ({allErrors.length})
                </h4>
              </div>
              <div className="space-y-2">
                {allErrors.map((error, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                    <div className="flex-1">
                      <p className="text-sm text-red-700 font-medium">
                        {error.field
                          .replace(/\./g, " → ")
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </p>
                      <p className="text-sm text-red-600">{error.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warnings Section */}
          {allWarnings.length > 0 && (
            <div className="p-4">
              <div className="flex items-center mb-3">
                <svg
                  className="w-5 h-5 text-yellow-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <h4 className="text-sm font-semibold text-yellow-800">
                  Warnings ({allWarnings.length})
                </h4>
              </div>
              <div className="space-y-2">
                {allWarnings.map((warning, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></div>
                    <div className="flex-1">
                      <p className="text-sm text-yellow-700 font-medium">
                        {warning.field
                          .replace(/\./g, " → ")
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </p>
                      <p className="text-sm text-yellow-600">
                        {warning.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
