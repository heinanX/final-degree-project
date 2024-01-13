import { NextFunction, Request, Response } from "express";
import { CustomerModel } from "../../../customers/customers.model";

const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);

/* A middleware that checks for a customer in database.
If found, the customer information is updated in stripe, it then passes to the next function. */

export const updateStripeCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer = await CustomerModel.findById({ _id: req.params.id });

    if (!customer) {
      return res.status(409).json("customer not found");
    } else {

      /* IF CUSTOMER USERNAME IS UPDATED OR SET, IT IS UPDATED IN STRIPE */
      if (req.body.username) {
        await stripe.customers.update(customer.stripe_id, {
          name: req.body.username
        });
      }

      /* IF CUSTOMER EMAIL IS UPDATED, IT IS UPDATED IN STRIPE */
      if (req.body.mail) {
        await stripe.customers.update(customer.stripe_id, {
          email: req.body.mail
        });
      }
      next();
    }
  } catch (error) {
    next(error);
  }
};
