import React from 'react';
import { Link } from 'react-router-dom';

const FourGridCard = ({ title, linkText, items, parentCategoryId }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="max-w-[400px] xs:py-4 xs:px-2 sm:p-4 md:py-2 lg:p-6 flex justify-between flex-col shadow-md bg-white space-y-4 ">
      <h1 className=" xs:text-[18px] sm:text-[15px] lg:text-[21px] font-bold xs:ml-4 sm:ml-0">{title}</h1>
      <div
        className='grid xs:grid-cols-2 xs:gap-y-9 md:gap-y-2 lg:gap-y-6 xs:gap-x-4 place-items-center'
      >
        {items.map((item, index) => (
          <Link key={index} to={`/products/subcategory/${item.categoryId}`} className="flex flex-col items-center gap-2">
            <img src={item.image} alt={item.name} className="xs:w-[150px] xs:h-[110px] object-fit" />
            <p className="
            sm:text-[12px] lg:text-[13px] ">
              {item.name}
            </p>
          </Link>
        ))}
      </div>
      <Link
        to={`/products/parent/${parentCategoryId}`}
        className="text-[13px] font-normal hover:text-gray-800 text-blue-900 xs:ml-4 sm:ml-0"
      >
        {linkText}
      </Link>
    </div>
  );
};
export default FourGridCard;