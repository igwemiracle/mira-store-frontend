import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCartThunk } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { updateCartQuantity, removeFromCart } from '../services/cartService';
import { useState } from 'react';

export function useCartActions() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState(null);

  const updateQuantityMutation = useMutation({
    mutationFn: ({ productId, quantity }) => updateCartQuantity(productId, quantity),
    onMutate: ({ productId }) => setIsUpdating(productId),
    onSettled: () => setIsUpdating(null),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['cart']);
      dispatch(getCartThunk());
    }
  });

  const removeMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['cart']);
      dispatch(getCartThunk());
    }
  });

  const handleIncrement = (productId, currentQty) => {
    updateQuantityMutation.mutate({ productId, quantity: currentQty + 1 });
  };

  const handleDecrement = (productId, currentQty) => {
    if (currentQty === 1) {
      removeMutation.mutate(productId);
    } else {
      updateQuantityMutation.mutate({ productId, quantity: currentQty - 1 });
    }
  };

  return {
    isUpdating,
    handleIncrement,
    handleDecrement,
    handleRemove: removeMutation.mutate,
  };
}