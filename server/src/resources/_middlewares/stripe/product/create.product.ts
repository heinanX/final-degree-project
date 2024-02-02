import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../../../products/product.model";
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);

/* A  MIDDLEWARE THAT CHECKS FOR A PRE-EXISTING PRODUCT INSIDE DATABASE,
if not found, a product is created in stripe, followed by a price.
The price is then added to the product. Each ID [of product and price]
is passed on in the 'req' to the next function where it's saved inside the product in local db */

export const createStripeProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingProduct = await ProductModel.findOne({ title: req.body.title });

    if (existingProduct) {
      return res.status(409).json("Movie already available");
    } else {

      if (req.body.vhs.price) {
        const stripeProduct = await stripe.products.create({
          name: req.body.title,
          default_price_data: {
            currency: "sek",
            unit_amount_decimal: req.body.vhs.price * 100
        },
        expand: ['default_price']
    });

        req.body.vhs.stripe_prod_id = stripeProduct.id;
        req.body.vhs.stripe_price_id = stripeProduct.default_price.id;
      }

      if (req.body.digital.price) {
        const stripeProduct = await stripe.products.create({
          name: req.body.title + " - digital",
          default_price_data: {
            currency: "sek",
            unit_amount_decimal: req.body.digital.price * 100
        },
        expand: ['default_price']
        });

        req.body.digital.stripe_prod_id = stripeProduct.id;
        req.body.digital.stripe_price_id = stripeProduct.default_price.id;
      }
      next();
    }
  } catch (error) {
    next(error);
  }
};
