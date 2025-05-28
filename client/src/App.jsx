import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { setUserDetails } from "./store/userSlice";
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

  // On first load, fetch user from server
  useEffect(() => {
    fetchUser();
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
