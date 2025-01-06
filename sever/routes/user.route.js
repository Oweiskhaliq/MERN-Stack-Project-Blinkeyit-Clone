import { Router } from "express";
import {
  verifyEmailController,
  registerUserController,
  loginController,
  logoutController,
  forgetPasswordController,
  verifyForgotPassword,
  resetPassword,
  uploadAvator,
  updateUserDetails,
  RefreshToken,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", loginController);
userRouter.post("/logout", auth, logoutController);
userRouter.put("/forgot-password", forgetPasswordController);
userRouter.put("/verify-forgot-password-otp", verifyForgotPassword);
userRouter.put("/reset-password", resetPassword);
userRouter.put("/upload-avator", auth, upload.single("avator"), uploadAvator);
userRouter.put("/update-user", auth, updateUserDetails);
userRouter.post("/refresh-token", RefreshToken);

export default userRouter;
