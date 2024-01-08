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
exports.updateStripeCustomer = void 0;
const productModel_1 = require("../../../products/productModel");
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);
/* A middleware that checks for a product in database.
If found, the product is updated in stripe, it then passes to the next function. */
const updateStripeCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.ProductModel.findById({ _id: req.params.id });
        if (!product) {
            return res.status(409).json("Product not found");
        }
        else {
            /* IF PRICE FOR VHS PRODUCT IS UPDATED, IT IS UPDATED IN STRIPE */
            if (req.body.vhs.price) {
                yield stripe.products.update(product.vhs.stripe_prod_id, {
                    default_price: req.body.vhs.price * 100,
                });
            }
            /* IF PRICE FOR DIGITAL PRODUCT IS UPDATED, IT IS UPDATED IN STRIPE */
            if (req.body.digital.price) {
                yield stripe.products.update(product.digital.stripe_prod_id, {
                    default_price: req.body.digital.price * 100,
                });
            }
            /* IF TITLE IS UPDATED, IT IS UPDATED IN STRIPE VHS AND DIGITAL PRODUCT */
            if (req.body.title) {
                yield stripe.products.update(product.vhs.stripe_prod_id, {
                    name: req.body.title,
                });
                yield stripe.products.update(product.digital.stripe_prod_id, {
                    name: req.body.title + " - digital",
                });
            }
            next();
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateStripeCustomer = updateStripeCustomer;
