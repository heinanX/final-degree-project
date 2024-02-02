"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModel = exports.updateCustomerJoiSchema = exports.customerJoiSchema = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
/* DEFINES SCHEMA FOR CUSTOMER MODEL AND JOI SCHEMA FOR VALIDATION */
const customerSchema = new mongoose_1.Schema({
    username: { type: String, default: "" },
    mail: { type: String, require: true },
    password: { type: String, require: true },
    joinDate: { type: Date, default: Date.now() },
    isAdmin: { type: Boolean, require: true, default: false },
    address: [
        {
            _id: String,
            street: String,
            zip: String,
            city: String,
        },
    ],
    orders: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "customers" }],
    stripe_id: String,
}, { versionKey: false });
const addressJoiSchema = joi_1.default.object({
    _id: String,
    street: String,
    zip: String,
    city: String,
});
exports.customerJoiSchema = joi_1.default.object({
    _id: joi_1.default.string(),
    username: joi_1.default.string(),
    mail: joi_1.default.string().email({ minDomainSegments: 2 }).required(),
    password: joi_1.default.string().required(),
    joinDate: joi_1.default.date(),
    isAdmin: joi_1.default.boolean(),
    address: joi_1.default.array().items(addressJoiSchema),
    orders: joi_1.default.array(),
    stripe_id: joi_1.default.string(),
});
exports.updateCustomerJoiSchema = joi_1.default.object({
    mail: joi_1.default.string().email({ minDomainSegments: 2 }),
    password: joi_1.default.string(),
    isAdmin: joi_1.default.boolean(),
    address: joi_1.default.array().items(addressJoiSchema),
    username: joi_1.default.string()
});
exports.CustomerModel = mongoose_1.models.customers || (0, mongoose_1.model)("customers", customerSchema);
