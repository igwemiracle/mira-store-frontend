import React from "react";
import { useCheckout } from "../hooks/useCheckout";
import { useCart } from "../hooks/useCart";
import PaymentForm from "./PaymentForm";
import OrderSummary from "../components/OrderSummary";
import { LoadingSpinner } from "../components/UI/LoadingSpinner";
import OrderSummarySkeleton from "../components/skeletons/OrderSummarySkeleton";

export default function CheckoutPage() {
  const { paymentIntentMutation, createOrder } = useCheckout();
  const { data: cartData, isLoading: cartLoading } = useCart();
  console.log("Cart from backend:", cartData);


  const handleOrder = async (paymentIntentId) => {
    try {
      const order = await createOrder(paymentIntentId);
      if (!order) throw new Error("Order creation failed");
      alert(`✅ Order created successfully! Order ID: ${order._id}`);
    } catch (err) {
      alert(`⚠️ ${err.message}`);
    }
  };

  return (
    <div className="xs:w-[100%] lg:w-[95%] mx-auto mt-24 p-4 sm:p-6">
      <h1 className="text-4xl font-extrabold my-8 text-center text-gray-900">
        Checkout
      </h1>

      <div className="flex xs:flex-col lg:flex-row justify-center gap-10">

        {/* Left Column: Order Summary */}
        <div>
          {cartLoading ? (
            <OrderSummarySkeleton />
          ) : (
            <OrderSummary
              cart={cartData?.data?.cart}
              isProcessing={paymentIntentMutation.isLoading}
              onProceedToPayment={() => paymentIntentMutation.mutate()}
            />
          )}
          {paymentIntentMutation.isError && (
            <p className="text-red-500 font-medium mt-4">
              {paymentIntentMutation.error?.response?.data?.msg ||
                paymentIntentMutation.error?.message}
            </p>
          )}
        </div>

        {/* Right Column: Payment Form (appear only after Proceed) */}
        <div className="">
          {paymentIntentMutation.isSuccess && (
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <PaymentForm
                clientSecret={paymentIntentMutation.data?.clientSecret}
                onPaymentSuccess={handleOrder}
              />
            </div>
          )}
        </div>
      </div>
    </div>



  );
}
