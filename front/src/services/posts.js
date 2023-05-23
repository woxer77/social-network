import apiClient from '../configs/axios';

export const getPosts = async (page) => apiClient.get('/posts', page);
export const createPost = async (data) => apiClient.post('/posts', data);

export const deletePost = async (id) => apiClient.delete(`/posts/${id}`);
