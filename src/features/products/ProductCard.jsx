import { Link } from 'react-router-dom';
import StarRating from '../../components/StarRating';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../../services/cartService';
import { useAddToCart } from '../cart/CartMutations';
import { useCartDrawer } from '../../context/CartDrawerContext';
import { requireAuth } from '../../utils/authCheck';
import QuantityControls from '../../components/QuantityControls';
import { useCartActions } from '../../hooks/useCartActions';

export default function ProductCard({ product }) {
  const { mutate: addToCart } = useAddToCart();
  const { openCartDrawer } = useCartDrawer();
  const { isUpdating, handleIncrement, handleDecrement, handleRemove } = useCartActions();

  const price = Number(product.price) || 0;
  const rating = Number(product.rating) || 0;
  const oldPrice = Number(product.oldPrice) || price * 1.2;
  const discount = product.discount || Math.max(0, ((1 - price / oldPrice) * 100).toFixed(2));

  // Get cart data
  const { data: cartData } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  });
  const cartItems = cartData?.data?.cart?.items || [];
  const cartItem = cartItems.find((item) => item.product._id === product._id);

  const handleAddToCart = () => {
    addToCart(product);
    openCartDrawer();
  };

  return (
    <div className='bg-white lg:p-4 rounded-md flex xs:justify-between lg:flex-col lg:items-start 
    xs:w-[95%] mx-auto lg:max-w-xs'>
      {/* Product Image */}
      <div className='basis-[50%] rounded-md overflow-hidden mb-2'>
        <img
          src={product.images?.[0]?.url || "https://via.placeholder.com/300x300?text=No+Image"}
          alt={product.name}
          className="w-full h-64 object-scale-down lg:mb-3"
        />
      </div>

      <div className='basis-[50%] p-1'>
        {/* Brand / Featured Label */}
        <span className="xs:text-[10px]
        lg:text-xs text-gray-500 mb-1">
          Featured from {product.brand || "Our store"}
        </span>

        {/* Product Name */}
        <Link to={`/product/${product._id}`} className="hover:underline">
          <h3 className="font-medium xs:text-[13px] lg:text-[20px] text-gray-900 leading-snug mb-1">
            {product.name.length > 50
              ? product.name.slice(0, 140) + '...'
              : product.name}
          </h3>
        </Link>

        {/* Star Rating + Reviews */}
        <div className="flex gap-1 mb-1">
          <StarRating rating={rating} />
          <span className="text-sm text-blue-600">{rating.toFixed(1)}</span>
          <span className="text-sm text-gray-500">({product.reviewsCount || 0})</span>
        </div>

        {/* Price */}
        <div className="text-[28px] font-semibold text-gray-900 mb-1">
          <sup className='text-gray-500 text-[16px] mb-8 mr-0.5'>$</sup>{price.toFixed(2)}
        </div>

        {/* Delivery Info */}
        <p className="text-[16px] text-gray-600">
          Delivery <span className="font-semibold">Fri, Sep 5</span>
        </p>
        <p className="text-xs text-gray-500 mb-3">Ships to Nigeria</p>

        {/* Add to Cart OR Quantity Controls */}
        {!cartItem ? (
          <button
            type="button"
            className="xs:text-[12px]
            bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-3 rounded-full w-full"
            onClick={() => requireAuth(() => handleAddToCart())}
          >
            Add to cart
          </button>
        ) : (
          <QuantityControls
            productId={product._id}
            quantity={cartItem.quantity}
            isUpdating={isUpdating}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRemove={handleRemove}
            className="w-full"
          />
        )}
      </div>
    </div>
  );
}