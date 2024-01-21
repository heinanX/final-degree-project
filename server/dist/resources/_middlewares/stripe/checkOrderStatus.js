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
exports.checkOrderStatus = void 0;
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY); //imports stripe key
/* A MIDDLEWARE TO CHECK STATUS OF A STRIPE CHECKOUT SESSION */
const checkOrderStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Retrieve Stripe Checkout session using the sessionId from the request body
        const session = yield stripe.checkout.sessions.retrieve(req.body.sessionId);
        // Check if payment status of the session is "paid"
        if (session.payment_status === "paid") {
            // Replace entire request body with property order data
            req.body.order.payment_status = "paid";
            req.body = req.body.order;
            req.body.customer = (_a = req.session.customer) === null || _a === void 0 ? void 0 : _a._id;
            // If session includes a discount, add it to the order
            if (session.total_details.discount != undefined) {
                req.body.order.discount = session.total_details.discount;
            }
            // Move to the next middleware or route handler
            next();
        }
    }
    catch (error) {
        // If an error occurs, pass it to the next middleware for error handling
        next(error);
    }
});
exports.checkOrderStatus = checkOrderStatus;
