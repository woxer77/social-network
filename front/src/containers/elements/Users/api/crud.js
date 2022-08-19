import { apiClient } from '../../../../configs/axios';

export const getUserById = async (id) => apiClient.get(`users/${id}`);
