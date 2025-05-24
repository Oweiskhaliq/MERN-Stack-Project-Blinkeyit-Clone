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
  const fetchUser = async () => {
    const userData = await fetchedUserDetails();
    dispatch(setUserDetails(userData.data.data));
  };

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
