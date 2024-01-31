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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomer = exports.editCustomer = exports.logout = exports.activeLogin = exports.login = exports.createCustomer = exports.getCustomerDetails = exports.getCustomer = exports.getCustomers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const customers_model_1 = require("./customers.model");
const getCustomers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield customers_model_1.CustomerModel.find();
        res.status(200).json(customers);
    }
    catch (error) {
        next(error);
    }
});
exports.getCustomers = getCustomers;
const getCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield customers_model_1.CustomerModel.findOne({ _id: req.params.id });
        if (!customer) {
            return res.status(404).json({ error: 'Unknown Customer ID' });
        }
        customer.password = 'hidden';
        res.status(200).json(customer);
    }
    catch (error) {
        next(error);
    }
});
exports.getCustomer = getCustomer;
const getCustomerDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const customer = (_a = req.session.customer) === null || _a === void 0 ? void 0 : _a.mail;
        res.status(200).json(customer);
    }
    catch (error) {
        next(error);
    }
});
exports.getCustomerDetails = getCustomerDetails;
const createCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = new customers_model_1.CustomerModel(req.body);
        customer.password = yield bcrypt_1.default.hash(req.body.password, 15);
        yield customer.save();
        const jsonCust = customer.toJSON();
        delete jsonCust.password;
        req.session.customer = jsonCust;
        res.status(201).json({ mail: jsonCust.mail, isAdmin: jsonCust.isAdmin });
    }
    catch (error) {
        next(error);
    }
});
exports.createCustomer = createCustomer;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const existingCustomer = yield customers_model_1.CustomerModel.findOne({
            mail: req.body.mail,
        }).select("+password");
        if (!existingCustomer ||
            !(yield bcrypt_1.default.compare(req.body.password, existingCustomer.password))) {
            return res.status(401).json("wrong mail or password");
        }
        if ((_c = (_b = req.session) === null || _b === void 0 ? void 0 : _b.customer) === null || _c === void 0 ? void 0 : _c._id) {
            return res.status(200).json("customer already logged in");
        }
        const customer = existingCustomer.toJSON();
        delete customer.password;
        req.session.customer = customer;
        res.status(200).json({ mail: customer.mail, isAdmin: customer.isAdmin });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const activeLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f, _g;
    try {
        const activeLoginRes = {
            mail: (_e = (_d = req.session) === null || _d === void 0 ? void 0 : _d.customer) === null || _e === void 0 ? void 0 : _e.mail,
            isAdmin: (_g = (_f = req.session) === null || _f === void 0 ? void 0 : _f.customer) === null || _g === void 0 ? void 0 : _g.isAdmin
        };
        res.status(200).json(activeLoginRes);
    }
    catch (error) {
        next(error);
    }
});
exports.activeLogin = activeLogin;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.session.customer = undefined;
        res.status(200).json("customer has logged out");
    }
    catch (error) {
        next(error);
    }
});
exports.logout = logout;
const editCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incomingData = req.body;
        const customer = req.params.id;
        const updatedCustomer = yield customers_model_1.CustomerModel.findByIdAndUpdate(customer, incomingData, { new: true });
        res.status(200).json(updatedCustomer);
    }
    catch (error) {
        next(error);
    }
});
exports.editCustomer = editCustomer;
const deleteCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield customers_model_1.CustomerModel.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json("customer deleted");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCustomer = deleteCustomer;
