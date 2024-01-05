"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStripeProduct = void 0;
const productModel_1 = require("../../products/productModel");
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);
/* A middleware that checks for a pre-existing product in database, If not found,
a product is created in stripe, followed by a price. The price is then added to the product.
Each ID [of product and price] is passed on in the 'req' to the next function where we save the product in local db */
const createStripeProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingProduct = yield productModel_1.ProductModel.findOne({ title: req.body.title });
        if (existingProduct) {
            return res.status(409).json("Movie already available");
        }
        else {
            /* LOGIC THAT CREATES A VHS PRODUCT IN STRIPE */
            if (req.body.vhs.price) {
                const stripeProduct = yield stripe.products.create({
                    name: req.body.title,
                    default_price_data: {
                        currency: "sek",
                        unit_amount_decimal: req.body.vhs.price * 100
                    },
                    expand: ['default_price']
                });
                /* IDS OF PRODUCT AND PRICE ARE SAVED IN VARIABLES */
                req.body.vhs.stripe_prod_id = stripeProduct.id;
                req.body.vhs.stripe_price_id = stripeProduct.default_price.id;
            }
            /* LOGIC THAT CREATES A DIGITAL PRODUCT IN STRIPE */
            if (req.body.digital.price) {
                const stripeProduct = yield stripe.products.create({
                    name: req.body.title + " - digital",
                    default_price_data: {
                        currency: "sek",
                        unit_amount_decimal: req.body.digital.price * 100
                    },
                    expand: ['default_price']
                });
                /* IDS OF PRODUCT AND PRICE ARE SAVED IN VARIABLES */
                req.body.digital.stripe_prod_id = stripeProduct.id;
                req.body.digital.stripe_price_id = stripeProduct.default_price.id;
            }
            // /* LOGIC THAT CREATES A VHS PRODUCT IN STRIPE */
            // if (req.body.vhs.price) {
            //   const stripeProduct = await stripe.products.create({
            //     name: req.body.title,
            //   });
            //   /* LOGIC THAT CREATES A PRICE FOR THE VHS PRODUCT CREATED IN STRIPE */
            //   const priceID = await stripe.prices.create({
            //     product: stripeProduct.id,
            //     unit_amount: req.body.vhs.price * 100,
            //     currency: "sek",
            //   });
            //   /* IDS OF PRODUCT AND PRICE ARE SAVED IN VARIABLES */
            //   req.body.vhs.stripe_prod_id = stripeProduct.id;
            //   req.body.vhs.stripe_price_id = await priceID.id;
            // }
            // /* LOGIC THAT CREATES A DIGITAL PRODUCT IN STRIPE */
            // if (req.body.digital.price) {
            //   const stripeProduct = await stripe.products.create({
            //     name: req.body.title + " - digital",
            //   });
            //   /* LOGIC THAT CREATES A PRICE FOR THE PRODUCT CREATED IN STRIPE */
            //   const priceID = await stripe.prices.create({
            //     product: stripeProduct.id,
            //     unit_amount: req.body.digital.price * 100,
            //     currency: "sek",
            //   });
            //   /* IDS OF PRODUCT AND PRICE ARE SAVED IN VARIABLES */
            //   req.body.digital.stripe_prod_id = stripeProduct.id;
            //   req.body.digital.stripe_price_id = priceID.id;
            // }
            next();
        }
    }
    catch (error) {
        next(error);
    }
});
exports.createStripeProduct = createStripeProduct;
