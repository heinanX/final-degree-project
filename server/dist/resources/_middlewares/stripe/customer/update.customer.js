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
const customers_model_1 = require("../../../customers/customers.model");
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);
/* A MIDDLEWARE THAT LOOKS FOR A CUSTOMER IN DATABASE
 * if found, customer information is updated in stripe,
 * it then passes to the next function.
 */
const updateStripeCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingCustomer = yield customers_model_1.CustomerModel.findById({ _id: req.params.id });
        if (!existingCustomer) {
            return res.status(409).json("customer not found");
        }
        else {
            if (req.body.username) {
                yield stripe.customers.update(existingCustomer.stripe_id, {
                    name: req.body.username,
                });
            }
            if (req.body.mail) {
                yield stripe.customers.update(existingCustomer.stripe_id, {
                    email: req.body.mail,
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
