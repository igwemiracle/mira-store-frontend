// services/orderService.js
import API from './api';
// ---------------------


// 1️⃣ Create PaymentIntent only
export const createPaymentIntentOnly = async () => {
  const response = await API.post("/orders/create-payment-intent");
  return response.data; // { clientSecret, amount }
};

// ---------------------
// 2️⃣ Create Order after successful payment
export const createOrderAfterPayment = async ({ paymentIntentId }) => {
  const token = localStorage.getItem("token"); // JWT
  return await API.post(
    "/orders/create-order-after-payment",
    { paymentIntentId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};



// Create an order (backend pulls items from the user's cart automatically)
export const createOrder = async (orderData) => {
  const res = await API.post("/orders", orderData);
  return res.data;
};

// Fetch all orders for the authenticated user
export const getOrders = () =>
  API.get('/orders');

// Fetch a single order by ID (optional, for order detail page)
export const getOrderById = (orderId) =>
  API.get(`/orders/${orderId}`);


// Get current logged-in user's orders
export const getMyOrders = () =>
  API.get('/orders/showAllMyOrders');
