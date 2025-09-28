import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { addToCart, getCart } from "../../services/cartService";

const ShowProducts = ({ products, title = "Trending Products", hideFilter = false, categoryName }) => {
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [cart, setCart] = useState([]);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
      const response = await getCart();
      setCart(response.data.cart);
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  // Categories for filter
  const categories = ["All", ...new Set(products.map((p) => p.category?.name || p.category))];

  // Filtered products
  const filteredProducts =
    filteredCategory === "All"
      ? products
      : products.filter((p) => p.category?.name === filteredCategory);

  return (
    <section className="grid md:grid-cols-3 lg:grid-cols-5 gap-2 md:w-[95%] lg:w-[90%] xs:w-[100%] mx-auto">
      {products.length === 0 ? (
        <div className="col-span-4 flex flex-col items-center justify-center py-20 text-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 mb-4 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl font-semibold mb-2">No products available</h2>
          <p className="text-sm">
            We couldn’t find any products for this category right now.
          </p>
        </div>
      ) : (
        filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))
      )}

    </section>
  );
};

export default ShowProducts;