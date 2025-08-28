import React from 'react';

const CardSkeleton = () => (
  <div className="bg-white shadow-md p-5 space-y-4 animate-pulse">
    <div className="h-6 bg-gray-200 w-3/4 rounded" />
    <div className="grid grid-cols-2 gap-y-4 gap-x-7">
      {[...Array(4)].map((_, idx) => (
        <div key={idx}>
          <div className="h-[140px] bg-gray-200 rounded" />
          <div className="h-4 w-2/3 mt-2 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
    <div className="h-4 w-1/3 bg-gray-200 rounded" />
  </div>
);

export default CardSkeleton;
