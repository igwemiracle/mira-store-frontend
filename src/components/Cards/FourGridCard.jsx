import React from 'react';
import { Link } from 'react-router-dom';

const FourGridCard = ({ title, linkText, items, parentCategoryId }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="max-h-[460px] p-6 flex-c-between flex-col shadow-md gap-2 bg-white">
      <h1 className="text-[21px] font-bold">{title}</h1>
      <div className="grid grid-cols-2 gap-y-6 gap-x-4">
        {items.map((item, index) => (
          <div key={index}>
            <Link to={`/products/subcategory/${item.categoryId}`}>
              <img src={item.image} alt={item.name} className="h-[125px] w-[150px] object-fit" />
              <p className="text-[13px]">
                {item.name}
              </p>
            </Link>
          </div>
        ))}
      </div>
      <Link
        to={`/products/parent/${parentCategoryId}`}
        className="text-[11px] font-normal hover:text-gray-800 pt-3 text-blue-900"
      >
        {linkText}
      </Link>
    </div>
  );
};
export default FourGridCard;