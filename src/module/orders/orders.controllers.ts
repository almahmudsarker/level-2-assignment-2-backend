import { Request, Response } from "express";
import { OrderServices } from "./orders.services";
import orderValidationSchema from "./orders.zod.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const zodParsedOrderData = orderValidationSchema.parse(orderData);

    const result = await OrderServices.createOrderIntoDB(zodParsedOrderData);

    if (result === null) {
      res.status(500).json({
        success: false,
        message: "Product not found",
      });
    } else if (result === "stockOut") {
      res.status(500).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error: error,
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const queryEmail: any = req.query.email;

    if (queryEmail) {
      function validateEmail(email: string) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      }

      if (validateEmail(queryEmail)) {
        const result = await OrderServices.getOrdersFromDB(queryEmail);
        if (result.length > 0) {
          return res.status(200).json({
            success: true,
            message: `Orders fetched successfully for ${queryEmail}!`,
            data: result,
          });
        } else {
          return res.status(500).json({
            success: false,
            message: "Order not found",
          });
        }
      } else {
        return res
          .status(500)
          .json({ success: false, message: "Invalid Email" });
      }
    }

    const result = await OrderServices.getOrdersFromDB("");
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Order not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error: error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getOrders,
};
