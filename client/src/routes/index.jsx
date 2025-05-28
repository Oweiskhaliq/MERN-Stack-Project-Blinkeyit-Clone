import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../layout/Dashboard";
import Address from "../pages/Address";
import Category from "../pages/Category";
import ForgotPassword from "../pages/ForgotPassword";
import ForgotPasswordOtpVerification from "../pages/ForgotPasswordOtpVerification";
import Home from "../pages/home";
import Login from "../pages/Login";
import MyOrders from "../pages/MyOrders";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import SearchPage from "../pages/SearchPage";
import SubCategory from "../pages/SubCategory";
import UploadProduct from "../pages/UploadProduct";
import UserMobileMenu from "../pages/UserMobileMenu";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "forgot-password-otp-verification",
        element: <ForgotPasswordOtpVerification />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "user-mobile",
        element: <UserMobileMenu />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "myorders",
            element: <MyOrders />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "category",
            element: <Category />,
          },
          {
            path: "sub-category",
            element: <SubCategory />,
          },
          {
            path: "upload-product",
            element: <UploadProduct />,
          },
        ],
      },
    ],
  },
]);

export default router;
