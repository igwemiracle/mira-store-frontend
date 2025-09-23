import React from 'react';

const CartSkeleton = () => {
  return (
    <div className="w-full flex-center flex-col animate-pulse">
      {/* Subtotal Section Skeleton */}
      <div className="w-[8.5%] bg-white flex-center flex-col gap-2 fixed top-0 z-10 p-4">
        <div className="h-5 w-16 bg-gray-300 rounded"></div>
        <div className="h-4 w-14 bg-gray-200 rounded"></div>
        <div className="bg-gray-300 w-[90%] rounded-md py-2"></div>
      </div>

      {/* Cart Items Skeleton */}
      <div className="w-full flex-center flex-col gap-4 mt-36">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="w-full flex-center flex-col border-t border-gray-300 py-4 px-4"
          >
            {/* Image */}
            <div className="mb-2">
              <div className="w-24 h-24 bg-gray-200 rounded object-contain" />
            </div>

            {/* Product Name */}
            <div className="h-4 w-32 bg-gray-300 rounded mb-1 "></div>
            {/* Product Price */}
            <div className="h-4 w-20 bg-gray-200 rounded mb-3"></div>

            {/* Quantity Actions */}
            <div className="flex-c-between gap-6 border-2 border-gray-300 py-1 px-3 rounded-full min-w-[130px]">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartSkeleton;