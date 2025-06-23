import { Router } from "express";
import {
  createProductController,
  getProductsController,
} from "../controllers/product.controller.js";
import auth from "../middleware/auth.js";
const productRouter = Router();

productRouter.post("/create", auth, createProductController);
productRouter.post("/get", getProductsController);
export default productRouter;
