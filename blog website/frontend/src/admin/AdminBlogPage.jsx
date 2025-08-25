import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, deleteBlog } from '../store/blogSlice';
import BlogTable from './BlogTable';

const AdminBlogPage = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs.items);
  const loading = useSelector(state => state.blogs.loading);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
  };
    const onedit = (id) => {
    // dispatch(deleteBlog(id));

  };

  return (
    <div>
      <h2>Admin Blog Management</h2>
     <BlogTable blogs={blogs} onEdit={onedit} onDelete={handleDelete} />
    </div>
  );
};

export default AdminBlogPage;
