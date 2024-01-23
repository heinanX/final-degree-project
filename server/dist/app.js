"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const session = require("express-session");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const customers_router_1 = require("./resources/customers/customers.router");
const categories_router_1 = require("./resources/categories/categories.router");
const product_router_1 = require("./resources/products/product.router");
const tags_router_1 = require("./resources/tags/tags.router");
const orders_router_1 = require("./resources/orders/orders.router");
const errorHandler_1 = require("./resources/_middlewares/errorHandler");
exports.app = (0, express_1.default)();
const cookieSecret = process.env.COOKIE_SESSION_KEY;
if (!cookieSecret) {
    throw new Error("The COOKIE_SESSION_KEY environment variable is not defined.");
}
exports.app.use((0, cors_1.default)({ origin: "http://localhost:5173",
    credentials: true, }));
exports.app.use(express_1.default.json());
exports.app.use(session({
    secret: cookieSecret,
    resave: false,
    saveUninitialized: true,
}));
exports.app.use("/api/customers", customers_router_1.customerRouter);
exports.app.use("/api/tags", tags_router_1.tagRouter);
exports.app.use("/api/categories", categories_router_1.categoryRouter);
exports.app.use("/api/products", product_router_1.productRouter);
exports.app.use("/api/orders", orders_router_1.orderRouter);
exports.app.use(errorHandler_1.notFound);
exports.app.use(errorHandler_1.errorHandler);
