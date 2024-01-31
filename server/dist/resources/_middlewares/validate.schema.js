"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
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
