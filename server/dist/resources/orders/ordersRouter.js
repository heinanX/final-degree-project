"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const ordersController_1 = require("./ordersController");
const isAdmin_1 = require("../_middlewares/isAdmin");
const validateSchema_1 = require("../_middlewares/validateSchema");
const ordersModel_1 = require("./ordersModel");
const formatData_1 = require("../_middlewares/formatData");
const authorize_1 = require("../_middlewares/authorize");
const authenticateUser_1 = require("../_middlewares/authenticateUser");
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.get('/', isAdmin_1.isAdmin, ordersController_1.getOrders);
exports.orderRouter.get('/user-orders/:id', authorize_1.authorization, ordersController_1.getOrders);
exports.orderRouter.get('/:id', ordersController_1.getOrder);
exports.orderRouter.post('/create', (0, validateSchema_1.validate)(ordersModel_1.orderJoiSchema), formatData_1.formatData, ordersController_1.createOrderDB);
exports.orderRouter.post('/create-checkout-session', authenticateUser_1.authenticateUser, ordersController_1.createOrder);
exports.orderRouter.put('/manage-order/:id', (0, validateSchema_1.validate)(ordersModel_1.markOrderJoiSchema), formatData_1.formatData, ordersController_1.manageOrder);
exports.orderRouter.delete('/delete/:id', isAdmin_1.isAdmin, ordersController_1.deleteOrder);
