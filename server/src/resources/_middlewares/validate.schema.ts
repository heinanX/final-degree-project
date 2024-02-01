import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

/* MIDDLEWARE TO VALIDATE REQUEST DATA AGAINST A PROVIDED JOI SCHEMA */
export const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Validate the request body against the provided Joi schema
    const { error } = schema.validate(req.body);

    // Check if there is no validation error
    if (!error) {
      // If no error, proceed to the next middleware or route handler
      next();
    } else {
      // If there is a validation error, pass the error to the next middleware (error handling)
      next(error);
    }
  };
};
