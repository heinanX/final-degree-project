import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { CustomerModel } from "./customersModel";
//const stripe = require('stripe')(process.env.STRIPE_SECRETKEY);

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
    const customer = new CustomerModel(req.body);
    customer.password = await bcrypt.hash(req.body.password, 15);
    await customer.save();

    const jsonCust = customer.toJSON();
    delete jsonCust.password;

    req.session.customer = jsonCust;
    res.status(201).json(jsonCust);
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
    const customer: string = req.params.id;

    if (
      req.session?.customer?._id === undefined ||
      customer !== req.session?.customer?._id
    ) {
      return res.status(404).json({ message: "Access denied" });
    }

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
    // await stripe.customers.delete({
    //   email: jsonCust.mail,
    //   description: jsonCust.mail
    // })
    await CustomerModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json("customer deleted");
  } catch (error) {
    next(error);
  }
};
