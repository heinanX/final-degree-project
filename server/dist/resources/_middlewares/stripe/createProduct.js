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
/* A middleware that checks for pre-existing product in database,
if not found, a product is created in stripe, followed by a price. The price is added to the product and the id of
where its customer id is passed on to the next function */
const createStripeProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const existingProduct = yield productModel_1.ProductModel.findOne({ title: title });
        if (existingProduct) {
            return res.status(409).json("Movie already available");
        }
        else {
            if (req.body.vhs.price) {
                const stripePriceConverter = req.body.vhs.price * 100;
                const stripeProduct = yield stripe.products.create({
                    name: title
                });
                const priceID = yield stripe.prices.create({
                    product: stripeProduct.id,
                    unit_amount: stripePriceConverter,
                    currency: 'sek',
                });
                req.body.vhs.stripe_price_id = yield priceID.id;
            }
            if (req.body.digital.price) {
                const stripePriceConverter = req.body.digital.price * 100;
                const stripeProduct = yield stripe.products.create({
                    name: title + ' - digital'
                });
                const priceID = yield stripe.prices.create({
                    product: stripeProduct.id,
                    unit_amount: stripePriceConverter,
                    currency: 'sek',
                });
                req.body.digital.stripe_price_id = priceID.id;
            }
            next();
        }
    }
    catch (error) {
        next(error);
    }
});
exports.createStripeProduct = createStripeProduct;
