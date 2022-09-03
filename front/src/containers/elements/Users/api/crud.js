import { apiClient } from '../../../../configs/axios';

export const getUserById = async (id) => apiClient.get(`users/${id}`);

export const getUsersWhoLikedPost = async (id) => apiClient.get(`liked-user-post/${id}`);
