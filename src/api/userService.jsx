import apiClient from './apiClient';

export const processRegistration = async (data) => {
  const response = await apiClient.post('/user/registration',data);
  return response.data;
};