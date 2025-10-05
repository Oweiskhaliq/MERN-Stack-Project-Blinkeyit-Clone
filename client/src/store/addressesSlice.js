import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  addresses: [],
};

const addressesSlice = createSlice({
  name: "addresses",
  initialState: initialValue,
  reducers: {
    handleAddAddress: (state, action) => {
      state.addresses = [...action.payload];
    },
  },
});

export const { handleAddAddress } = addressesSlice.actions;
export default addressesSlice.reducer;
