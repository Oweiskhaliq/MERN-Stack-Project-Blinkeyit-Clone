import { Router } from "express";
import {
  addToCartItemController,
  deleteCartItemController,
  getCartItemsController,
  updateCartQuantityController,
} from "../controllers/cart.controller.js";
import auth from "../middleware/auth.js";

const cartRouter = Router();

cartRouter.post("/create", auth, addToCartItemController);
cartRouter.get("/get", auth, getCartItemsController);
cartRouter.put("/update-quantity", auth, updateCartQuantityController);
cartRouter.delete("/delete-cart-item", auth, deleteCartItemController);

export default cartRouter;
