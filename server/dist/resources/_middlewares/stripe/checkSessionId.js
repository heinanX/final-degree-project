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
exports.checkSessionId = void 0;
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY); //imports stripe key
const orders_model_1 = require("../../orders/orders.model");
/* A MIDDLEWARE TO CHECK STATUS OF A STRIPE CHECKOUT SESSION */
const checkSessionId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const sessionId = req.body.session_id;
        const userOrders = yield orders_model_1.OrderModel.find({ customer: (_a = req.session.customer) === null || _a === void 0 ? void 0 : _a._id });
        const orderWithSameSession = userOrders.find((order) => order.session_id === sessionId);
        if (!orderWithSameSession) {
            next();
        }
        else {
            return res.status(200).json(orderWithSameSession);
        }
    }
    catch (error) {
        // If an error occurs, pass it to the next middleware for error handling
        next(error);
    }
});
exports.checkSessionId = checkSessionId;
