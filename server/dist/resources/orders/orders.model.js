"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.orderJoiSchema = exports.markOrderJoiSchema = exports.orderSchema = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const subOrderSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "products",
        require: true,
    },
    quantity: Number,
    vhs: Boolean,
    digital: Boolean
}, { _id: false });
const addressSchema = new mongoose_1.Schema({
    cust_name: String,
    street: String,
    zip_code: String,
    city: String
}, { _id: false });
exports.orderSchema = new mongoose_1.Schema({
    customer: { type: mongoose_1.Schema.Types.ObjectId, ref: "customers", require: true },
    address: addressSchema,
    order: [subOrderSchema],
    total_price: { type: Number, default: 0, require: true },
    discount: { type: Number, default: 0 },
    date: { type: Date, default: Date.now() },
    shipped: { type: Boolean, default: false },
    returned: { type: Boolean, default: false },
    payment_status: { type: String, default: "pending" },
    order_status: { type: String, default: "active" },
    session_id: String
}, { versionKey: false });
const subOrderJoiSchema = joi_1.default.object({
    product: joi_1.default.string(),
    quantity: joi_1.default.number(),
    vhs: joi_1.default.boolean(),
    digital: joi_1.default.boolean()
});
const addressJoiSchema = joi_1.default.object({
    cust_name: joi_1.default.string(),
    street: joi_1.default.string(),
    zip_code: joi_1.default.string(),
    city: joi_1.default.string()
});
exports.markOrderJoiSchema = joi_1.default.object({
    shipped: joi_1.default.boolean(),
    returned: joi_1.default.boolean(),
    payment_status: joi_1.default.string(),
    order_status: joi_1.default.string(),
    address: addressJoiSchema
});
exports.orderJoiSchema = joi_1.default.object({
    customer: joi_1.default.string().required(),
    address: addressJoiSchema.required(),
    order: joi_1.default.array().items(subOrderJoiSchema).required(),
    total_price: joi_1.default.number().required(),
    discount: joi_1.default.number(),
    date: joi_1.default.date(),
    shipped: joi_1.default.boolean(),
    returned: joi_1.default.boolean(),
    payment_status: joi_1.default.string(),
    order_status: joi_1.default.string(),
    session_id: joi_1.default.string()
});
exports.OrderModel = mongoose_1.models.orders || (0, mongoose_1.model)("orders", exports.orderSchema);
