import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

export default function PaymentForm({ clientSecret, onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [postalCode, setPostalCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handlePayment = async () => {
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setLoading(true);
    setErrorMsg("");

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { address: { postal_code: postalCode } },
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      onPaymentSuccess(paymentIntent.id);
    } else {
      setErrorMsg(`Payment not completed. Status: ${paymentIntent.status}`);
    }
    setLoading(false);
  };

  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Enter Card Details
      </label>
      <div className="p-3 border rounded-lg mb-4 bg-gray-50">
        <CardElement />
      </div>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        ZIP / Postal Code
      </label>
      <input
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        placeholder="12345"
        className="w-full p-3 border rounded-lg mb-4"
      />

      {errorMsg && <p className="text-red-500 mb-3">{errorMsg}</p>}

      <button
        onClick={handlePayment}
        disabled={loading || !stripe}
        className="w-full py-2 px-4 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
