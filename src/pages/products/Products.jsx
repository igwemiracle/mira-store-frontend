import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProductsByParentCategory,
  getProductsBySubCategory
} from "../../services/categoryService";
import ProductsSection from "../../features/products/ProductsSection";
import ProductsSkeleton from "../../components/skeletons/ProductsSkeleton";
import { LoadingSpinner } from "../../components/UI/LoadingSpinner";

export default function Products() {
  const { type, id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (type === "parent") {
          // ✅ Fetch products for parent category
          const prodRes = await getProductsByParentCategory(id);
          setProducts(prodRes.data.products);

        } else if (type === "subcategory") {
          // ✅ Fetch products for subcategory
          const prodRes = await getProductsBySubCategory(id);
          setProducts(prodRes.data.products);
        }

      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [type, id]);

  if (loading)
    return (
      <div className="flex justify-center items-center xs:my-80 lg:my-96 mx-auto w-[90%]">
        {/* <div className="pt-[130px] mx-auto w-[90%]"> */}
        {/* <ProductsSkeleton
          count={4}
          imageHeight="h-48"
          cardClassName="min-w-[350px] max-w-[300px] gap-x-[24rem]"
        /> */}
        <LoadingSpinner size="lg" />
      </div>
    );

  return (
    <div className="pt-[160px]">
      <ProductsSection
        products={products}
        hideFilter={true}
        title=""
      />
    </div>
  );
}