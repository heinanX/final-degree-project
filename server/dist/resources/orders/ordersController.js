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
exports.deleteOrder = exports.manageOrder = exports.createOrderDB = exports.getOrder = exports.getOrders = void 0;
const ordersModel_1 = require("./ordersModel");
const getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield ordersModel_1.OrderModel.find();
        res.status(200).json(orders);
    }
    catch (error) {
        next(error);
    }
});
exports.getOrders = getOrders;
const getOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield ordersModel_1.OrderModel.findOne({ _id: req.params.id });
        res.status(200).json(order);
    }
    catch (error) {
        next(error);
    }
});
exports.getOrder = getOrder;
const createOrderDB = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = yield ordersModel_1.OrderModel.create(req.body);
        res.status(201).json(newProduct);
    }
    catch (error) {
        next(error);
    }
});
exports.createOrderDB = createOrderDB;
const manageOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateData = req.body;
        const product = req.params.id;
        const updatedProduct = yield ordersModel_1.OrderModel.findByIdAndUpdate(product, updateData, { new: true });
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        next(error);
    }
});
exports.manageOrder = manageOrder;
const deleteOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ordersModel_1.OrderModel.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json("order deleted");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteOrder = deleteOrder;
