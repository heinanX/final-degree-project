"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = exports.catJoiSchema = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const categorySchema = new mongoose_1.Schema({
    category: { type: String, require: true }
}, { versionKey: false });
exports.catJoiSchema = joi_1.default.object({
    _id: joi_1.default.string(),
    category: joi_1.default.string().required()
});
exports.CategoryModel = mongoose_1.models.categories || (0, mongoose_1.model)("categories", categorySchema);
