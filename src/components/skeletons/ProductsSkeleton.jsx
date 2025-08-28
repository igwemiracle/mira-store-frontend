import React from 'react';

export default function ProductsSkeleton({ count = 4, imageHeight = "w-40 h-40", cardClassName = "" }) {
  return (
    <div className={`grid grid-cols-6 gap-x-[16rem] px-4 ${cardClassName}`}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`animate-pulse flex flex-col space-y-4 bg-gray-200 ${cardClassName}`}
        >
          <div className={`bg-gray-300 rounded ${imageHeight} w-full`}></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}
