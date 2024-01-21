const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);
import { NextFunction, Request, Response } from "express";

// Middleware to check status of a Stripe Checkout session
export const checkOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Retrieve Stripe Checkout session using the sessionId from the request body
    const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);

    // Check if payment status of the session is "paid"
    if (session.payment_status === "paid") {
      // Replace entire request body with property order data
      req.body.order.payment_status = "paid";
      req.body = req.body.order;

      // If session includes a discount, add it to the order
      if (session.total_details.discount != undefined) {
        req.body.order.discount = session.total_details.discount;
      }
      // Move to the next middleware or route handler
      next();
    }
  } catch (error) {
    // If an error occurs, pass it to the next middleware for error handling
    next(error);
  }
};
