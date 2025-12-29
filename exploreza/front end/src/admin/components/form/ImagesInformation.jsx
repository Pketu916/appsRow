import React from "react";

const ImagesInformation = ({
  formData,
  handleFileChange,
  imagePreview,
  additionalImagePreviews,
  ctaBgImagePreview,
  removeAdditionalImage,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Images</h3>

      {/* Main Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Main Image *
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-48 w-full object-cover rounded-md border border-gray-300"
            />
          </div>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Upload the main display image for the travel destination
        </p>
      </div>

      {/* Additional Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Additional Images
        </label>
        <input
          type="file"
          name="additionalImages"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
        />
        {additionalImagePreviews && additionalImagePreviews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {additionalImagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="h-32 w-full object-cover rounded-md border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => removeAdditionalImage(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove image"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Upload additional images to showcase the destination (max 10 images)
        </p>
      </div>

      {/* CTA Background Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          CTA Background Image (Optional)
        </label>
        <input
          type="file"
          name="ctaBgImage"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
        />
        {ctaBgImagePreview && (
          <div className="mt-2">
            <img
              src={ctaBgImagePreview}
              alt="CTA Preview"
              className="h-48 w-full object-cover rounded-md border border-gray-300"
            />
          </div>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Upload a background image for call-to-action sections
        </p>
      </div>
    </div>
  );
};

export default ImagesInformation;


