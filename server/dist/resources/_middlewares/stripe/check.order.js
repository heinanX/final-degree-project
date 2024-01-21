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
exports.checkOrder = void 0;
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);
const checkOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield stripe.checkout.sessions.retrieve(req.body.sessionId, { expand: ['line_items'] });
        if (session.payment_status === "paid") {
            console.log("Payment is paid. Session details:", session);
            req.body.order.discout = session.total_details.discount;
            // Assuming that req.body has an 'order' property
            if (req.body && req.body.order) {
                req.body = req.body.order;
                next();
            }
            else {
                console.error("No 'order' property found in req.body.");
                res.status(400).send("Invalid request: Missing 'order' property.");
            }
        }
        else {
            console.log("Payment is not yet paid. Session details:", session);
            res.status(400).send("Invalid request: Payment not yet completed.");
        }
    }
    catch (error) {
        console.error("Error checking order:", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.checkOrder = checkOrder;
