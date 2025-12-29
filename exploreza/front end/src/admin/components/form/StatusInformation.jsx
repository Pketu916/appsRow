import React from "react";

const StatusInformation = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Status & Visibility</h3>

      {/* Active Status */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleInputChange}
            className="focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300 rounded"
          />
          <div>
            <span className="block text-sm font-medium text-gray-900">
              Active Status
            </span>
            <span className="block text-xs text-gray-600">
              Make this destination visible to users
            </span>
          </div>
        </label>
      </div>

      {/* Featured Status */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleInputChange}
            className="focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300 rounded"
          />
          <div>
            <span className="block text-sm font-medium text-blue-900">
              Featured Destination
            </span>
            <span className="block text-xs text-blue-700">
              Highlight this destination on the homepage and featured sections
            </span>
          </div>
        </label>
      </div>

      {/* CTA Status */}
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="cta"
            checked={formData.cta}
            onChange={handleInputChange}
            className="focus:ring-purple-500 h-5 w-5 text-purple-600 border-gray-300 rounded"
          />
          <div>
            <span className="block text-sm font-medium text-purple-900">
              Show Call-to-Action
            </span>
            <span className="block text-xs text-purple-700">
              Display CTA button on this destination page
            </span>
          </div>
        </label>
      </div>

      {/* Summary Box */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-green-900 mb-2">
          Configuration Summary
        </h4>
        <ul className="space-y-1 text-xs text-green-800">
          <li>
            ✓ Active Status:{" "}
            <span className="font-medium">
              {formData.isActive ? "Visible" : "Hidden"}
            </span>
          </li>
          <li>
            ✓ Featured:{" "}
            <span className="font-medium">
              {formData.isFeatured ? "Yes" : "No"}
            </span>
          </li>
          <li>
            ✓ CTA Button:{" "}
            <span className="font-medium">
              {formData.cta ? "Enabled" : "Disabled"}
            </span>
          </li>
        </ul>
      </div>

      {/* Help Text */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Tips</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Set as "Active" to make the destination visible to users
                </li>
                <li>
                  Mark as "Featured" to showcase it on the homepage
                </li>
                <li>
                  Enable CTA to display booking buttons and special offers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusInformation;


