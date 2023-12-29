import { Request, Response, NextFunction } from "express";
import { CustomerModel } from "./customersModel";

export const createCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {

        const customer = new CustomerModel(req.body);
        const savedCustomer = await customer.save();

        res.status(201).json(savedCustomer);
      
    } catch (error) {
console.log(error);

    }
  };