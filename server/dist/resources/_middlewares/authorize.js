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
exports.authorize = void 0;
/* A MIDDLEWARE THAT CONFIRMS USER AUTHORIZATION WHEN MAKING REQUESTS
 * if Admin, allow all access,
 * if session customer id equals requested resource allaw access
 */
const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const sessionCustomerIsAdmin = (_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.customer) === null || _b === void 0 ? void 0 : _b.isAdmin;
        const sessionCustomerId = (_d = (_c = req.session) === null || _c === void 0 ? void 0 : _c.customer) === null || _d === void 0 ? void 0 : _d._id;
        const paramsCustomerId = req.params.id;
        const paramsKey = req.params.key;
        if (sessionCustomerIsAdmin) {
            return next();
        }
        if (sessionCustomerId === paramsCustomerId || paramsKey) {
            return next();
        }
        return res.status(403).json({ error: "Unauthorized access" });
    }
    catch (error) {
        next(error);
    }
});
exports.authorize = authorize;
