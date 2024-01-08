import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../../../products/productModel";
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);

/* A middleware that checks for a product in database.
If found, the product is archived (i.e. inactivated) in stripe, it then passes to the next function. */

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
        
      /* LOGIC THAT ARCHIVES A VHS PRODUCT IN STRIPE */
      if (existingProduct.vhs.stripe_prod_id) {
        await stripe.products.update(
            existingProduct.vhs.stripe_prod_id,
            {
                active: false
            }
        );
      }

      /* LOGIC THAT ARCHIVES A DIGITAL PRODUCT IN STRIPE */
      if (existingProduct.digital.stripe_prod_id) {
        await stripe.products.update(
            existingProduct.digital.stripe_prod_id,
            {
                active: false
            }
        );
    }
      next();
    }
  } catch (error) {
    next(error);
  }
};
