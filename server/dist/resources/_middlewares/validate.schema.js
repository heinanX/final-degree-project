"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
/* MIDDLEWARE TO VALIDATE REQUEST DATA AGAINST A PROVIDED JOI SCHEMA */
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (!error) {
            next();
        }
        else {
            next(error);
        }
    };
};
exports.validate = validate;
