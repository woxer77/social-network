import apiClient from '../configs/axios';

export const getPostsForUser = async (userId) => apiClient.get(`/posts/${userId}`);
export const getPostsOfUser = async (userId) => apiClient.get(`/posts/user/${userId}`);
export const createPost = async (data) => apiClient.post('/posts', data);
export const deletePost = async (id) => apiClient.delete(`/posts/${id}`);
export const likePost = async (postId, userId) => apiClient.post(`/posts/${postId}/${userId}/likes`);
