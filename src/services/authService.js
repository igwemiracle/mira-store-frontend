import API from './api';

export const LoginUsers = async ({ email, password }) => {
  const response = await API.post('/auth/login', { email, password });
  return response.data;
};

export const RegisterUsers = async ({ name, email, password }) => {
  const response = await API.post('/auth/register', { name, email, password });
  return response.data;
};


export const LogoutUser = () => API.get('/auth/logout');
