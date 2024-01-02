import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { CustomerModel } from "./customersModel";

export const getCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customers = await CustomerModel.find();
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
};

export const getCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer = await CustomerModel.findOne({ _id: req.params.id });
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

export const createCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, mail } = req.body;

    const existingMail = await CustomerModel.findOne({ mail: mail });

    if (existingMail) {
      return res.status(409).json("Email already in registered");
    } else {
      const customer = new CustomerModel(req.body);
      customer.password = await bcrypt.hash(password, 15);
      await customer.save();

      const jsonCust = customer.toJSON();
      delete jsonCust.password;

      // req.session.customer = jsonUser;

      res.status(201).json(jsonCust);
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingCustomer = await CustomerModel.findOne({
      mail: req.body.mail,
    }).select("+password");

    if (
      !existingCustomer ||
      !(await bcrypt.compare(req.body.password, existingCustomer.password))
    ) {
      return res.status(401).json("wrong mail or password");
    }

    if (req.session?.customer?._id) {
      return res.status(200).json("customer already logged in");
    }

    const customer = existingCustomer.toJSON();
    delete customer.password;
    req.session.customer = customer;

    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.session.customer = undefined;
    res.status(200).json("customer has logged out");
  } catch (error) {
    next(error);
  }
};

export const editCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const incomingData = req.body;
    const customer:string = req.params.id;

    console.log('Session Customer ID:', req.session?.customer?._id);
console.log('Request Param Customer ID:', customer);
    if (req.session?.customer?._id === undefined ||
      customer !== req.session?.customer?._id &&
      !req.session?.customer?.isAdmin) {
      return res.status(404).json({ message: 'Access denied' });
    }
  
    
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(customer, incomingData, { new: true, runValidators: true } );
    
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(updatedCustomer);
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CustomerModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json("customer deleted");
  } catch (error) {
    next(error);
  }
};
