import React from "react";

const DetailsInformation = ({
  formData,
  setFormData,
  handleInputChange,
  addArrayItem,
  removeArrayItem,
  difficulties,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Detailed Information</h3>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          required
          placeholder="Write a detailed description about the travel destination..."
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Offer */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Offer</label>
        <input
          type="text"
          name="offer"
          value={formData.offer}
          onChange={handleInputChange}
          placeholder="e.g., Early Bird Special, Honeymoon Package"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Difficulty */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Difficulty Level
        </label>
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff}
            </option>
          ))}
        </select>
      </div>

      {/* Highlights */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Highlights
        </label>
        <div className="flex space-x-2 mt-1">
          <input
            type="text"
            value={formData.highlightInput || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, highlightInput: e.target.value }))
            }
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addArrayItem("highlights", "highlightInput");
              }
            }}
            placeholder="Add a highlight feature"
            className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => addArrayItem("highlights", "highlightInput")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
        {formData.highlights && formData.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.highlights.map((highlight, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {highlight}
                <button
                  type="button"
                  onClick={() => removeArrayItem("highlights", index)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Inclusions */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Inclusions
        </label>
        <div className="flex space-x-2 mt-1">
          <input
            type="text"
            value={formData.inclusionInput || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, inclusionInput: e.target.value }))
            }
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addArrayItem("inclusions", "inclusionInput");
              }
            }}
            placeholder="Add what's included"
            className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => addArrayItem("inclusions", "inclusionInput")}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add
          </button>
        </div>
        {formData.inclusions && formData.inclusions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.inclusions.map((inclusion, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
              >
                {inclusion}
                <button
                  type="button"
                  onClick={() => removeArrayItem("inclusions", index)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Exclusions */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Exclusions
        </label>
        <div className="flex space-x-2 mt-1">
          <input
            type="text"
            value={formData.exclusionInput || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, exclusionInput: e.target.value }))
            }
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addArrayItem("exclusions", "exclusionInput");
              }
            }}
            placeholder="Add what's not included"
            className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => addArrayItem("exclusions", "exclusionInput")}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Add
          </button>
        </div>
        {formData.exclusions && formData.exclusions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.exclusions.map((exclusion, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800"
              >
                {exclusion}
                <button
                  type="button"
                  onClick={() => removeArrayItem("exclusions", index)}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        <div className="flex space-x-2 mt-1">
          <input
            type="text"
            value={formData.tagInput || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, tagInput: e.target.value }))
            }
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addArrayItem("tags", "tagInput");
              }
            }}
            placeholder="Add tags for better searchability"
            className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => addArrayItem("tags", "tagInput")}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Add
          </button>
        </div>
        {formData.tags && formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeArrayItem("tags", index)}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Departure & Return Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Departure Date
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="departureDateEnabled"
              checked={formData.departureDateEnabled}
              onChange={handleInputChange}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-600">Enable</span>
          </div>
          {formData.departureDateEnabled && (
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Return Date
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="returnDateEnabled"
              checked={formData.returnDateEnabled}
              onChange={handleInputChange}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-600">Enable</span>
          </div>
          {formData.returnDateEnabled && (
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsInformation;


