import apiClient from '../configs/axios';

export const getComments = async (data) => apiClient.post('/comments/get', data);
export const createComment = async (data) => apiClient.post('/comments/create', data);
export const deleteComment = async (id) => apiClient.delete(`/comments/${id}`);
