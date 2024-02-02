import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

/* MIDDLEWARE TO VALIDATE REQUEST DATA AGAINST A PROVIDED JOI SCHEMA */

export const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (!error) {
      next();
    } else {
      next(error);
    }
  };
};
