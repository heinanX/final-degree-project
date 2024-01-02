import { NextFunction, Request, Response } from "express";
import { ProductModel } from "./productModel";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductModel.findOne({ _id: req.params.id });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const checkProduct = await ProductModel.findOne({ title: req.body.title });
    if (!checkProduct) {
      const newProduct = await ProductModel.create(req.body);
      res.status(201).json(newProduct);
    } else {
      res.status(404).json(req.body.title + " already created");
    }
  } catch (error) {
    next(error);
  }
};

export const editProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const incomingData = req.body;
    const customer: string = req.params.id;

    console.log("Session Customer ID:", req.session?.customer?._id);
    console.log("Request Param Customer ID:", customer);
    if (
      req.session?.customer?._id === undefined ||
      (customer !== req.session?.customer?._id &&
        !req.session?.customer?.isAdmin)
    ) {
      return res.status(404).json({ message: "Access denied" });
    }

    const updatedCustomer = await ProductModel.findByIdAndUpdate(
      customer,
      incomingData,
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(updatedCustomer);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ProductModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json("product deleted");
  } catch (error) {
    next(error);
  }
};
