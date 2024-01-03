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
exports.deleteTag = exports.createTag = exports.getTag = exports.getTags = void 0;
const tagsModel_1 = require("./tagsModel");
const getTags = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield tagsModel_1.TagModel.find();
        res.status(200).json(tags);
    }
    catch (error) {
        next(error);
    }
});
exports.getTags = getTags;
const getTag = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield tagsModel_1.TagModel.findOne({ _id: req.params.id });
        res.status(200).json(category);
    }
    catch (error) {
        next(error);
    }
});
exports.getTag = getTag;
const createTag = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkTag = yield tagsModel_1.TagModel.findOne(req.body);
        if (!checkTag) {
            const newTag = yield tagsModel_1.TagModel.create(req.body);
            res.status(201).json(newTag);
        }
        else {
            res.status(404).json(req.body.tag + ' already created');
        }
    }
    catch (error) {
        next(error);
    }
});
exports.createTag = createTag;
const deleteTag = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield tagsModel_1.TagModel.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json('tag deleted');
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTag = deleteTag;
