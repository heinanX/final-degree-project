"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const isAdmin_1 = require("../_middlewares/isAdmin");
const validate_schema_1 = require("../_middlewares/validate.schema");
const product_model_1 = require("./product.model");
const format_data_1 = require("../_middlewares/format.data");
const create_product_1 = require("../_middlewares/stripe/product/create.product");
const archive_product_1 = require("../_middlewares/stripe/product/archive.product");
const update_product_1 = require("../_middlewares/stripe/product/update.product");
exports.productRouter = (0, express_1.Router)();
exports.productRouter.get('/', product_controller_1.getProducts);
exports.productRouter.get('/:id', product_controller_1.getProductById);
exports.productRouter.post('/search', product_controller_1.getProductBySearchCriteria);
exports.productRouter.post('/create', isAdmin_1.isAdmin, (0, validate_schema_1.validate)(product_model_1.productJoiSchema), format_data_1.formatData, create_product_1.createStripeProduct, product_controller_1.createProduct);
exports.productRouter.put('/edit-product/:id', isAdmin_1.isAdmin, (0, validate_schema_1.validate)(product_model_1.updateProductJoiSchema), update_product_1.updateStripeProduct, product_controller_1.editProduct);
exports.productRouter.delete('/delete/:id', isAdmin_1.isAdmin, archive_product_1.archiveStripeProduct, product_controller_1.deleteProduct);
