import apiClient from './apiClient';

export const getSuppliers = async () => {
  const response = await apiClient.get('/recharge/suppliers');
  return response.data;
};

export const processRecharge = async (data) => {
  const response = await apiClient.post('/recharge/buy', data);
  return response.data;
};

export const getTransactionHistory = async () => {
  const response = await apiClient.get('/recharge/history');
  return response.data;
};