import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import summaryApi from "./common/summaryApi";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "./store/productsSlice";
import { setUserDetails } from "./store/userSlice";

import Axios from "./Utils/Axios";
import fetchedUserDetails from "./Utils/fetchedUserDetails";
import CartMobile from "./components/CartMobile";
import GlobalProvider from "./provider/GlobalProvider";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  // Fetch user details from backend safely
  const fetchUser = async () => {
    // 1. Guard: Stop the request if no user is signed in yet
    if (!localStorage.getItem("accessToken")) {
      console.log("No access token found. Skipping user profile fetch.");
      return; 
    }

    try {
      const response = await fetchedUserDetails();
      
      // 2. Safe parsing: Verify deep fields exist before dispatching
      if (response?.data?.data) {
        dispatch(setUserDetails(response.data.data));
      }
    } catch (error) {
      console.error("Failed to fetch user:", error.message || error);
    }
  };

  // Fetch Category and set to store
  const fetchedCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...summaryApi.getCategory,
      });
      const { data: responseData } = response;
      if (responseData?.success) {
        dispatch(setAllCategory(responseData.data));
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  // Fetch SubCategory and set to store
  const fetchedSubCategory = async () => {
    try {
      const response = await Axios({
        ...summaryApi.getSubCategory,
      });
      const { data: responseData } = response;
      if (responseData?.success) {
        dispatch(setAllSubCategory(responseData.data));
      }
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
    }
  };

  // On first load, execute all bootstrapping API calls
  useEffect(() => {
    fetchUser();
    fetchedCategory();
    fetchedSubCategory();
  }, []);

  return (
    <GlobalProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      {/* Mobile response card */}
      {location.pathname !== "/checkout" && <CartMobile />}
    </GlobalProvider>
  );
}

export default App;
