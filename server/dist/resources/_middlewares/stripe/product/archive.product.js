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
exports.archiveStripeProduct = void 0;
const product_model_1 = require("../../../products/product.model");
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);
/* A MIDDLEWARE THAT LOOKS FOR A PRODUCT IN DATABASE
 * if found, the product is archived (i.e. inactivated) in stripe,
 * it then passes to the next function.
 */
const archiveStripeProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingProduct = yield product_model_1.ProductModel.findById({ _id: req.params.id });
        if (!existingProduct) {
            return res.status(409).json("Product not found");
        }
        else {
            if (existingProduct.vhs.stripe_prod_id) {
                yield stripe.products.update(existingProduct.vhs.stripe_prod_id, {
                    active: false,
                });
            }
            if (existingProduct.digital.stripe_prod_id) {
                yield stripe.products.update(existingProduct.digital.stripe_prod_id, {
                    active: false,
                });
            }
            next();
        }
    }
    catch (error) {
        next(error);
    }
});
exports.archiveStripeProduct = archiveStripeProduct;
