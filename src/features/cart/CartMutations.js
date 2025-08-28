import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToCart, getCart } from '../../services/cartService';
import { useDispatch } from 'react-redux';
import { SET_CART } from '../../redux/slices/cartSlice';


export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (product) => addToCart(product),
    onSuccess: async () => {
      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: ['cart'] });

      // Optionally: fetch the latest cart and dispatch to Redux
      const response = await getCart();
      const { items, totalPrice } = response.data.cart || {};
      dispatch(SET_CART({ items, totalPrice }));
    },
  });
};
