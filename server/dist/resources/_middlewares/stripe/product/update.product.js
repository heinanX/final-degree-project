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
exports.updateStripeProduct = void 0;
const product_model_1 = require("../../../products/product.model");
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);
/* A MIDDLEWARE THAT LOOKS FOR A PRODUCT IN DATABASE
 * if found, the product is updated in stripe,
 * it then passes to the next function.
 */
const updateStripeProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingProduct = yield product_model_1.ProductModel.findById({ _id: req.params.id });
        if (req.body.title) {
            req.body.title = req.body.title.toLowerCase();
        }
        if (!existingProduct) {
            return res.status(409).json("Product not found");
        }
        if (req.body.vhs) {
            const newPrice = yield stripe.prices.create({
                currency: 'sek',
                unit_amount: req.body.vhs.price * 100,
                product: existingProduct.vhs.stripe_prod_id
            });
            yield stripe.products.update(existingProduct.vhs.stripe_prod_id, {
                default_price: newPrice.id,
            });
            req.body.vhs.stripe_price_id = newPrice.id;
        }
        if (req.body.digital) {
            console.log('im in here');
            const newPrice = yield stripe.prices.create({
                currency: 'sek',
                unit_amount: req.body.digital.price * 100,
                product: existingProduct.digital.stripe_prod_id
            });
            req.body.digital.stripe_price_id = newPrice.id;
        }
        if (req.body.title) {
            yield stripe.products.update(existingProduct.vhs.stripe_prod_id, {
                name: req.body.title,
            });
            yield stripe.products.update(existingProduct.digital.stripe_prod_id, {
                name: req.body.title + " - digital",
            });
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.updateStripeProduct = updateStripeProduct;
