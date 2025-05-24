import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ForgotPassword from "../pages/ForgotPassword";
import ForgotPasswordOtpVerification from "../pages/ForgotPasswordOtpVerification";
import Home from "../pages/home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import SearchPage from "../pages/SearchPage";
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
    ],
  },
]);

export default router;
