import { useState, useEffect } from "react";
import { getAllCategories, getProductsBySubCategory } from "../services/categoryService";

const useCategoryProducts = ({
  parentCategoryName,
  subCategoryName, // optional
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getAllCategories();
        const categories = res.data?.categories || [];

        const parentCategory = categories.find(
          (cat) => cat.name.toLowerCase() === parentCategoryName?.toLowerCase()
        );

        if (!parentCategory || !parentCategory.subcategories?.length) {
          throw new Error("Parent category or subcategories not found");
        }

        const subCat =
          parentCategory.subcategories.find(
            (sub) => sub.name.toLowerCase() === subCategoryName?.toLowerCase()
          ) || parentCategory.subcategories[0];

        if (!subCat) throw new Error("No valid subcategory found");

        const productRes = await getProductsBySubCategory(subCat._id);
        const fetched = productRes.data?.products || productRes.data || [];

        setProducts(fetched);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    if (parentCategoryName) {
      fetchProducts();
    }
  }, [parentCategoryName, subCategoryName]);

  return { products, loading, error };
};

export default useCategoryProducts;
