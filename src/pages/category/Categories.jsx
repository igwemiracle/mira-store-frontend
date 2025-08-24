import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../services/categoryService';
import ProductsSkeleton from '../../components/skeletons/ProductsSkeleton'

const Categories = () => {

  const [categories, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        console.log('API Response:', response); // ✅ log raw response
        console.log('Data:', response.data);

        // Use the correct key:
        setCategory(response.data.categories); // should be plural!
        setLoading(false);
      } catch (err) {
        console.error('API Error:', err.response || err.message);
        setError('Failed to load categories.');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex w-[90%] flex-col items-start justify-center mx-auto pt-[150px] font-karla">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      <div className="w-full grid grid-cols-6 gap-y-4 gap-x-4">
        {loading ? (
          <ProductsSkeleton count={6} imageHeight="h-40 w-[90rem]"
            cardClassName="min-w-[240px] max-w-[300px] p-4 rounded-md h-40" />
        ) : (
          categories.map((category) => (
            <div
              key={category._id}
              className="bg-gray-100 min-w-[200px] max-w-[300px] p-4"
            >
              <p className="font-medium mb-2 text-[18px]">{category.name}</p>

              {category.subcategories && category.subcategories.length > 0 && (
                <ul className="ml-4 list-disc flex flex-wrap gap-6">
                  {category.subcategories.map((sub) => (
                    <li key={sub._id} >{sub.name}</li>
                  ))}
                </ul>
              )}

              <Link
                to={`/parent/${category._id}`}
                state={{ name: category.name }}
                className="text-blue-400 hover:underline">
                View product
              </Link>
            </div>
          )))}

      </div>
    </div>
  );

}

export default Categories;