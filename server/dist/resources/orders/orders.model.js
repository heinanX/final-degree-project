"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.orderJoiSchema = exports.markOrderJoiSchema = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const subOrderSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "products",
        require: true,
    },
    quantity: Number,
}, { _id: false });
const orderSchema = new mongoose_1.Schema({
    customer: { type: mongoose_1.Schema.Types.ObjectId, ref: "customers", require: true },
    order: [subOrderSchema],
    total_price: { type: Number, default: 0, require: true },
    discount: { type: Number, default: 0 },
    date: { type: Date, default: Date.now() },
    shipped: { type: Boolean, default: false },
    returned: { type: Boolean, default: false },
    payment_status: { type: String, default: "pending" },
    order_status: { type: String, default: "active" },
}, { versionKey: false });
exports.markOrderJoiSchema = joi_1.default.object({
    shipped: joi_1.default.boolean(),
    returned: joi_1.default.boolean(),
    payment_status: joi_1.default.string(),
    order_status: joi_1.default.string(),
});
const subOrderJoiSchema = joi_1.default.object({
    product: joi_1.default.string(),
    quantity: joi_1.default.number(),
});
exports.orderJoiSchema = joi_1.default.object({
    customer: joi_1.default.string().required(),
    order: joi_1.default.array().items(subOrderJoiSchema).required(),
    total_price: joi_1.default.number().required(),
    discount: joi_1.default.number(),
    date: joi_1.default.date(),
    shipped: joi_1.default.boolean(),
    returned: joi_1.default.boolean(),
    payment_status: joi_1.default.string(),
    order_status: joi_1.default.string(),
});
exports.OrderModel = mongoose_1.models.orders || (0, mongoose_1.model)("orders", orderSchema);
