import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../../../products/product.model";
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);

/* A MIDDLEWARE THAT LOOKS FOR A PRODUCT IN DATABASE
 * if found, the product is archived (i.e. inactivated) in stripe,
 * it then passes to the next function.
 */

export const archiveStripeProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingProduct = await ProductModel.findById({ _id: req.params.id });

    if (!existingProduct) {
      return res.status(409).json("Product not found");
    } else {
      if (existingProduct.vhs.stripe_prod_id) {
        await stripe.products.update(existingProduct.vhs.stripe_prod_id, {
          active: false,
        });
      }

      if (existingProduct.digital.stripe_prod_id) {
        await stripe.products.update(existingProduct.digital.stripe_prod_id, {
          active: false,
        });
      }
      next();
    }
  } catch (error) {
    next(error);
  }
};
