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
exports.isAdmin = void 0;
/* MIDDLEWARE TO CHECK IF THE USER IS AN ADMIN BEFORE GRANTING ACCESS */
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if ((_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.customer) === null || _b === void 0 ? void 0 : _b.isAdmin) {
        next();
    }
    else {
        res.status(403).json(`Access denied. Must be Admin.`);
    }
});
exports.isAdmin = isAdmin;
