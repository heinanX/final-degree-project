import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../../../products/product.model";
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);

/* A middleware that checks for a product in database.
If found, the product is updated in stripe, it then passes to the next function. */

export const updateStripeProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductModel.findById({ _id: req.params.id });

    if (!product) {
      return res.status(409).json("Product not found");
    } else {

      /* IF PRICE FOR VHS PRODUCT IS UPDATED, IT IS UPDATED IN STRIPE */
      if (req.body.vhs.price) {
        await stripe.products.update(product.vhs.stripe_prod_id, {
          default_price: req.body.vhs.price * 100,
        });
      }

      /* IF PRICE FOR DIGITAL PRODUCT IS UPDATED, IT IS UPDATED IN STRIPE */
      if (req.body.digital.price) {
        await stripe.products.update(product.digital.stripe_prod_id, {
          default_price: req.body.digital.price * 100,
        });
      }
      /* IF TITLE IS UPDATED, IT IS UPDATED IN STRIPE VHS AND DIGITAL PRODUCT */
      if (req.body.title) {
        await stripe.products.update(product.vhs.stripe_prod_id, {
          name: req.body.title,
        });
        await stripe.products.update(product.digital.stripe_prod_id, {
          name: req.body.title + " - digital",
        });
      }
      next();
    }
  } catch (error) {
    next(error);
  }
};
