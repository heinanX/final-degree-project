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
exports.createStripeCus = void 0;
const customers_model_1 = require("../../../customers/customers.model");
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);
/* A MIDDLEWARE THAT CHECKS FOR PRE-EXISTING CUSTOMER IN DATABASE,
 * if not found, a customer is created in stripe,
 * its customer id is then passed on to the next function
 */
const createStripeCus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mail } = req.body;
        const existingMail = yield customers_model_1.CustomerModel.findOne({ mail: mail });
        if (existingMail) {
            return res.status(409).json("Email already registered");
        }
        else {
            const stripeUser = yield stripe.customers.create({
                email: mail,
                description: mail,
            });
            const stripeId = yield stripeUser.id;
            req.body.stripe_id = stripeId;
            next();
        }
    }
    catch (error) {
        next(error);
    }
});
exports.createStripeCus = createStripeCus;
