import React, { useState } from "react";
import { travelDestinationsAPI } from "../utils/http";

const TestUpload = () => {
  const [formData, setFormData] = useState({
    title: "Test Destination from Admin",
    country: "India",
    duration: "3 Nights - 4 Days",
    rating: 4.5,
    reviews: 100,
    category: "Family trip",
    price: 299,
    oldPrice: 399,
    currency: "USD",
    description: "This is a test destination created from admin panel",
    highlights: ["Test highlight 1", "Test highlight 2"],
    inclusions: ["Test inclusion 1", "Test inclusion 2"],
    image: null,
    additionalImages: [],
    ctaBgImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    console.log("File change:", name, files);

    if (name === "image" && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else if (name === "additionalImages" && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: Array.from(files),
      }));
    } else if (name === "ctaBgImage" && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log("Submitting form data:", formData);

      // Check if image is selected
      if (!formData.image) {
        throw new Error("Please select a main image");
      }

      const response = await travelDestinationsAPI.create(formData);
      console.log("Response:", response);
      setResult(response);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Image Upload Test
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration *
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="Family trip">Family trip</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Honeymoon trip">Honeymoon trip</option>
                  <option value="Business trip">Business trip</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating *
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  step="0.1"
                  min="0"
                  max="5"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reviews *
                </label>
                <input
                  type="number"
                  name="reviews"
                  value={formData.reviews}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Old Price
                </label>
                <input
                  type="number"
                  name="oldPrice"
                  value={formData.oldPrice}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Main Image * (Required)
              </label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {formData.image && (
                <p className="mt-2 text-sm text-green-600">
                  Selected: {formData.image.name} (
                  {(formData.image.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Images
              </label>
              <input
                type="file"
                name="additionalImages"
                onChange={handleFileChange}
                accept="image/*"
                multiple
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {formData.additionalImages.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-green-600">
                    Selected {formData.additionalImages.length} additional
                    images:
                  </p>
                  <ul className="text-sm text-gray-600">
                    {formData.additionalImages.map((file, index) => (
                      <li key={index}>
                        - {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{" "}
                        MB)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CTA Background Image
              </label>
              <input
                type="file"
                name="ctaBgImage"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {formData.ctaBgImage && (
                <p className="mt-2 text-sm text-green-600">
                  Selected: {formData.ctaBgImage.name} (
                  {(formData.ctaBgImage.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Creating Destination..."
                  : "Create Travel Destination"}
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-4">
              ✅ Success!
            </h3>
            <div className="space-y-2">
              <p>
                <strong>Title:</strong> {result.data?.title}
              </p>
              <p>
                <strong>Country:</strong> {result.data?.country}
              </p>
              <p>
                <strong>Price:</strong> ${result.data?.price}
              </p>
              {result.data?.image && (
                <p>
                  <strong>Image Path:</strong> {result.data.image}
                </p>
              )}
              {result.data?.imageUrl && (
                <p>
                  <strong>Image URL:</strong>
                  <a
                    href={result.data.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-2"
                  >
                    View Image
                  </a>
                </p>
              )}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-green-700 hover:text-green-800">
                View Full Response
              </summary>
              <pre className="mt-2 text-xs text-green-700 bg-green-100 p-3 rounded overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        )}

        {error && (
          <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              ❌ Error
            </h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestUpload;
