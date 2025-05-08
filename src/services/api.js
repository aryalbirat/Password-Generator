import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to request if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Password API services
export const passwordService = {
  // Get all passwords
  getAll: async () => {
    const response = await api.get('/passwords');
    return response.data;
  },

  // Get single password
  getById: async (id) => {
    const response = await api.get(`/passwords/${id}`);
    return response.data;
  },

  // Create password
  create: async (passwordData) => {
    const response = await api.post('/passwords', passwordData);
    return response.data;
  },

  // Update password
  update: async (id, passwordData) => {
    const response = await api.put(`/passwords/${id}`, passwordData);
    return response.data;
  },

  // Delete password
  delete: async (id) => {
    const response = await api.delete(`/passwords/${id}`);
    return response.data;
  }
};

export default api;
