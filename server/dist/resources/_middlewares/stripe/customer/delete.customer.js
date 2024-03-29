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
exports.deleteStripeCus = void 0;
const customers_model_1 = require("../../../customers/customers.model");
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);
/* A middleware that checks for existing customer in database,
if found, customer is deleted in stripe, if not found it moves on to next */
const deleteStripeCus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingCustomer = yield customers_model_1.CustomerModel.findOne({ _id: req.params.id });
        if (existingCustomer) {
            yield stripe.customers.del(existingCustomer.stripe_id);
        }
        else {
            return res.status(409).json("customer not found");
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.deleteStripeCus = deleteStripeCus;
