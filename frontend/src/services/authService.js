import api from './api';

export const authService = {
  async login(email, password) {
    const { data } = await api.post('/auth/login/', { email, password });
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    return data;
  },

  async register(full_name, email, password, password2, role) {
    const { data } = await api.post('/auth/register/', { full_name, email, password, password2, role });
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    return data;
  },

  async logout() {
    const refresh = localStorage.getItem('refresh_token');
    await api.post('/auth/logout/', { refresh });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  async getProfile() {
    const { data } = await api.get('/auth/profile/');
    return data;
  },

  async updateProfile(formData) {
    const { data } = await api.patch('/auth/profile/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  async changePassword(old_password, new_password) {
    const { data } = await api.post('/auth/change-password/', { old_password, new_password });
    return data;
  },

  async forgotPassword(email) {
    const { data } = await api.post('/auth/forgot-password/', { email });
    return data;
  },
};
