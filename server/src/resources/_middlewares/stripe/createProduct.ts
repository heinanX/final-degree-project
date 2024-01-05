import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../../products/productModel";
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);

/* A middleware that checks for pre-existing product in database,
if not found, a product is created in stripe, followed by a price. The price is added to the product and the id of
where its customer id is passed on to the next function */

export const createStripeProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title } = req.body;
    const existingProduct = await ProductModel.findOne({ title: title });

    if (existingProduct) {
      return res.status(409).json("Movie already available");
    } else {
      if (req.body.vhs.price) {
        const stripePriceConverter: number = req.body.vhs.price * 100

        const stripeProduct = await stripe.products.create({
          name: title
        });

        const priceID = await stripe.prices.create({
            product: stripeProduct.id,
            unit_amount: stripePriceConverter,
            currency: 'sek',
          });

        req.body.vhs.stripe_price_id = await priceID.id;
      }

      if (req.body.digital.price) {
        const stripePriceConverter = req.body.digital.price * 100

        const stripeProduct = await stripe.products.create({
          name: title + ' - digital' 
        });

        const priceID = await stripe.prices.create({
            product: stripeProduct.id,
            unit_amount: stripePriceConverter,
            currency: 'sek',
          });

        req.body.digital.stripe_price_id = priceID.id;
      }
      next();
    }
  } catch (error) {
    next(error);
  }
};
