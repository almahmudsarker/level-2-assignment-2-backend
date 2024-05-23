import express from "express";
import { OrderControllers } from "./orders.controllers";

const router = express.Router();

router.post("/", OrderControllers.createOrder);
router.get("/", OrderControllers.getOrders);

export const OrderRoutes = router;
