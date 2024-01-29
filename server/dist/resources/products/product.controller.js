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
exports.deleteProduct = exports.editProduct = exports.createProduct = exports.getProduct = exports.getProductBySearchCriteria = exports.getProducts = void 0;
const product_model_1 = require("./product.model");
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.ProductModel.find();
        res.status(200).json(products);
    }
    catch (error) {
        next(error);
    }
});
exports.getProducts = getProducts;
const getProductBySearchCriteria = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield product_model_1.ProductModel.find(req.body);
        res.status(200).json(orders);
    }
    catch (error) {
        next(error);
    }
});
exports.getProductBySearchCriteria = getProductBySearchCriteria;
// export const getProductsByTag = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const orders = await ProductModel.find({
//       tags: {  $in: req.params.id }
//     });
//     res.status(200).json(orders);
//   } catch (error) {
//     next(error);
//   }
// };
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.ProductModel.findOne({ _id: req.params.id });
        if (!product) {
            return res.status(404).json({ error: 'Unknown ID' });
        }
        res.status(200).json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.getProduct = getProduct;
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkProduct = yield product_model_1.ProductModel.findOne({ title: req.body.title });
        if (!checkProduct) {
            const newProduct = yield product_model_1.ProductModel.create(req.body);
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
    try {
        const incomingData = req.body;
        const product = req.params.id;
        const updatedProduct = yield product_model_1.ProductModel.findByIdAndUpdate(product, incomingData, { new: true });
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        next(error);
    }
});
exports.editProduct = editProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product_model_1.ProductModel.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json("product deleted");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProduct = deleteProduct;
