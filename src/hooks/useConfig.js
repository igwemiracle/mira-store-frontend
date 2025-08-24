import { useEffect, useState } from 'react';
import { getCardsConfig, getSubcategoryById } from '../services/cardsConfigService';
import { getProductsBySubCategory } from '../services/categoryService';
import { getProductById } from '../services/productService';

const useCardsConfig = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const { data: config } = await getCardsConfig();
        const formattedCards = [];

        for (const card of config.cards || []) {

          switch (card.type) {
            case 'singleImage': {
              try {
                const { data } = await getProductById(card.productId);
                formattedCards.push({
                  ...card,
                  image: data.product?.images?.[0]?.url || 'https://via.placeholder.com/330',
                });
              } catch (err) {
                console.warn(`❌ Failed to fetch singleImage product: ${card.productId}`, err);
              }
              break;
            }

            case 'grid': {
              try {
                if (!card.categoryIds?.length) {
                  console.warn(`⚠️ Grid card "${card.title}" has no categoryIds`);
                  break;
                }

                // Fetch subcategories
                const subcategoryList = await Promise.all(
                  card.categoryIds.map(id =>
                    getSubcategoryById(id).then(res => res.data.category)
                  )
                );
                // Fetch one product per subcategory
                const productList = await Promise.all(
                  card.categoryIds.map(id =>
                    getProductsBySubCategory(id).then(res => res.data.products)
                  )
                );
                const items = card.categoryIds.map((id, index) => {
                  const sub = subcategoryList[index];
                  const products = productList[index] || [];

                  return {
                    image: products[0]?.images?.[0]?.url || 'https://via.placeholder.com/140',
                    name: sub?.name || `Category ${index + 1}`,
                    slug: sub?.slug || `category-${index + 1}`,
                    categoryId: id,
                  };
                });

                const parentCategoryId = subcategoryList[0]?.parentCategory;
                formattedCards.push({ ...card, items, parentCategoryId });

              } catch (err) {
                console.warn(`❌ Failed to fetch grid category data`, err);
              }
              break;
            }
            default:
              console.warn(`⚠️ Unknown card type: ${card.type}`);
              break;
          }
        }

        setCards(formattedCards);
      } catch (err) {
        console.error('❌ useCardsConfig error:', err);
        setError('Failed to load homepage content. Try refreshing or check your server.');
      }
    };

    fetchCards();
  }, []);

  return { cards, error };
};

export default useCardsConfig;