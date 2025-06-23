import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import "./App.css";
import summaryApi from "./common/summaryApi";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { setAllCategory, setAllSubCategory } from "./store/productsSlice";
import { setUserDetails } from "./store/userSlice";
import Axios from "./Utils/Axios";
import fetchedUserDetails from "./Utils/fetchedUserDetails";

function App() {
  const dispatch = useDispatch();
  // Fetch user details from backend
  const fetchUser = async () => {
    try {
      const userData = await fetchedUserDetails();
      dispatch(setUserDetails(userData.data.data));
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };
  // fetch Category and set to store
  const fetchedCategory = async () => {
    try {
      const response = await Axios({
        ...summaryApi.getCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
        // setCategoryData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // fetch Category and set to store
  const fetchedSubCategory = async () => {
    try {
      const response = await Axios({
        ...summaryApi.getSubCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data));
        // setCategoryData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // On first load, fetch user from server
  useEffect(() => {
    fetchUser();
    fetchedCategory();
    fetchedSubCategory();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
