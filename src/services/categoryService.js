import API from './api';

export const getAllCategories = () => API.get('/categories');
export const getCategoryById = (id) => API.get(`/categories/${id}`);
export const getProductsByParentCategory = (id) => API.get(`/products/parent/${id}`);
export const getProductsBySubCategory = (id) => API.get(`/products/subcategory/${id}`);

