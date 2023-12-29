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
exports.deleteCustomer = exports.editCustomer = exports.logout = exports.login = exports.createCustomer = exports.getCustomer = exports.getCustomers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const customersModel_1 = require("./customersModel");
const getCustomers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield customersModel_1.CustomerModel.find();
        res.status(200).json(customers);
    }
    catch (error) {
        next(error);
    }
});
exports.getCustomers = getCustomers;
const getCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield customersModel_1.CustomerModel.findOne({ _id: req.params.id });
        res.status(200).json(customer);
    }
    catch (error) {
        next(error);
    }
});
exports.getCustomer = getCustomer;
const createCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, mail } = req.body;
        const existingMail = yield customersModel_1.CustomerModel.findOne({ mail: mail });
        if (existingMail) {
            return res.status(409).json("Email already in registered");
        }
        else {
            const customer = new customersModel_1.CustomerModel(req.body);
            customer.password = yield bcrypt_1.default.hash(password, 15);
            yield customer.save();
            const jsonCust = customer.toJSON();
            delete jsonCust.password;
            // req.session = jsonUser;
            res.status(201).json(jsonCust);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.createCustomer = createCustomer;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const existingCustomer = yield customersModel_1.CustomerModel.findOne({
            mail: req.body.mail,
        }).select("+password");
        if (!existingCustomer ||
            !(yield bcrypt_1.default.compare(req.body.password, existingCustomer.password))) {
            return res.status(401).json("wrong mail or password");
        }
        if ((_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.customer) === null || _b === void 0 ? void 0 : _b._id) {
            return res.status(200).json("customer already logged in");
        }
        const customer = existingCustomer.toJSON();
        delete customer.password;
        req.session.customer = customer;
        res.status(200).json(customer);
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
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
    var _c, _d, _e, _f, _g, _h, _j, _k;
    try {
        const incomingData = req.body;
        const customer = req.params.id;
        console.log('Session Customer ID:', (_d = (_c = req.session) === null || _c === void 0 ? void 0 : _c.customer) === null || _d === void 0 ? void 0 : _d._id);
        console.log('Request Param Customer ID:', customer);
        if (((_f = (_e = req.session) === null || _e === void 0 ? void 0 : _e.customer) === null || _f === void 0 ? void 0 : _f._id) === undefined ||
            customer !== ((_h = (_g = req.session) === null || _g === void 0 ? void 0 : _g.customer) === null || _h === void 0 ? void 0 : _h._id) &&
                !((_k = (_j = req.session) === null || _j === void 0 ? void 0 : _j.customer) === null || _k === void 0 ? void 0 : _k.isAdmin)) {
            return res.status(404).json({ message: 'Access denied' });
        }
        // const customer = await CustomerModel.findOne({ _id: req.session?.customer?._id });
        const updatedCustomer = yield customersModel_1.CustomerModel.findByIdAndUpdate(customer, incomingData, { new: true, runValidators: true });
        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(updatedCustomer);
    }
    catch (error) {
        next(error);
    }
});
exports.editCustomer = editCustomer;
const deleteCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield customersModel_1.CustomerModel.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json("customer deleted");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCustomer = deleteCustomer;
