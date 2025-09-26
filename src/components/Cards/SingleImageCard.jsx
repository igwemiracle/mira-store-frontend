import React from 'react';
import { Link } from 'react-router-dom';

const SingleImageCard = ({ title, linkText, image, productId }) => (

  <div className="max-w-[400px] xs:p-4 lg:p-6 flex justify-between flex-col shadow-md bg-white">
    <h1 className="text-[22px] font-bold">{title}</h1>
    <Link to={`/products/${productId}`} className="flex flex-col items-start gap-2">
      <div className="w-full bg-blue-50 overflow-hidden">
        <img src={image} className=" w-full object-fit h-full" />
      </div>
      <p className="text-[11px] font-normal hover:text-gray-800 text-blue-900">
        {linkText}
      </p>
    </Link>
  </div>
);

export default SingleImageCard;
