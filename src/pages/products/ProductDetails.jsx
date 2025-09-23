import { useParams } from 'react-router-dom';
import StarRating from '../../components/StarRating';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../features/products/ProductCard';
import { getAllProducts, getProductById } from '../../services/productService';
import { LoadingSpinner } from '../../components/UI/LoadingSpinner';
import { useCartDrawer } from '../../context/CartDrawerContext';
import { useAddToCart } from '../../features/cart/CartMutations';
import { ShoppingCart, CreditCard, Heart } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const { mutate } = useAddToCart();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mainImage, setMainImage] = useState('');
  const { openCartDrawer } = useCartDrawer();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const single = await getProductById(id);
        const all = await getAllProducts();

        setProduct(single.data.product);
        setAllProducts(all.data.products);

        // Set default main image
        if (single.data.product.images?.length > 0) {
          setMainImage(single.data.product.images[0].url);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    mutate(product);
    openCartDrawer();
  };

  if (loading) return (
    <div className="xs:my-50 lg:my-80 flex-center h-64">
      <LoadingSpinner size="lg" className="my-4" />
    </div>
  );
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  const similarProducts = allProducts.filter(
    item => item.category?.name === product.category?.name && item.id !== product.id
  );


  return (
    <div className='xs:mt-[150px] lg:mt-[160px] xs:w-[100%] lg:w-[90%] mx-auto p-2'>
      <section className="flex lg:flex-row justify-between gap-12 font-lato border-b border-gray-200 pb-8
       xs:flex-col
      ">

        {/* Images */}
        <div className="flex-1 flex gap-8">
          {/* Side Thumbnails */}
          <div className="flex flex-col gap-2">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-20 h-20 object-cover border hover:border-blue-500"
                onClick={() => setMainImage(img.url)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <img src={mainImage} alt={product.name} className="w-full object-cover" />
          </div>
        </div>

        {/* Product details */}
        <div className="flex-1 space-y-2">
          <h1 className='text-[24px]'>{product.name}</h1>
          <div className="flex items-center gap-2">
            <StarRating rating={product.rating} />
            <p className="text-gray-600">{product.rating}</p>
          </div>
          <div className="text-[#3B82F6] text-[20px] font-medium">${product.price}</div>
          <p className="text-[16px] text-gray-500">
            <span className='text-black pr-4'>
              Category
            </span>
            {product.category?.name}
          </p>
          <p className="mt-4">
            About this product <br />
            {product.description}
          </p>

          {/* Action Buttons */}
          <div className='flex flex-wrap gap-2 sm:gap-3'>
            {/* Add to Cart */}
            <button
              type="button"
              className="flex items-center gap-2 hover:bg-blue-500 py-2 px-4 text-white rounded bg-pink-500"
              onClick={() => { handleAddToCart(product); openCartDrawer(); }}
              title="ADD TO CART"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>

            {/* Buy Now */}
            <button
              type="button"
              className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={() => handleAddToCart(product)}
              title="BUY NOW"
            >
              <CreditCard size={18} /> Buy Now
            </button>

            {/* Add to Wishlist */}
            <button
              type="button"
              className="flex items-center gap-2 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700"
              onClick={() => handleAddToCart(product)}
              title="ADD TO WISHLIST"
            >
              <Heart size={18} /> Wishlist
            </button>
          </div>
        </div>

        {/* User Reviews */}
        <div className="flex-1">
          <h1 className='text-[24px]'>Reviews</h1>
          {/* Render reviews properly */}
          {product.reviews?.length > 0 ? (
            product.reviews.map((review, idx) => (
              <div key={idx} className="mb-4">
                <p className="font-bold">{review.username}</p>
                <StarRating rating={review.rating} />
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </section>

      {/* Similar Products Placeholder */}
      <section className="w-[100%] mx-auto mt-12">
        <h2 className="text-4xl font-bold font-lora pb-8">Similar Products</h2>
        {similarProducts.length > 0 ? (
          <div className="grid lg:grid-cols-5 gap-2 place-items-center w-[100%]">
            {similarProducts.map((item) => (
              <ProductCard key={item.id} product={item} handleAddToCart={handleAddToCart} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No similar products found.</p>
        )}
      </section>
    </div>
  );
};

export default ProductDetails;