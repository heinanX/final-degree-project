import { NextFunction, Request, Response } from "express";
import { CustomerModel } from "../../../customers/customers.model";
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);

/* A MIDDLEWARE THAT LOOKS FOR A CUSTOMER IN DATABASE
 * if found, customer information is updated in stripe,
 * it then passes to the next function.
 */

export const updateStripeCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingCustomer = await CustomerModel.findById({ _id: req.params.id });

    if (!existingCustomer) {
      return res.status(409).json("customer not found");
    } else {
      if (req.body.username) {
        await stripe.customers.update(existingCustomer.stripe_id, {
          name: req.body.username,
        });
      }

      if (req.body.mail) {
        await stripe.customers.update(existingCustomer.stripe_id, {
          email: req.body.mail,
        });
      }
      next();
    }
  } catch (error) {
    next(error);
  }
};
