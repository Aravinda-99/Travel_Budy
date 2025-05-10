import axios from 'axios';
import authService from './authService';

// Base API configuration
const baseConfig = {
  baseURL: 'http://localhost:8093',
  headers: {
    'Content-Type': 'application/json',
  }
};

// Create authenticated API instance
const api = axios.create(baseConfig);

// Create public API instance for non-authenticated endpoints
const publicApi = axios.create(baseConfig);

// Constants
const TOKEN_KEY = 'auth_token';

// Add request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403 || error.response?.status === 401) {
      // Use authService to handle logout
      authService.logout();
    }
    return Promise.reject(error);
  }
);

// Auth API methods
export const authAPI = {
  login: async (credentials) => {
    const response = await publicApi.post('/login', credentials);
    if (response.data.token) {
      authService.setToken(response.data.token);
      authService.setUser(response.data);
    }
    return response.data;
  },

  register: async (userData) => {
    return await publicApi.post('/register', userData);
  },

  logout: () => {
    authService.logout();
  },

  isAuthenticated: () => {
    return authService.isAuthenticated();
  },

  getUser: () => {
    return authService.getUser();
  }
};

// Itinerary API methods
export const itineraryAPI = {
  getAllPosts: async () => {
    return await publicApi.get('/api/v1/tpost/post/get-all');
  },

  createPost: async (postData) => {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error('No authentication token found');
      }

      const response = await api.post('/api/v1/tpost/save', postData);
      return response;
    } catch (error) {
      console.error('Error in createPost:', error);
      throw error;
    }
  },

  updatePost: async (postData) => {
    return await api.put('/api/v1/tpost/post/update', postData);
  },

  deletePost: async (postId) => {
    return await api.delete(`/api/v1/tpost/post/delete/${postId}`);
  }
};

// Hotel API endpoints
export const hotelAPI = {
  getAllHotels: async () => {
    try {
      const response = await publicApi.get('/api/v1/hotel/get-all-hotel');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  saveHotel: async (hotelData) => {
    try {
      const response = await api.post('/api/v1/hotel/save', hotelData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  updateHotel: async (hotelData) => {
    try {
      const response = await api.put('/api/v1/hotel/update', hotelData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  deleteHotel: async (id) => {
    try {
      const response = await api.delete(`/api/v1/hotel/delete-hotel/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getHotelById: async (id) => {
    try {
      const response = await api.get(`/api/v1/hotel/get-hotel/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

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
      const response = await api.put('/api/v1/comment/update', commentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  deleteComment: async (id) => {
    try {
      const response = await api.delete(`/api/v1/comment/delete-item/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api; 