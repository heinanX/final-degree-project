import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../../../products/product.model";
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);

/* A MIDDLEWARE THAT LOOKS FOR A PRODUCT IN DATABASE
 * if found, the product is updated in stripe,
 * it then passes to the next function.
 */

export const updateStripeProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingProduct = await ProductModel.findById({ _id: req.params.id });
    if (req.body.title) {
      req.body.title = req.body.title.toLowerCase();
    }

    if (!existingProduct) {
      return res.status(409).json("Product not found");
    }
    
      if (req.body.vhs) {
        const newPrice = await stripe.prices.create({
          currency: 'sek',
          unit_amount: req.body.vhs.price * 100,
          product: existingProduct.vhs.stripe_prod_id
        });
        await stripe.products.update(existingProduct.vhs.stripe_prod_id, {
          default_price: newPrice.id,
        });
        req.body.vhs.stripe_price_id = newPrice.id
      }

      if (req.body.digital) {
        console.log('im in here');
        
        const newPrice = await stripe.prices.create({
          currency: 'sek',
          unit_amount: req.body.digital.price * 100,
          product: existingProduct.digital.stripe_prod_id
        });
        req.body.digital.stripe_price_id = newPrice.id
      }

      if (req.body.title) {
        await stripe.products.update(existingProduct.vhs.stripe_prod_id, {
          name: req.body.title,
        });
        await stripe.products.update(existingProduct.digital.stripe_prod_id, {
          name: req.body.title + " - digital",
        });
      }
      next();
  } catch (error) {
    next(error);
  }
};
