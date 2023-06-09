import apiClient from '../configs/axios';

export const getUserById = async (id) => apiClient.get(`users/${id}`);
export const getUsersByIds = async (usersIds) => apiClient.post('users/get-users-by-ids', usersIds);
export const getUsersWhoLikedPost = async (postId) => apiClient.get(`liked-user-post/${postId}`);
export const uploadImages = async (data) => apiClient.post('upload', data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

export const uploadImageCoverPhoto = async (data) => apiClient.post('upload/cover-photo', data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

export const uploadImageAvatar = async (data) => apiClient.post('upload/avatar', data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

export const updateUserCoverPhoto = async (data) => apiClient.put('users/cover-photo', data);

export const updateUserAvatar = async (data) => apiClient.put('users/avatar', data);

export const editUser = async (data) => apiClient.put('users', data);
export const updateFollowing = async (data) => apiClient.put('users/following', data);
export const updateFollowers = async (data) => apiClient.put('users/followers', data);
export const getUserFollowers = async (userId) => apiClient.get(`users/${userId}/followers`);
