"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRouter = void 0;
const express_1 = require("express");
const customersController_1 = require("./customersController");
const isAdmin_1 = require("../_middlewares/isAdmin");
const validateSchema_1 = require("../_middlewares/validateSchema");
const customersModel_1 = require("./customersModel");
const formatData_1 = require("../_middlewares/formatData");
const createUserStripe_1 = require("../_middlewares/createUserStripe");
exports.customerRouter = (0, express_1.Router)();
exports.customerRouter.get('/', customersController_1.getCustomers);
exports.customerRouter.get('/:id', customersController_1.getCustomer);
exports.customerRouter.post('/create', (0, validateSchema_1.validate)(customersModel_1.customerJoiSchema), formatData_1.formatData, createUserStripe_1.createStripeCus, customersController_1.createCustomer);
exports.customerRouter.post('/login', customersController_1.login);
exports.customerRouter.post('/logout', customersController_1.logout);
exports.customerRouter.post('/edit-customer/:id', (0, validateSchema_1.validate)(customersModel_1.customerJoiSchema), customersController_1.editCustomer);
exports.customerRouter.delete('/delete/:id', isAdmin_1.isAdmin, customersController_1.deleteCustomer);
