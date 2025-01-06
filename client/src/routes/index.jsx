import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ForgotPasswordOtpVerification from "../pages/ForgotPasswordOtpVerification";
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
    ],
  },
]);

export default router;
