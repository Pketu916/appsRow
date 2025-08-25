// /src/components/BlogList.js
import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../api/http";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loadBlogs = async () => {
      const data = await fetchBlogs();
      setBlogs(data);
    };
    loadBlogs();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Blog Posts</h2>
      {blogs.length > 0 ? (
        blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
      ) : (
        <p>No blogs available.</p>
      )}
    </div>
  );
};

export default BlogList;
