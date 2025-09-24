import apiService from './apiService';

const authService = {
  async login(email, password) {
    return apiService.post('/users/login', { email, password });
  },

  async register(userData) {
    return apiService.post('/users', userData);
  },

  async getProfile() {
    return apiService.get('/users/profile');
  },
};

export default authService;
