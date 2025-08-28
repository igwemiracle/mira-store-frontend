import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { addToCart, getCart } from "../../services/cartService";

const ProductsSection = ({ products, title = "Trending Products", hideFilter = false, categoryName }) => {
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
    <section className="w-[90%] mx-auto">
      <div className="flex justify-between items-center">
        {categoryName ? (
          <Link to={"/categories"} className="text-lg font-normal font-karla hover:underline">
            Categories &gt; {categoryName}
          </Link>
        ) : (
          <h1 className="text-4xl font-bold font-lora">{title}</h1>
        )}

        {!hideFilter && (
          <select
            className="border border-gray-300 rounded-md px-4 py-2"
            value={filteredCategory}
            onChange={(e) => setFilteredCategory(e.target.value)}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        )}
      </div>

      <div className="grid lg:grid-cols-5 gap-2 ">
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
      </div>

    </section>
  );
};

export default ProductsSection;