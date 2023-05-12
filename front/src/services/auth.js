import apiClient from '../configs/axios';

export const login = async (email, password) => apiClient.post('/login', { email, password });
export const registration = async (data) => apiClient.post('/registration', data);
export const logout = async () => apiClient.post('/logout');
