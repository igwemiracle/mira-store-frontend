import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../../services/cartService';
import CartSkeleton from '../../components/skeletons/CartSkeleton';
import QuantityControls from '../../components/QuantityControls';
import { useCartActions } from '../../hooks/useCartActions';

export default function CartSlider() {
  const { isUpdating, handleIncrement, handleDecrement, handleRemove } = useCartActions();

  const { data, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  });

  const cart = data?.data?.cart;

  if (isLoading) return <CartSkeleton />;
  if (!cart || cart.items.length === 0) return <p className='text-center'>Your cart is empty.</p>;

  return (
    <div className="w-full flexCenter flex-col">
      {/* Subtotal Section */}
      <div className="w-[8.5%] bg-white flexCenter flex-col gap-2 fixed top-0 z-10 p-4">
        <h1 className="text-lg font-semibold">Subtotal</h1>
        <h2 className="text-base font-normal">${cart.totalPrice?.toFixed(2) || '0.00'}</h2>
        <button className="bg-[#FA801D] w-[90%] text-white rounded-md py-2 text-sm hover:bg-[#e57114] transition">
          CHECKOUT
        </button>
      </div>

      {/* Cart Items Section */}
      <div className="w-full flexCenter flex-col gap-4 mt-36">
        {cart.items.map((item) => (
          <div
            key={item._id}
            className="w-full flexCenter flex-col border-t border-gray-300 py-4 px-4"
          >
            <div className="mb-2">
              <img
                src={item.product.images?.[0]?.url || "https://via.placeholder.com/300x300?text=No+Image"}
                alt={item.product.name}
                className="w-24 h-24 object-contain"
              />
            </div>

            {/* <p className="text-sm font-medium text-gray-800 mb-1">{item.product.name}</p> */}
            <p className="text-[17px] font-bold mb-3">${item.product.price?.toFixed(2) || '0.00'}</p>

            {/* Quantity and Actions */}
            <QuantityControls
              productId={item.product._id}
              quantity={item.quantity}
              isUpdating={isUpdating}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={handleRemove}
              className='min-w-[30px]'
            />
          </div>
        ))}
      </div>
    </div>
  );
}