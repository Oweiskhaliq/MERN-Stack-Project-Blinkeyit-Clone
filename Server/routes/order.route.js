import { Router } from "express";
import { cashOnDeliveryOrderController, OnlinePaymentController, StripeWebHook } from "../controllers/order.controller.js";
import auth from "../middleware/auth.js";

const orderRouter = Router();

orderRouter.post("/cash-on-delivery", auth, cashOnDeliveryOrderController);
orderRouter.post("/checkout", auth, OnlinePaymentController);
orderRouter.post("/webhook", StripeWebHook)

export default orderRouter;
