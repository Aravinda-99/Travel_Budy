import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8093',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Comment API endpoints
export const commentAPI = {
  getAllComments: async () => {
    try {
      const response = await api.get('/api/v1/comment/get-all-items');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  saveComment: async (commentData) => {
    try {
      const response = await api.post('/api/v1/comment/save', commentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  updateComment: async (commentData) => {
    try {
      // Validate required fields
      if (!commentData.id) {
        throw new Error('Comment ID is required for updating');
      }
      
      if (!commentData.content) {
        throw new Error('Comment content is required');
      }
      
      // Ensure id is an integer for backend
      const id = parseInt(commentData.id, 10);
      if (isNaN(id)) {
        throw new Error('Comment ID must be a valid number');
      }
      
      // Create a new object with the correctly formatted ID
      const formattedData = {
        ...commentData,
        id: id
      };
      
      const response = await api.put('/api/v1/comment/update', formattedData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update comment:`, error);
      throw error;
    }
  },
  
  deleteComment: async (id) => {
    try {
      if (id === undefined || id === null) {
        throw new Error('Comment ID is required for deletion');
      }
      
      // Ensure id is an integer for backend
      const parsedId = parseInt(id, 10);
      if (isNaN(parsedId)) {
        throw new Error('Comment ID must be a valid number');
      }
      
      const response = await api.delete(`/api/v1/comment/delete-item/${parsedId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete comment:`, error);
      throw error;
    }
  }
};

export default api; 