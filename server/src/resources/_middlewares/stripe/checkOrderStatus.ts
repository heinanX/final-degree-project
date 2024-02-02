const stripe = require("stripe")(process.env.STRIPE_SECRETKEY); //imports stripe key
import { NextFunction, Request, Response } from "express";

/* A MIDDLEWARE TO CHECK STATUS OF A STRIPE CHECKOUT SESSION */
export const checkOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.body.session_id
    );

    if (session.payment_status === "paid") {
      req.body.payment_status = "paid";
      req.body.customer = req.session.customer?._id;

      if (session.total_details.discount != undefined) {
        req.body.discount = session.total_details.discount;
      }

      next();
    }
  } catch (error) {
    next(error);
  }
};
