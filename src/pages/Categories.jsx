import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getProductsByParentCategory } from '../services/categoryService';
import ShowProducts from '../features/products/ShowProducts';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';

const Categories = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const categoryName = state?.name || "Unknown";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await getProductsByParentCategory(id);
        setProducts(response.data.products);
      } catch (err) {
        console.error('Error fetching category products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [id]);

  if (loading) return (
    <div className="pt-[130px] mx-auto w-[90%]">
      <LoadingSpinner size="lg" />
    </div>
  );

  return (
    <div className="pt-[130px]">
      <ShowProducts products={products} hideFilter categoryName={categoryName} title='' />
    </div>
  );
};

export default Categories;
