import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { CustomerModel } from "./customers.model";

/* CRUD OPERATIONS FOR ORDER AND FUNCTIONS ASSOCIATED WITH LOGIN
 *  getCustomers, getCustomerById, createCustomer, login
 *  activeLogin, logout, editCustomer , deleteCustomer 
 */

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

export const getCustomerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingCustomer = await CustomerModel.findOne({ _id: req.params.id });
    if (!existingCustomer) {
      return res.status(404).json({ error: "Unknown Customer ID" });
    }
    existingCustomer.password = "hidden";
    res.status(200).json(existingCustomer);
  } catch (error) {
    next(error);
  }
};

// export const getCustomerDetails = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const customer = req.session.customer?.mail;
//     res.status(200).json(customer);
//   } catch (error) {
//     next(error);
//   }
// };

export const createCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer = new CustomerModel(req.body);
    customer.password = await bcrypt.hash(req.body.password, 15);
    await customer.save();

    const jsonCust = customer.toJSON();
    delete jsonCust.password;

    req.session.customer = jsonCust;
    res.status(201).json({ mail: jsonCust.mail, isAdmin: jsonCust.isAdmin });
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
      return res.status(401).json("Wrong mail or password");
    }

    if (req.session?.customer?._id) {
      return res.status(200).json("Customer already logged in");
    }

    const customer = existingCustomer.toJSON();
    delete customer.password;
    req.session.customer = customer;

    res.status(200).json({ mail: customer.mail, isAdmin: customer.isAdmin });
  } catch (error) {
    next(error);
  }
};

export const activeLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const activeLoginRes = {
      mail: req.session?.customer?.mail,
      isAdmin: req.session?.customer?.isAdmin,
    };
    res.status(200).json(activeLoginRes);
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
    res.status(200).json("Customer has logged out");
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
    const customer: string = req.params.id;

    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
      customer,
      incomingData,
      { new: true }
    );

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
    res.status(200).json("Customer deleted");
  } catch (error) {
    next(error);
  }
};
