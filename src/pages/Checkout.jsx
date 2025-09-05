import React from "react";
import { useMutation } from "@tanstack/react-query";
import { createPaymentIntentOnly, createOrderAfterPayment } from "../services/orderService";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

export default function CheckoutPage() {
  const stripe = useStripe();
  const elements = useElements();

  // -------------------
  // Step 1: Create PaymentIntent only
  const {
    mutate: handleCreatePaymentIntent,
    isLoading: isCreatingPaymentIntent,
    isError: paymentIntentError,
    error: paymentIntentErr,
    data: paymentIntentData,
    isSuccess: isPaymentIntentReady,
  } = useMutation({
    mutationFn: () => createPaymentIntentOnly(),
  });

  // -------------------
  // Step 2: Handle Stripe payment and then create order
  const handlePayment = async () => {
    if (!stripe || !elements) {
      return alert("Stripe not loaded yet");
    }

    if (!paymentIntentData?.clientSecret) {
      return alert("Missing client secret. Create payment intent first!");
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return alert("Card element not found");

    try {
      // Confirm card payment
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(paymentIntentData.clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              address: {
                postal_code: document.getElementById("postalCode")?.value || "",
              },
            },
          },
        });

      if (stripeError) {
        console.error("Stripe error:", stripeError);
        return alert(`❌ Payment failed: ${stripeError.message}`);
      }

      if (paymentIntent.status !== "succeeded") {
        return alert(`⚠️ Payment not completed. Status: ${paymentIntent.status}`);
      }

      alert("✅ Payment successful!");

      // -------------------
      // Step 3: Create order in DB
      try {
        // Pass as an object, backend expects { paymentIntentId }
        const orderResponse = await createOrderAfterPayment({
          paymentIntentId: paymentIntent.id,
        });

        // Axios wraps response.data
        const createdOrder = orderResponse?.data?.order;
        if (!createdOrder) {
          console.error("Order creation returned undefined:", orderResponse);
          return alert(
            "Payment succeeded but order creation failed: Invalid response from server"
          );
        }

        console.log("Order created:", createdOrder);
        alert(`✅ Order created successfully! Order ID: ${createdOrder._id}`);
      } catch (err) {
        console.error("Order creation error:", err);
        alert(
          "⚠️ Payment succeeded but order creation failed: " +
          (err.response?.data?.msg || err.message)
        );
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Unexpected error: " + err.message);
    }
  };


  return (
    <div className="max-w-lg mx-auto mt-56 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p className="text-gray-600 mb-6">
        Review your cart and proceed to payment.
      </p>

      {/* -------- Step 1: Create PaymentIntent -------- */}
      {!isPaymentIntentReady && (
        <button
          onClick={() => handleCreatePaymentIntent()}
          disabled={isCreatingPaymentIntent}
          className="w-full mt-6 py-2 px-4 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 disabled:opacity-50"
        >
          {isCreatingPaymentIntent ? "Processing..." : "Proceed to Payment"}
        </button>
      )}

      {paymentIntentError && (
        <p className="text-red-500 font-medium mt-2">
          Error: {paymentIntentErr?.response?.data?.msg || paymentIntentErr.message}
        </p>
      )}

      {/* -------- Step 2: Payment Form -------- */}
      {isPaymentIntentReady && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Card Details
          </label>
          <div className="p-3 border rounded-lg mb-4">
            <CardElement />
          </div>

          {/* Postal code input */}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ZIP / Postal Code
          </label>
          <input
            id="postalCode"
            type="text"
            placeholder="12345"
            className="w-full p-3 border rounded-lg mb-4"
          />

          <button
            onClick={handlePayment}
            disabled={!stripe}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 disabled:opacity-50"
          >
            Pay Now
          </button>
        </div>
      )}

      {/* Display summary */}
      {paymentIntentData?.amount && (
        <p className="mt-4 text-gray-700">
          Total: ${paymentIntentData.amount.toFixed(2)}
        </p>
      )}
    </div>
  );
}