const stripe = require("stripe")(process.env.STRIPE_SECRETKEY); //imports stripe key
import { NextFunction, Request, Response } from "express";
import { OrderModel } from "../../orders/orders.model";

/* A MIDDLEWARE TO CHECK STATUS OF A STRIPE CHECKOUT SESSION */
export const checkSessionId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionId = req.body.session_id;
    const userOrders = await OrderModel.find({
      customer: req.session.customer?._id,
    });
    const orderWithSameSession = userOrders.find(
      (order: any) => order.session_id === sessionId
    );

    if (!orderWithSameSession) {
      next();
    } else {
      return res.status(200).json(orderWithSameSession);
    }
  } catch (error) {
    next(error);
  }
};
