import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (!error) {
        next();
    } else {
        //next(error);
        console.log(error);
        
    }
  };
};
