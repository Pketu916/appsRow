import React from "react";

const BlogTable = ({ blogs, onEdit, onDelete }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 border border-gray-300 mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Title
          </th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Tags
          </th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Image
          </th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {blogs.map((blog, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-4 py-2 text-sm text-gray-800">{blog.title}</td>
            <td className="px-4 py-2 text-sm text-gray-800">
              {blog.tags?.join(", ")}
            </td>
            <td className="px-4 py-2">
              {blog.image && (
                <img
                  src={blog.image}
                  alt="Blog"
                  className="w-20 h-auto rounded-md object-cover"
                />
              )}
            </td>
            <td className="px-4 py-2 flex gap-2">
              <button
                onClick={() => onEdit(index)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(blog._id)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlogTable;
