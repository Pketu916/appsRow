import { Link } from "react-router-dom";
import { useState } from "react";
import travelcategory from "../../travelcategory";

const CategorySection = () => {
  const [categories] = useState(travelcategory);

  return (
    <div className="max-w-7xl w-full mx-auto px-5">
      <h2 className="text-3xl font-bold text-center mb-6">
        Choose Your Category
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:grid-rows-6 gap-4">
        {/* Item 1 */}
        {categories[0] && (
          <Link
            to={`/category/${encodeURIComponent(categories[0].category)}`}
            className="relative group overflow-hidden rounded-lg shadow-lg
                 lg:col-span-2 lg:row-span-3"
          >
            <img
              src={categories[0].image}
              alt={categories[0].title}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold">
                {categories[0].category}
              </h3>
            </div>
          </Link>
        )}

        {/* Item 2 */}
        {categories[1] && (
          <Link
            to={`/category/${encodeURIComponent(categories[1].category)}`}
            className="relative group overflow-hidden rounded-lg shadow-lg
                 lg:col-span-2 lg:row-span-6 lg:col-start-3"
          >
            <img
              src={categories[1].image}
              alt={categories[1].title}
              className="w-full h-full object-cover duration-500 group-hover:scale-110 transition "
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold">
                {categories[1].category}
              </h3>
            </div>
          </Link>
        )}

        {/* Item 3 */}
        {categories[2] && (
          <Link
            to={`/category/${encodeURIComponent(categories[2].category)}`}
            className="relative group overflow-hidden rounded-lg shadow-lg
                 lg:col-span-2 lg:row-span-3 lg:col-start-5"
          >
            <img
              src={categories[2].image}
              alt={categories[2].title}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold">
                {categories[2].category}
              </h3>
            </div>
          </Link>
        )}

        {/* Item 4 */}
        {categories[3] && (
          <Link
            to={`/category/${encodeURIComponent(categories[3].category)}`}
            className="relative group overflow-hidden rounded-lg shadow-lg
                 lg:row-span-3 lg:row-start-4"
          >
            <img
              src={categories[3].image}
              alt={categories[3].title}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold">
                {categories[3].category}
              </h3>
            </div>
          </Link>
        )}

        {/* Item 5 */}
        {categories[4] && (
          <Link
            to={`/category/${encodeURIComponent(categories[4].category)}`}
            className="relative group overflow-hidden rounded-lg shadow-lg
                 lg:row-span-3 lg:row-start-4"
          >
            <img
              src={categories[4].image}
              alt={categories[4].title}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold">
                {categories[4].category}
              </h3>
            </div>
          </Link>
        )}

        {/* Item 6 */}
        {categories[5] && (
          <Link
            to={`/category/${encodeURIComponent(categories[5].category)}`}
            className="relative group overflow-hidden rounded-lg shadow-lg
                 lg:col-span-2 lg:row-span-3 lg:col-start-5 lg:row-start-4"
          >
            <img
              src={categories[5].image}
              alt={categories[5].title}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold">
                {categories[5].category}
              </h3>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
