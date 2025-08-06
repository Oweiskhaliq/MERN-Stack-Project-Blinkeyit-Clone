import { Router } from "express";
import {
  createProductController,
  deleteProductDetail,
  getProductDetailsController,
  getProductsByCategoryAndSubCategoryController,
  getProductsByCategoryController,
  getProductsController,
  updateProductDetails,
} from "../controllers/product.controller.js";
import { admin } from "../middleware/admin.js";
import auth from "../middleware/auth.js";
const productRouter = Router();

productRouter.post("/create", auth, admin, createProductController);
productRouter.post("/get", getProductsController);
productRouter.post(
  "/get-products-by-category",
  getProductsByCategoryController
);
productRouter.post(
  "/get-product-by-category-and-subcategory",
  getProductsByCategoryAndSubCategoryController
);
productRouter.post("/get-product-details", getProductDetailsController);
productRouter.put("/update-product-details", auth, admin, updateProductDetails);
productRouter.delete("/delete-product", auth, admin, deleteProductDetail);

export default productRouter;
