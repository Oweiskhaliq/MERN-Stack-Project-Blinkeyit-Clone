import { Router } from "express";
import { uploadImageController } from "../controllers/uploadImages.Controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
const ImageRouter = Router();

ImageRouter.post(
  "/upload",
  auth,
  upload.single("image"),
  uploadImageController
);

export default ImageRouter;
