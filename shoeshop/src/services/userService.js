import api from './api';

const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

const userService = {
  getUsers,
};

export default userService;
