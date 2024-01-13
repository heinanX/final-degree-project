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
/* A middleware that checks for a customer in database.
If found, the customer information is updated in stripe, it then passes to the next function. */
const updateStripeCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield customers_model_1.CustomerModel.findById({ _id: req.params.id });
        if (!customer) {
            return res.status(409).json("customer not found");
        }
        else {
            /* IF CUSTOMER USERNAME IS UPDATED OR SET, IT IS UPDATED IN STRIPE */
            if (req.body.username) {
                yield stripe.customers.update(customer.stripe_id, {
                    name: req.body.username
                });
            }
            /* IF CUSTOMER EMAIL IS UPDATED, IT IS UPDATED IN STRIPE */
            if (req.body.mail) {
                yield stripe.customers.update(customer.stripe_id, {
                    email: req.body.mail
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
