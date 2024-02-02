"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
//A new class that extends parent class Error
class AppError extends Error {
    constructor(message, status) {
        super(message); //initiates parent class and passes message parameter before adding custom property
        this.status = status; //passes status parameter to status property
    }
}
//When a client requests a resource that does not exist, this middleware is called.
const notFound = (req, res) => {
    res.status(404).json("Resource not found");
};
exports.notFound = notFound;
// Error handler for other types of errors
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const response = {
        error: true, // for clarity and response
        status,
        message: err.message,
    };
    console.error(err);
    res.status(status).json(response);
};
exports.errorHandler = errorHandler;
