"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const session = require('express-session');
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const customersRouter_1 = require("./resources/customers/customersRouter");
exports.app = (0, express_1.default)();
const cookieSecret = process.env.COOKIE_SESSION_KEY;
if (!cookieSecret) {
    throw new Error('The COOKIE_SESSION_KEY environment variable is not defined.');
}
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(session({
    secret: cookieSecret,
    resave: false,
    saveUninitialized: true,
}));
exports.app.use('/api/customers', customersRouter_1.customerRouter);
