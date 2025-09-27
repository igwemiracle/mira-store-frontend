import React from "react";

export default function OrderSummary({ cart, onProceedToPayment, isProcessing }) {
  const items = cart?.items || [];

  const subtotal = cart?.subtotal || items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = cart?.shippingFee || 5; // fallback value
  const taxes = cart?.tax || subtotal * 0.08; // fallback 8% tax
  const total = cart?.totalPrice || subtotal + shippingFee + taxes;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 flex flex-col xs:w-[100%] sm:w-[100%] md-w-[400px] lg:w-[450px]">
      <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

      {/* Items */}
      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4 max-h-80 overflow-y-auto mb-6">
          {items.map((item) => (
            <div key={item._id} className="flex items-center gap-4">
              <img
                src={item.product.images[0]?.url}
                alt={item.product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Subtotal / Shipping / Taxes */}
      <div className="border-y py-4 mb-6 text-gray-700 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span>${shippingFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes</span>
          <span>${taxes.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between text-gray-800 font-semibold text-lg mb-6">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
