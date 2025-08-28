// cartSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCart, addToCart, removeFromCart } from '../../services/cartService';

// Thunks
export const getCartThunk = createAsyncThunk('cart/getCart', async () => {
  const response = await getCart();
  return response.data.cart;
});


export const addToCartThunk = createAsyncThunk('cart/addToCart', async (product, thunkAPI) => {
  await addToCart(product);
  const res = await getCart(); // re-fetch updated cart
  return res.data.cart;
});

export const removeFromCartThunk = createAsyncThunk('cart/removeFromCart', async (productId, thunkAPI) => {
  await removeFromCart(productId);
  const res = await getCart(); // re-fetch updated cart
  return res.data.cart;
});

// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
    loading: false,
    error: null,
  },
  reducers: {
    SET_CART(state, action) {
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartThunk.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      });
  },
});

export const { SET_CART } = cartSlice.actions;
export default cartSlice.reducer;