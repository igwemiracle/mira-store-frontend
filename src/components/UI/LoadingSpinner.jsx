import React from 'react';
import './loader.css'

export const LoadingSpinner = ({
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-14 w-14'
  };

  return (
    <div className={`loader ${sizeClasses[size]} ${className}`} />
  );
};

// Use like this in another file
{/* <LoadingSpinner size="lg" className="my-4" /> */ }
