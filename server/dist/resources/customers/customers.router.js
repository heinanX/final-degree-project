"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRouter = void 0;
const express_1 = require("express");
const customers_controller_1 = require("./customers.controller");
const isAdmin_1 = require("../_middlewares/isAdmin");
const validate_schema_1 = require("../_middlewares/validate.schema");
const customers_model_1 = require("./customers.model");
const format_data_1 = require("../_middlewares/format.data");
const create_customer_1 = require("../_middlewares/stripe/customer/create.customer");
const delete_customer_1 = require("../_middlewares/stripe/customer/delete.customer");
const update_customer_1 = require("../_middlewares/stripe/customer/update.customer");
const authorize_1 = require("../_middlewares/authorize");
const authenticateLogin_1 = require("../_middlewares/authenticateLogin");
exports.customerRouter = (0, express_1.Router)();
exports.customerRouter.get('/active', authenticateLogin_1.authenticateLogin, customers_controller_1.activeLogin);
//customerRouter.get('/customer-details', getCustomerDetails);
exports.customerRouter.get('/', isAdmin_1.isAdmin, customers_controller_1.getCustomers);
exports.customerRouter.get('/:id', authorize_1.authorization, customers_controller_1.getCustomerById);
exports.customerRouter.post('/create', (0, validate_schema_1.validate)(customers_model_1.customerJoiSchema), format_data_1.formatData, create_customer_1.createStripeCus, customers_controller_1.createCustomer);
exports.customerRouter.post('/login', format_data_1.formatData, customers_controller_1.login);
exports.customerRouter.post('/logout', customers_controller_1.logout);
exports.customerRouter.post('/edit-customer/:id', format_data_1.formatData, authorize_1.authorization, (0, validate_schema_1.validate)(customers_model_1.updateCustomerJoiSchema), update_customer_1.updateStripeCustomer, customers_controller_1.editCustomer);
exports.customerRouter.delete('/delete/:id', authorize_1.authorization, delete_customer_1.deleteStripeCus, customers_controller_1.deleteCustomer);
