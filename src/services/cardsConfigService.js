import API from './api';

export const getCardsConfig = () => API.get('/cardsConfig');
export const getSubcategoryById = (id) => API.get(`/categories/${id}`);