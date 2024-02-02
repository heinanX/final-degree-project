import { NextFunction, Request, Response } from "express";
import { ProductModel } from "./product.model";

/* CRUD OPERATIONS FOR PRODUCT
 *  getProducts, getProductBySearchCriteria, getProductById, createProduct, deleteProduct
 */

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

export const getProductBySearchCriteria = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await ProductModel.find(req.body);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductModel.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(404).json({ error: "Unknown ID" });
    }
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
    const existingProduct = await ProductModel.findOne({ title: req.body.title });
    if (!existingProduct) {
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
    const productId: string = req.params.id;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      incomingData,
      { new: true }
    );
    res.status(200).json(updatedProduct);
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
