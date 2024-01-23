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
exports.deleteOrder = exports.manageOrder = exports.createOrderDB = exports.createCheckoutSession = exports.getOrder = exports.getUserOrders = exports.getOrders = void 0;
const orders_model_1 = require("./orders.model");
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);
/* FUNCTION THAT FETCHES ALL ORDERS FROM DATABASE */
const getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all orders from database
        const orders = yield orders_model_1.OrderModel.find();
        // Respond with a JSON array of orders
        res.status(200).json(orders);
    }
    catch (error) {
        // if error, pass on error to error handler
        next(error);
    }
});
exports.getOrders = getOrders;
/* FUNCTION THAT FETCHES ALL ORDERS FOR ONE USER FROM DATABASE */
const getUserOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Fetch all orders for the specific user from the database
        const orders = yield orders_model_1.OrderModel.find({
            customer: (_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.customer) === null || _b === void 0 ? void 0 : _b._id,
        });
        // Respond with a JSON array of user-specific orders
        res.status(200).json(orders);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserOrders = getUserOrders;
/* FUNCTION THAT FETCHES SPECIFIED ORDER FROM DATABASE
  It checks if the order exists and if the requester has permission to access it.
  */
const getOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e, _f;
    try {
        // Attempt to find the order in the database using the OrderModel and the specified order ID
        const order = yield orders_model_1.OrderModel.findOne({ _id: req.params.id });
        // If order is not found, respond with a status of 'not found' and an error message
        if (!order) {
            return res.status(404).json({ error: "Unknown Order ID" });
        }
        // Check if requester has permission to access order data
        if (order.customer === ((_d = (_c = req.session) === null || _c === void 0 ? void 0 : _c.customer) === null || _d === void 0 ? void 0 : _d._id) ||
            ((_f = (_e = req.session) === null || _e === void 0 ? void 0 : _e.customer) === null || _f === void 0 ? void 0 : _f.isAdmin)) {
            // if permission, respond with order data
            return res.status(200).json(order);
        }
        else {
            // if not, respond with a status forbidden
            return res
                .status(403)
                .json("Unable to fetch order. Check permission status");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getOrder = getOrder;
/*  CREATES NEW CHECKOUT WITH STRIPE API TO PROCESS PAYMENT */
const createCheckoutSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    try {
        // Use Stripe API to create a new checkout session
        const session = yield stripe.checkout.sessions.create({
            success_url: "http://localhost:5173/success?id={CHECKOUT_SESSION_ID}", //sets success url
            cancel_url: "http://localhost:5173/failed", // sets url if order fails
            payment_method_types: ["card"], // sets cards as valid payment method
            mode: "payment", //accept one-time payments for cards
            currency: "sek", // sets currencies
            allow_promotion_codes: true, // allows for discount codes
            customer: (_g = req.session.customer) === null || _g === void 0 ? void 0 : _g.stripe_id, // customer's id that's saved in sessions
            line_items: req.body, // object with the order
        });
        // Respond with the URL of the created checkout session
        res.status(200).json({
            url: session.url,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createCheckoutSession = createCheckoutSession;
/*  CREATES ORDER IN OFFICIAL DATABASE */
const createOrderDB = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Attempt to create a new order in database using the OrderModel
        const newProduct = yield orders_model_1.OrderModel.create(req.body);
        // Respond with a status created and the created order in JSON format
        res.status(201).json(newProduct);
    }
    catch (error) {
        next(error);
    }
});
exports.createOrderDB = createOrderDB;
/*  MANAGE OR UPDATE VALUES IN AN ORDER FROM DB */
const manageOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract update data and order ID from the request
        const updateData = req.body;
        const product = req.params.id;
        // Find and update the specified order in the database
        const updatedProduct = yield orders_model_1.OrderModel.findByIdAndUpdate(product, updateData, { new: true });
        // Respond with the updated order
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        next(error);
    }
});
exports.manageOrder = manageOrder;
/*  DELETE ORDER FROM DB */
const deleteOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find and delete order from database
        yield orders_model_1.OrderModel.findByIdAndDelete({ _id: req.params.id });
        // Respond with success message
        res.status(200).json("order deleted");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteOrder = deleteOrder;
