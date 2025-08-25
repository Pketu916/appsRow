import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteBlogApi } from '../api/http';

// Async action to fetch blogs
export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const res = await fetch('http://localhost:5000/api/blogs'); // your API endpoint
  const data = await res.json();
  return data;
});

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    addBlog: (state, action) => {
      state.items.push(action.payload);
    },
    updateBlog: (state, action) => {
      const index = state.items.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteBlog: (state, action) => {
      state.items = state.items.filter(b => b._id !== action.payload);
      deleteBlogApi(action.payload)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBlogs.pending, state => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { addBlog, updateBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;
