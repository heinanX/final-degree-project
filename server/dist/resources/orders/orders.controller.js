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
exports.deleteOrder = exports.manageOrder = exports.createOrderDB = exports.createCheckoutSession = exports.getOrderById = exports.getUserOrders = exports.getOrders = void 0;
const orders_model_1 = require("./orders.model");
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);
/* CRUD OPERATIONS FOR ORDER
 *  getOrders, getUserOrders, getOrderById, createCheckoutSession,
 *  createOrderDB, manageOrder, deleteOrder
 */
const getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orders_model_1.OrderModel.find();
        res.status(200).json(orders);
    }
    catch (error) {
        next(error);
    }
});
exports.getOrders = getOrders;
const getUserOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const orders = yield orders_model_1.OrderModel.find({
            customer: (_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.customer) === null || _b === void 0 ? void 0 : _b._id,
        });
        res.status(200).json(orders);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserOrders = getUserOrders;
const getOrderById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e, _f;
    try {
        const identifiedOrder = yield orders_model_1.OrderModel.findOne({ _id: req.params.id });
        if (!identifiedOrder) {
            return res.status(404).json({ error: "Unknown Order ID" });
        }
        if (identifiedOrder.customer === ((_d = (_c = req.session) === null || _c === void 0 ? void 0 : _c.customer) === null || _d === void 0 ? void 0 : _d._id) ||
            ((_f = (_e = req.session) === null || _e === void 0 ? void 0 : _e.customer) === null || _f === void 0 ? void 0 : _f.isAdmin)) {
            return res.status(200).json(identifiedOrder);
        }
        else {
            return res
                .status(403)
                .json("Unable to fetch order. Check permission status");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getOrderById = getOrderById;
const createCheckoutSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    try {
        const session = yield stripe.checkout.sessions.create({
            success_url: "http://localhost:5173/success?id={CHECKOUT_SESSION_ID}",
            cancel_url: "http://localhost:5173/failed",
            payment_method_types: ["card"],
            mode: "payment",
            currency: "sek",
            allow_promotion_codes: true,
            customer: (_g = req.session.customer) === null || _g === void 0 ? void 0 : _g.stripe_id,
            line_items: req.body,
        });
        res.status(200).json({
            url: session.url,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createCheckoutSession = createCheckoutSession;
const createOrderDB = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = yield orders_model_1.OrderModel.create(req.body);
        res.status(201).json(newProduct);
    }
    catch (error) {
        next(error);
    }
});
exports.createOrderDB = createOrderDB;
const manageOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incomingData = req.body;
        const orderId = req.params.id;
        const updatedOrder = yield orders_model_1.OrderModel.findByIdAndUpdate(orderId, incomingData, { new: true });
        res.status(200).json(updatedOrder);
    }
    catch (error) {
        next(error);
    }
});
exports.manageOrder = manageOrder;
const deleteOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield orders_model_1.OrderModel.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json("order deleted");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteOrder = deleteOrder;
