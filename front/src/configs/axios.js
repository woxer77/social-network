import axios from 'axios';
import { url } from './config';
import { persistor } from '../redux/store';

/* eslint-disable no-underscore-dangle */

const apiClient = axios.create({
  baseURL: url,
  responseType: 'json',
  withCredentials: true
});

apiClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

apiClient.interceptors.response.use((config) => config, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get(`${url}/refresh`, { withCredentials: true });
      console.log('RESPONSE=', response);
      localStorage.setItem('token', response.data.accessToken);
      return apiClient.request(originalRequest);
    } catch (e) {
      console.log('Unauthorized!', e);
      localStorage.removeItem('token');
      await persistor.purge();
    }
  }
  throw error;
});

export default apiClient;
