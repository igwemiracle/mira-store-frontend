import React from "react";

export default function OrderSummarySkeleton() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 animate-pulse xs:w-[290px] sm:w-[400px] md-w-[400px] lg:w-[450px]">
      {/* Title */}
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>

      {/* Skeleton items */}
      <div className="space-y-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-12"></div>
          </div>
        ))}
      </div>

      {/* Subtotal / shipping / taxes */}
      <div className="border-y py-4 mb-6 space-y-2">
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-12"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-28"></div>
          <div className="h-3 bg-gray-200 rounded w-14"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-24"></div>
          <div className="h-3 bg-gray-200 rounded w-10"></div>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between mb-6">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-12"></div>
      </div>

      {/* Button */}
      <div className="h-10 bg-gray-200 rounded-xl w-full"></div>
    </div>
  );
}
