import React, { useState } from "react";
import { travelDestinationsAPI } from "../utils/http";

const TestImageUpload = () => {
  const [formData, setFormData] = useState({
    title: "Test Destination",
    country: "Test Country",
    duration: "3 Nights - 4 Days",
    rating: 4.5,
    reviews: 100,
    category: "Family trip",
    price: 299,
    oldPrice: 399,
    currency: "USD",
    description: "Test description for image upload",
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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
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

  const testDirectUpload = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Create FormData manually
      const testFormData = new FormData();
      testFormData.append("title", "Direct Upload Test");
      testFormData.append("country", "Test Country");
      testFormData.append("duration", "2 Nights - 3 Days");
      testFormData.append("rating", "4.0");
      testFormData.append("reviews", "50");
      testFormData.append("category", "Adventure");
      testFormData.append("price", "199");
      testFormData.append("oldPrice", "299");
      testFormData.append("currency", "USD");
      testFormData.append("description", "Direct upload test description");
      testFormData.append("highlights[0]", "Direct test highlight 1");
      testFormData.append("highlights[1]", "Direct test highlight 2");
      testFormData.append("inclusions[0]", "Direct test inclusion 1");
      testFormData.append("inclusions[1]", "Direct test inclusion 2");

      const response = await fetch(
        "http://localhost:5000/api/travel-destinations",
        {
          method: "POST",
          body: testFormData,
        }
      );

      const result = await response.json();
      console.log("Direct upload response:", result);
      setResult(result);
    } catch (err) {
      console.error("Direct upload error:", err);
      setError(err.message || "Direct upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Image Upload Test</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form-based Upload */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Form-based Upload</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Rating</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                step="0.1"
                min="0"
                max="5"
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Reviews</label>
              <input
                type="number"
                name="reviews"
                value={formData.reviews}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="Family trip">Family trip</option>
                <option value="Adventure">Adventure</option>
                <option value="Honeymoon trip">Honeymoon trip</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Old Price
              </label>
              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Currency</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="USD">USD</option>
                <option value="INR">INR</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Main Image *
              </label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Additional Images
              </label>
              <input
                type="file"
                name="additionalImages"
                onChange={handleFileChange}
                accept="image/*"
                multiple
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                CTA Background Image
              </label>
              <input
                type="file"
                name="ctaBgImage"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full p-2 border rounded"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Upload with Form"}
            </button>
          </form>
        </div>

        {/* Direct Upload Test */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Direct Upload Test</h2>
          <p className="text-gray-600 mb-4">
            This will test direct FormData upload without using the API service.
          </p>

          <button
            onClick={testDirectUpload}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Testing..." : "Test Direct Upload"}
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Success!
          </h3>
          <pre className="text-sm text-green-700 overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
};

export default TestImageUpload;
