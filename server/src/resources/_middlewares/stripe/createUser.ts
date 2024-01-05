import { NextFunction, Request, Response } from "express";
import { CustomerModel } from "../../customers/customersModel";
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);

/* A middleware that checks for pre-existing customer in database,
if not found, a customer is created in stripe where its customer id is passed on to the next function */

export const createStripeCus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { mail } = req.body;
    const existingMail = await CustomerModel.findOne({ mail: mail });

    if (existingMail) {
      return res.status(409).json("Email already registered");
    } else {
      const stripeUser = await stripe.customers.create({
        email: mail,
        description: mail,
      });
      const stripeId = await stripeUser.id;
      req.body.stripe_id = stripeId;
      next();
    }
  } catch (error) {
    next(error);
  }
};
