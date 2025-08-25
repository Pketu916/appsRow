import React, { useState, useEffect } from 'react';

const BlogForm = ({ onSubmit, editingBlog }) => {
  const [blog, setBlog] = useState({ title: '', content: '', image: '', tags: '' });

  useEffect(() => {
    if (editingBlog) setBlog(editingBlog);
  }, [editingBlog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!blog.title || !blog.content) {
      alert("Title and content are required.");
      return;
    }

    const updatedBlog = {
      ...blog,
      tags: blog.tags.split(',').map(tag => tag.trim())
    };

    onSubmit(updatedBlog);
    setBlog({ title: '', content: '', image: '', tags: '' });
  };

  return (
  <form onSubmit={handleSubmit} className="mb-6">
  <input
    name="title"
    value={blog.title}
    onChange={handleChange}
    placeholder="Title"
    className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  <textarea
    name="content"
    value={blog.content}
    onChange={handleChange}
    placeholder="Content"
    rows="4"
    className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  <input
    name="image"
    value={blog.image}
    onChange={handleChange}
    placeholder="Image URL"
    className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  <input
    name="tags"
    value={blog.tags}
    onChange={handleChange}
    placeholder="Tags (comma separated)"
    className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  <button
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
  >
    {editingBlog ? 'Update' : 'Add'} Blog
  </button>
</form>

  );
};

export default BlogForm;
