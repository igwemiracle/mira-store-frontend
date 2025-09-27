import React from "react";
import { useLocation } from "react-router-dom";
import { useCheckout } from "../hooks/useCheckout";
import { useCart } from "../hooks/useCart";
import PaymentForm from "./PaymentForm";
import OrderSummary from "../components/OrderSummary";
import OrderSummarySkeleton from "../components/skeletons/OrderSummarySkeleton";

export default function CheckoutPage() {
  const location = useLocation();
  const { paymentIntentMutation, createOrder } = useCheckout();
  const { data: cartData, isLoading: cartLoading } = useCart();

  // Get clientSecret passed from CartSlider via navigate
  const clientSecretFromState = location.state?.clientSecret;

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
    <div className=" w-[100%]  mx-auto mt-32 p-4 sm:p-6">
      {/* <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">Checkout</h1> */}

      <div className="flex xs:flex-col xs:items-center sm:items-start sm:flex-row justify-center gap-3">
        {/* -------- Order Summary -------- */}
        <div>
          {cartLoading ? (
            <OrderSummarySkeleton />
          ) : (
            <OrderSummary cart={cartData?.data?.cart} />
          )}
        </div>

        {/* -------- Payment Form -------- */}
        <div className="">
          {/* Show PaymentForm if clientSecret exists or mutation succeeded */}
          {(clientSecretFromState || paymentIntentMutation.isSuccess) && (
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <PaymentForm
                clientSecret={
                  clientSecretFromState ||
                  paymentIntentMutation.data?.clientSecret
                }
                onPaymentSuccess={handleOrder}
              />
            </div>
          )}
          {/* Optional: show a loader while waiting for mutation */}
          {paymentIntentMutation.isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
