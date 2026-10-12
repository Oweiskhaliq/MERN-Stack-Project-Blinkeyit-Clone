import { createSlice } from "@reduxjs/toolkit";

// 1. Try to get the saved user data from browser memory on page reload
const savedUser = localStorage.getItem("user");
const parsedUser = savedUser ? JSON.parse(savedUser) : null;

// 2. Fallback to these default values if no user is found logged in
const intialValue = {
  _id: parsedUser?._id || "",
  name: parsedUser?.name || "",
  email: parsedUser?.email || "",
  avatar: parsedUser?.avatar || "",
  mobile: parsedUser?.mobile || "",
  verify_email: parsedUser?.verify_email || false,
  last_login_date: parsedUser?.last_login_date || "",
  status: parsedUser?.status || "",
  address_details: parsedUser?.address_details || [],
  shopping_cart: parsedUser?.shopping_cart || [],
  orderHistory: parsedUser?.orderHistory || [],
  role: parsedUser?.role || "",
};

const userSlice = createSlice({
  name: "user",
  initialState: intialValue,
  reducers: {
    setUserDetails: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.mobile = action.payload.mobile;
      state.verify_email = action.payload.verify_email;
      state.last_login_date = action.payload.last_login_date;
      state.status = action.payload.status;
      state.address_details = action.payload.address_details;
      state.shopping_cart = action.payload.shopping_cart;
      state.orderHistory = action.payload.orderHistory;
      state.role = action.payload.role;
      // 🔥 FIX: Save user payload to localStorage so it stays on refresh
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    updatedAvatar: (state, action) => {
      state.avatar = action.payload;

      // 🔥 FIX: Keep localStorage updated when user profile picture changes
      const currentStoredUser = localStorage.getItem("user");
      if (currentStoredUser) {
        const updatedUser = { ...JSON.parse(currentStoredUser), avatar: action.payload };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    },
    logout: (state, action) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.avatar = "";
      state.mobile = "";
      state.verify_email = false;
      state.last_login_date = "";
      state.status = "";
      state.address_details = [];
      state.shopping_cart = [];
      state.orderHistory = [];
      state.role = "";
    },
  },
});

export const { setUserDetails, logout, updatedAvatar } = userSlice.actions;

export default userSlice.reducer;
