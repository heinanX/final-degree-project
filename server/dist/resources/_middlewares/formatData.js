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
exports.formatData = void 0;
const formatData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.mail) {
        req.body.mail = req.body.mail.toLowerCase();
        return next();
    }
    if (req.body.title && req.body.description) {
        req.body.title = req.body.title.toLowerCase();
        req.body.description = req.body.description.toLowerCase();
        return next();
    }
    const stringifiedData = JSON.stringify(req.body);
    const format = stringifiedData.toLowerCase();
    const formattedData = JSON.parse(format);
    req.body = formattedData;
    next();
});
exports.formatData = formatData;
