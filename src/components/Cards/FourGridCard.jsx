import React from 'react';
import { Link } from 'react-router-dom';

const FourGridCard = ({ title, linkText, items, parentCategoryId }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="max-w-[400px] xs:p-4 lg:p-6 flex justify-between flex-col shadow-md bg-white space-y-1 ">
      <h1 className="sm:text-[15px] lg:text-[21px] font-bold">{title}</h1>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div key={index}>
            <Link to={`/products/subcategory/${item.categoryId}`}>
              <img src={item.image} alt={item.name} className="sm:w-[100px] sm:h-[90px] lg:h-[125px] lg:w-[150px] object-fit" />
              <p className="sm:text-[10px] lg:text-[13px]">
                {item.name}
              </p>
            </Link>
          </div>
        ))}
      </div>
      <Link
        to={`/products/parent/${parentCategoryId}`}
        className="text-[11px] font-normal hover:text-gray-800 text-blue-900"
      >
        {linkText}
      </Link>
    </div>
  );
};
export default FourGridCard;