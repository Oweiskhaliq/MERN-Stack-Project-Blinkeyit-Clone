import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartProductSlice";
import productsSlice from "./productsSlice";
import userReducer from "./userSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsSlice,
    cartItem: cartReducer,
  },
});
