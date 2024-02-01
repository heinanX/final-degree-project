import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { CustomerModel } from "./customers.model";

// Get all customers
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

// Get a specific customer by ID
export const getCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer = await CustomerModel.findOne({ _id: req.params.id });
    if (!customer) {
      return res.status(404).json({ error: "Unknown Customer ID" });
    }
    customer.password = "hidden"; // Hide the password in the response
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

// Get details of the currently logged-in customer
export const getCustomerDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer = req.session.customer?.mail;
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

// Create a new customer
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
    delete jsonCust.password; // Hide the password in the response

    req.session.customer = jsonCust; // Store customer data in the session
    res.status(201).json({ mail: jsonCust.mail, isAdmin: jsonCust.isAdmin });
  } catch (error) {
    next(error);
  }
};

// Log in a customer
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
    delete customer.password; // Hide the password in the response
    req.session.customer = customer; // Store customer data in the session

    res.status(200).json({ mail: customer.mail, isAdmin: customer.isAdmin });
  } catch (error) {
    next(error);
  }
};

// Get details of the currently active login
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

// Log out the currently logged-in customer
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.session.customer = undefined; // Clear customer data from the session
    res.status(200).json("Customer has logged out");
  } catch (error) {
    next(error);
  }
};

// Edit customer details
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

// Delete a customer by ID
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
