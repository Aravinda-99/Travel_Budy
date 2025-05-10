import axios from 'axios';

const API_URL = 'http://localhost:8093/api/v1/auth/';
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

class AuthService {
  constructor() {
    this.token = localStorage.getItem(TOKEN_KEY);
    this.user = JSON.parse(localStorage.getItem(USER_KEY));
    this.setupAxiosInterceptors();
  }

  async login(username, password) {
    try {
      const response = await axios.post(API_URL + 'signin', {
        username,
        password
      });

      if (response.data.token) {
        const formattedToken = response.data.token.startsWith('Bearer ') ? 
          response.data.token : 
          `Bearer ${response.data.token}`;
        
        this.token = formattedToken;
        this.user = response.data;
        localStorage.setItem(TOKEN_KEY, formattedToken);
        localStorage.setItem(USER_KEY, JSON.stringify(response.data));
        
        // Trigger storage event for other components
        window.dispatchEvent(new Event('storage'));
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));
    
    // Redirect to login
    window.location.href = '/login';
  }

  getCurrentUser() {
    return this.user;
  }

  getToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      this.logout();
      return null;
    }
    return token;
  }

  isAuthenticated() {
    const token = this.getToken();
    const user = this.getUser();
    return !!token && !!user;
  }

  // Add token to axios headers
  setupAxiosInterceptors() {
    axios.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers['Authorization'] = token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          this.logout();
        }
        return Promise.reject(error);
      }
    );
  }

  setToken(token) {
    const formattedToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    this.token = formattedToken;
    localStorage.setItem(TOKEN_KEY, formattedToken);
  }

  setUser(user) {
    this.user = user;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser() {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // Get auth header for API requests
  getAuthHeader() {
    const token = this.getToken();
    return token ? { Authorization: token } : {};
  }
}

const authService = new AuthService();

export default authService; 