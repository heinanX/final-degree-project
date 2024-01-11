"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const session = require("express-session");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const customersRouter_1 = require("./resources/customers/customersRouter");
const categoriesRouter_1 = require("./resources/categories/categoriesRouter");
const productRouter_1 = require("./resources/products/productRouter");
const tagsRouter_1 = require("./resources/tags/tagsRouter");
const ordersRouter_1 = require("./resources/orders/ordersRouter");
const errorHandler_1 = require("./resources/_middlewares/errorHandler");
exports.app = (0, express_1.default)();
const cookieSecret = process.env.COOKIE_SESSION_KEY;
if (!cookieSecret) {
    throw new Error("The COOKIE_SESSION_KEY environment variable is not defined.");
}
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(session({
    secret: cookieSecret,
    resave: false,
    saveUninitialized: true,
}));
exports.app.use("/api/customers", customersRouter_1.customerRouter);
exports.app.use("/api/tags", tagsRouter_1.tagRouter);
exports.app.use("/api/categories", categoriesRouter_1.categoryRouter);
exports.app.use("/api/products", productRouter_1.productRouter);
exports.app.use("/api/orders", ordersRouter_1.orderRouter);
exports.app.use(errorHandler_1.notFound);
exports.app.use(errorHandler_1.errorHandler);
