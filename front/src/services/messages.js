import apiClient from '../configs/axios';

export const addMessage = async (data) => apiClient.post('/messages', data);
export const getMessages = async (data) => apiClient.get(`/messages/${data.senderId}/${data.receiverId}`);
