import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminPermissions from "../layout/AdminPermissions";
import Dashboard from "../layout/Dashboard";
import Address from "../pages/Address";
import Category from "../pages/Category";
import ForgotPassword from "../pages/ForgotPassword";
import ForgotPasswordOtpVerification from "../pages/ForgotPasswordOtpVerification";
import Home from "../pages/home";
import Login from "../pages/Login";
import MyOrders from "../pages/MyOrders";
import ProductAdmin from "../pages/ProductAdmin";
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
            element: (
              <AdminPermissions>
                <Category />
              </AdminPermissions>
            ),
          },
          {
            path: "sub-category",
            element: (
              <AdminPermissions>
                <SubCategory />
              </AdminPermissions>
            ),
          },
          {
            path: "upload-product",
            element: (
              <AdminPermissions>
                <UploadProduct />
              </AdminPermissions>
            ),
          },
          {
            path: "products",
            element: (
              <AdminPermissions>
                <ProductAdmin />
              </AdminPermissions>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
