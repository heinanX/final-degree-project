import { NextFunction, Request, Response } from "express";
import { OrderModel } from "./orders.model";
const stripe = require('stripe')(process.env.STRIPE_SECRETKEY);

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
export const getUserOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await OrderModel.find({customer: req.session?.customer?._id});
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
    if (!order) {
      return res.status(404).json({ error: 'Unknown Order ID' });
    }

    if (order.customer === req.session?.customer?._id || req.session?.customer?.isAdmin ) {
      return res.status(200).json(order);
    } else {
      return res.status(200).json('unable to fetch order. Check permission status');
    }

  } catch (error) {
    next(error);
  }
};

export const createOrder = async ( req: Request,
  res: Response) => {

  const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:5173/success?id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/failed',
      payment_method_types: ['card'],
      mode: 'payment',
      currency: 'sek',
      allow_promotion_codes: true,
      customer: req.body.userId,
      line_items: req.body.order
  })
  res.status(200).json({
      url: session.url,
  });
}

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
