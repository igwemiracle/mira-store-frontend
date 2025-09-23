import React from 'react';
import { PlusIcon, TrashIcon, MinusIcon } from 'lucide-react';
import { LoadingSpinner } from './UI/LoadingSpinner';

export default function QuantityControls({
  productId,
  quantity,
  isUpdating,
  onIncrement,
  onDecrement,
  onRemove,
  className = ""
}) {
  return (
    <div className={`flex justify-between items-center gap-6 border-[#FA801D] border-2 py-1 px-3 rounded-full  ${className}`}>
      {/* Left Button */}
      <div className="w-6 h-6 flex-center">
        {quantity > 1 ? (
          <button
            onClick={() => onDecrement(productId, quantity)}
            className="text-[#FA801D] hover:text-[#d86e12] transition"
          >
            <MinusIcon />
          </button>
        ) : (
          <button
            onClick={() => onRemove(productId)}
            className="text-red-500 hover:text-red-600 transition"
          >
            <TrashIcon />
          </button>
        )}
      </div>

      {/* Quantity */}
      <div className="w-6 h-6 flex flex-center">
        {isUpdating === productId ? (
          <LoadingSpinner />
        ) : (
          <span className="text-sm font-medium">{quantity}</span>
        )}
      </div>

      {/* Right Button */}
      <div className="w-6 h-6 flex flex-center">
        <button
          onClick={() => onIncrement(productId, quantity)}
          className="text-[#FA801D] hover:text-[#d86e12] transition"
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}
