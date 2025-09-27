import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrderAfterPayment, createPaymentIntentOnly } from "../services/orderService";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  // Step 1: PaymentIntent
  const paymentIntentMutation = useMutation({
    mutationFn: createPaymentIntentOnly,
  });

  // Step 2: Order after payment
  const createOrder = async (paymentIntentId) => {
    const res = await createOrderAfterPayment({ paymentIntentId });
    queryClient.invalidateQueries({ queryKey: ["cart"] });
    return res?.data?.order;
  };

  return {
    paymentIntentMutation,
    createOrder,
  };
};
