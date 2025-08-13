import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  cart: [],
};

const cartProductSlice = createSlice({
  name: "cartItem",
  initialState: intialState,
  reducers: {
    handleAddToCart: (state, action) => {
      state.cart = [...action.payload];
    },
  },
});
export const { handleAddToCart } = cartProductSlice.actions;
export default cartProductSlice.reducer;
