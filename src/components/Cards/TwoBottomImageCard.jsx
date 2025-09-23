import React from 'react';
import { Link } from 'react-router-dom';

const TwoBottomImageCard = ({ title, linkText, items }) => (
  <div className="max-h-[460px] py-6 px-5 flex-c-between flex-col shadow-md">
    <h1 className="text-[20px] font-bold">{title}</h1>
    <div className="space-y-4">
      {items.length > 0 && (
        <div>
          <img src={items[0].image} alt={items[0].name} className='w-full h-[150px] object-contain' />
          <Link className="text-[13px]">{items[0].name}</Link>
        </div>
      )}

      <div className="flex gap-2">
        {items.slice(1).map((item, index) => (
          <div key={index}>
            <img
              src={item.image}
              alt={item.name}
              className="h-[100px] w-[125px] object-fit"
            />
            <Link className="text-[13px]">{item.name}</Link>
          </div>
        ))}
      </div>
    </div>

    <Link className="text-[13px] font-normal hover:text-gray-800 pt-3" to="/products">
      {linkText}
    </Link>
  </div>
);

export default TwoBottomImageCard;


