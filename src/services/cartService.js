import API from './api';

export const addToCart = (productId) =>
  API.post('/cart-items', { items: [{ productId }] });

export const getCart = () => API.get('/cart-items');

export const updateCartQuantity = (productId, quantity) =>
  API.put('/cart-items', { items: [{ productId, quantity }] });

export const removeFromCart = (productId) => API.delete(`/cart-items/${productId}`);