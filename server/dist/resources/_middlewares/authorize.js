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
exports.authorization = void 0;
const isAdmin_1 = require("./isAdmin");
/* A MIDDLEWARE THAT CONFIRMS USER AUTHORIZATION WHEN MAKING REQUESTS */
const authorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const customerId = req.params.id;
        const sessionCustomerId = (_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.customer) === null || _b === void 0 ? void 0 : _b._id;
        // ALLOW ACCESS IF USER IS FETCHING OWN DATA
        if (customerId && sessionCustomerId && customerId === sessionCustomerId) {
            return next();
        }
        // ALLOW ACCESS IF USER IS FETCHING OWN DATA
        if (sessionCustomerId) {
            return next();
        }
        // CHECK IF USER IS ADMIN
        return (0, isAdmin_1.isAdmin)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
exports.authorization = authorization;
