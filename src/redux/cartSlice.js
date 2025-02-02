import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Lista över produkter i varukorgen
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {

      console.log('Adding to cart:', action.payload); // Logga produktdata
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1; // Öka kvantiteten om produkten redan finns
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Lägg till ny produkt
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload._id);
    },
    clearCart: (state) => {
      state.items = []; // Töm hela varukorgen
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
