import { apiClient } from '../../../../configs/axios';

export const getPosts = async () => apiClient.get('/posts');
