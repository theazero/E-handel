import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer, // Lägg till cartReducer här
  },
});

export default store;
