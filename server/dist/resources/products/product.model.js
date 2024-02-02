"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.updateProductJoiSchema = exports.productJoiSchema = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
/* DEFINES SCHEMA FOR PRODUCT MODEL AND JOI SCHEMA FOR VALIDATION */
const productSchema = new mongoose_1.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    category: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "categories" }],
    tags: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "tags" }],
    content_rating: { type: String, default: "tba" },
    rating: { type: Number, default: 0 },
    year: { type: Number, require: true },
    image: { type: String, default: "image" },
    vhs: {
        price: Number,
        available: Boolean,
        quantity: Number,
        inStock: Number,
        stripe_price_id: String,
        stripe_prod_id: String,
    },
    digital: {
        price: Number,
        available: Boolean,
        stripe_price_id: String,
        stripe_prod_id: String,
    },
}, { versionKey: false });
const vhsJoiSchema = joi_1.default.object({
    price: joi_1.default.number().required(),
    available: joi_1.default.boolean().required(),
    quantity: joi_1.default.number().required(),
    inStock: joi_1.default.number().required(),
    stripe_price_id: joi_1.default.string(),
    stripe_prod_id: String,
});
const digitalJoiSchema = joi_1.default.object({
    price: joi_1.default.number().required(),
    available: joi_1.default.boolean().required(),
    stripe_price_id: joi_1.default.string(),
    stripe_prod_id: String,
});
exports.productJoiSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    category: joi_1.default.array().items(joi_1.default.string()).required().min(1),
    tags: joi_1.default.array().items(joi_1.default.string()).required().min(1),
    content_rating: joi_1.default.string(),
    rating: joi_1.default.number(),
    year: joi_1.default.number().required(),
    image: joi_1.default.string(),
    vhs: vhsJoiSchema.required(),
    digital: digitalJoiSchema.required(),
});
const vhsUpdateJoiSchema = joi_1.default.object({
    price: joi_1.default.number(),
    available: joi_1.default.boolean(),
    quantity: joi_1.default.number(),
    inStock: joi_1.default.number(),
    stripe_price_id: joi_1.default.string(),
    stripe_prod_id: String,
});
const digitalUpdateJoiSchema = joi_1.default.object({
    price: joi_1.default.number(),
    available: joi_1.default.boolean(),
    stripe_price_id: joi_1.default.string(),
    stripe_prod_id: String,
});
exports.updateProductJoiSchema = joi_1.default.object({
    title: joi_1.default.string(),
    description: joi_1.default.string(),
    category: joi_1.default.array().items(joi_1.default.string()).min(1),
    tags: joi_1.default.array().items(joi_1.default.string()).min(1),
    content_rating: joi_1.default.string(),
    rating: joi_1.default.number(),
    year: joi_1.default.number(),
    image: joi_1.default.string(),
    vhs: vhsUpdateJoiSchema,
    digital: digitalUpdateJoiSchema,
});
exports.ProductModel = mongoose_1.models.products || (0, mongoose_1.model)("products", productSchema);
