import API from './api';


export const createPayment = (orderId) => {
  return API.post("/payments", { orderId });
};


export const getPayments = () => {
  return API.get("/payments");
};