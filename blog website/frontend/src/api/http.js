const BASE_URL = 'http://localhost:5000/api';

export async function fetchBlogs() {
  try {
    const response = await fetch(`${BASE_URL}/blogs`);
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function deleteBlogApi(id) {
  try {
    const response = await fetch(`${BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete blog');
    }

    return true;
  } catch (error) {
    console.error('Error deleting blog:', error);
    return false;
  }
}
