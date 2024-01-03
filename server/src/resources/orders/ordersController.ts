import { NextFunction, Request, Response } from "express";
import { OrderModel } from "./ordersModel";

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await OrderModel.findOne({ _id: req.params.id });
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const createOrderDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newProduct = await OrderModel.create(req.body);

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const manageOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateData = req.body;
    const product: string = req.params.id;

    const updatedProduct = await OrderModel.findByIdAndUpdate(
      product,
      updateData,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await OrderModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json("order deleted");
  } catch (error) {
    next(error);
  }
};
