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
exports.deleteProduct = exports.editProduct = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
const productModel_1 = require("./productModel");
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.ProductModel.find();
        res.status(200).json(products);
    }
    catch (error) {
        next(error);
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.ProductModel.findOne({ _id: req.params.id });
        res.status(200).json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.getProduct = getProduct;
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkProduct = yield productModel_1.ProductModel.findOne({ title: req.body.title });
        if (!checkProduct) {
            const newProduct = yield productModel_1.ProductModel.create(req.body);
            res.status(201).json(newProduct);
        }
        else {
            res.status(404).json(req.body.title + " already created");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.createProduct = createProduct;
const editProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    try {
        const incomingData = req.body;
        const customer = req.params.id;
        console.log("Session Customer ID:", (_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.customer) === null || _b === void 0 ? void 0 : _b._id);
        console.log("Request Param Customer ID:", customer);
        if (((_d = (_c = req.session) === null || _c === void 0 ? void 0 : _c.customer) === null || _d === void 0 ? void 0 : _d._id) === undefined ||
            (customer !== ((_f = (_e = req.session) === null || _e === void 0 ? void 0 : _e.customer) === null || _f === void 0 ? void 0 : _f._id) &&
                !((_h = (_g = req.session) === null || _g === void 0 ? void 0 : _g.customer) === null || _h === void 0 ? void 0 : _h.isAdmin))) {
            return res.status(404).json({ message: "Access denied" });
        }
        const updatedCustomer = yield productModel_1.ProductModel.findByIdAndUpdate(customer, incomingData, { new: true, runValidators: true });
        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(updatedCustomer);
    }
    catch (error) {
        next(error);
    }
});
exports.editProduct = editProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield productModel_1.ProductModel.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json("product deleted");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProduct = deleteProduct;
