import React from 'react';
import { Link } from 'react-router-dom';

const SingleImageCard = ({ title, linkText, image, productId }) => {

  return (
    <div className="max-w-[400px] xs:py-4 xs:px-2 lg:p-6 flex justify-between flex-col shadow-md bg-white">
      <h1 className="xs:text-[18px] sm:text-[15px] lg:text-[21px] font-bold xs:ml-4 sm:ml-0">{title}</h1>
      <Link to={`/products/${productId}`} className="flex flex-col items-start gap-2">
        <div className="w-full bg-blue-50 overflow-hidden">
          <img src={image} className=" w-full object-fit h-full" />
        </div>
        <p className="text-[13px] font-normal hover:text-gray-800 text-blue-900 xs:ml-4 sm:ml-0">
          {linkText}
        </p>
      </Link>
    </div>
  );
};

export default SingleImageCard;
