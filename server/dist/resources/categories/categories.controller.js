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
exports.deleteCat = exports.createCat = exports.getCat = exports.getCats = void 0;
const categories_model_1 = require("./categories.model");
const getCats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categories_model_1.CategoryModel.find();
        res.status(200).json(categories);
    }
    catch (error) {
        next(error);
    }
});
exports.getCats = getCats;
const getCat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categories_model_1.CategoryModel.findOne({ _id: req.params.id });
        if (!category) {
            return res.status(404).json({ error: 'Unknown ID' });
        }
        res.status(200).json(category);
    }
    catch (error) {
        next(error);
    }
});
exports.getCat = getCat;
const createCat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkCat = yield categories_model_1.CategoryModel.findOne(req.body);
        if (!checkCat) {
            const newCategory = yield categories_model_1.CategoryModel.create(req.body);
            res.status(201).json(newCategory);
        }
        else {
            res.status(404).json(req.body.category + ' already created');
        }
    }
    catch (error) {
        next(error);
    }
});
exports.createCat = createCat;
const deleteCat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield categories_model_1.CategoryModel.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json('category deleted');
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCat = deleteCat;
