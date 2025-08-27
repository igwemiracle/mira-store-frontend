import React from 'react';
import { Link } from 'react-router-dom';

const SingleImageCard = ({ title, linkText, image, productId }) => (

  <div>
    <div className='h-[460px] p-6 flexBetween flex-col gap-3 shadow-md bg-white'>
      <h1 className="text-[22px] font-bold">{title}</h1>
      <Link to={`/products/${productId}`} className="flex flex-col items-start gap-2">
        <div className="w-full bg-blue-50 h-[300px] overflow-hidden">
          <img src={image} className="w-full object-fit h-full" />
        </div>
        <p className="text-[13px] font-normal hover:text-gray-800 pt-3">
          {linkText}
        </p>
      </Link>
    </div>
  </div>
);

export default SingleImageCard;
