import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  allCategory: [],
  allSubCategory: [],
  products: [],
};
const productsSlice = createSlice({
  name: "products",
  initialState: initialValue,
  reducers: {
    setAllCategory: (state, action) => {
      state.allCategory = [...action.payload];
    },
    setAllSubCategory: (state, action) => {
      state.allSubCategory = [...action.payload];
    },
  },
});
export const { setAllCategory, setAllSubCategory } = productsSlice.actions;
export default productsSlice.reducer;
