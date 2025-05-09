import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const mediaService = {
  createMedia: async (mediaData) => {
    try {
      const response = await api.post('/media', mediaData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api; 