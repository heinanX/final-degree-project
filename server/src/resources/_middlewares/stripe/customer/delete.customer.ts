import { NextFunction, Request, Response } from "express";
import { CustomerModel } from "../../../customers/customers.model";
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);

/* A middleware that checks for existing customer in database,
if found, customer is deleted in stripe, if not found it moves on to next */

export const deleteStripeCus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer = await CustomerModel.findOne({ _id: req.params.id });

    if (customer) {
      await stripe.customers.del(customer.stripe_id);
    } else {
      return res.status(409).json("customer not found");
    }
    next();
  } catch (error) {
    next(error);
  }
};
