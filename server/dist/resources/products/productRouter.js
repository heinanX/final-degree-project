"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const productController_1 = require("./productController");
const isAdmin_1 = require("../_middlewares/isAdmin");
const validateSchema_1 = require("../_middlewares/validateSchema");
const productModel_1 = require("./productModel");
const formatData_1 = require("../_middlewares/formatData");
const createProduct_1 = require("../_middlewares/stripe/createProduct");
const archiveProduct_1 = require("../_middlewares/stripe/archiveProduct");
exports.productRouter = (0, express_1.Router)();
exports.productRouter.get('/', productController_1.getProducts);
exports.productRouter.get('/:id', productController_1.getProduct);
exports.productRouter.post('/create', (0, validateSchema_1.validate)(productModel_1.productJoiSchema), formatData_1.formatData, createProduct_1.createStripeProduct, productController_1.createProduct);
exports.productRouter.post('/edit-product/:id', isAdmin_1.isAdmin, (0, validateSchema_1.validate)(productModel_1.productJoiSchema), formatData_1.formatData, productController_1.editProduct);
exports.productRouter.delete('/delete/:id', isAdmin_1.isAdmin, archiveProduct_1.archiveStripeProduct, productController_1.deleteProduct);
