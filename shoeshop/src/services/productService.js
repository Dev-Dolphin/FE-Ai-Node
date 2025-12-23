import axios from 'axios';
import api from './api';

const API_URL = '/products'; // Replace with your API endpoint

const getProducts = async () => {
  const response = await api.get(API_URL);
  return response.data;
};

const getProductById = async (id) => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

const productService = {
  getProducts,
  getProductById,
};

export default productService;
