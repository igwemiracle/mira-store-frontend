import { useParams } from 'react-router-dom';
import StarRating from '../../components/StarRating';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { getAllProducts, getProductById } from '../../services/productService';
import { LoadingSpinner } from '../../components/UI/LoadingSpinner';
import { useCartDrawer } from '../../context/CartDrawerContext';
import { useAddToCart } from '../../features/cart/CartMutations';

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
    <div className="pt-[140px] flex items-center justify-center h-64">
      <LoadingSpinner size="lg" className="my-4" />
    </div>
  );
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  const similarProducts = allProducts.filter(
    item => item.category?.name === product.category?.name && item.id !== product.id
  );


  return (
    <div className='pt-[60px] bg-gray-100'>
      <section className="w-[90%] mx-auto flex gap-8 pt-[60px] font-lato border-b border-gray-200 pb-8 ">

        {/* Images */}
        <div className="flex-1 flex gap-8">
          {/* Side Thumbnails */}
          <div className="flex flex-col gap-2">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-20 h-20 object-cover border cursor-pointer hover:border-blue-500"
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
          <div className='flex gap-2'>

            {/* Add Cart */}
            <button
              type="button"
              className="flex justify-center items-center space-x-2 hover:bg-blue-500 py-2 px-4 text-white rounded bg-pink-500"
              onClick={
                () => {
                  handleAddToCart(product);
                  openCartDrawer();
                }
              }
              title="ADD TO CART"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path>
              </svg>
            </button>
            {/* Buy Now */}
            <button
              type="button"
              className="flex space-x-1 items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={() => handleAddToCart(product)}
              title="BUY NOW"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M312 24V34.5c6.4 1.2 12.6 2.7 18.2 4.2c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17c-10.9-2.9-21.1-4.9-30.2-5c-7.3-.1-14.7 1.7-19.4 4.4c-2.1 1.3-3.1 2.4-3.5 3c-.3 .5-.7 1.2-.7 2.8c0 .3 0 .5 0 .6c.2 .2 .9 1.2 3.3 2.6c5.8 3.5 14.4 6.2 27.4 10.1l.9 .3c11.1 3.3 25.9 7.8 37.9 15.3c13.7 8.6 26.1 22.9 26.4 44.9c.3 22.5-11.4 38.9-26.7 48.5c-6.7 4.1-13.9 7-21.3 8.8V232c0 13.3-10.7 24-24 24s-24-10.7-24-24V220.6c-9.5-2.3-18.2-5.3-25.6-7.8c-2.1-.7-4.1-1.4-6-2c-12.6-4.2-19.4-17.8-15.2-30.4s17.8-19.4 30.4-15.2c2.6 .9 5 1.7 7.3 2.5c13.6 4.6 23.4 7.9 33.9 8.3c8 .3 15.1-1.6 19.2-4.1c1.9-1.2 2.8-2.2 3.2-2.9c.4-.6 .9-1.8 .8-4.1l0-.2c0-1 0-2.1-4-4.6c-5.7-3.6-14.3-6.4-27.1-10.3l-1.9-.6c-10.8-3.2-25-7.5-36.4-14.4c-13.5-8.1-26.5-22-26.6-44.1c-.1-22.9 12.9-38.6 27.7-47.4c6.4-3.8 13.3-6.4 20.2-8.2V24c0-13.3 10.7-24 24-24s24 10.7 24 24zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5H192 32c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32H68.8l44.9-36c22.7-18.2 50.9-28 80-28H272h16 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H288 272c-8.8 0-16 7.2-16 16s7.2 16 16 16H392.6l119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384l0 0-.9 0c.3 0 .6 0 .9 0z"></path>
              </svg>
            </button>
            {/* Add to WishList */}
            <button
              type="button"
              className="flex space-x-1 items-center bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700"
              onClick={() => handleAddToCart(product)}
              title="ADD TO WISHLIST"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path>
              </svg>
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
      <section className="w-[90%] mx-auto mt-12">
        <h2 className="text-4xl font-bold font-lora pb-8">Similar Products</h2>
        {similarProducts.length > 0 ? (
          <div className="grid grid-cols-5 gap-6">
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


