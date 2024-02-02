"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagModel = exports.tagJoiSchema = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
/* DEFINES SCHEMA FOR TAG MODEL AND JOI SCHEMA FOR VALIDATION */
const tagSchema = new mongoose_1.Schema({
    tag: { type: String, require: true },
}, { versionKey: false });
exports.tagJoiSchema = joi_1.default.object({
    _id: joi_1.default.string(),
    tag: joi_1.default.string().required(),
});
exports.TagModel = mongoose_1.models.tags || (0, mongoose_1.model)("tags", tagSchema);
