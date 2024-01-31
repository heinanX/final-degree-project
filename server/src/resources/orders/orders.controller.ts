import { NextFunction, Request, Response } from "express";
import { OrderModel } from "./orders.model";
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);

/* FUNCTION THAT FETCHES ALL ORDERS FROM DATABASE */
export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Fetch all orders from database
    const orders = await OrderModel.find();

    // Respond with a JSON array of orders
    res.status(200).json(orders);
  } catch (error) {
    // if error, pass on error to error handler
    next(error);
  }
};

/* FUNCTION THAT FETCHES ALL ORDERS FOR ONE USER FROM DATABASE */
export const getUserOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Fetch all orders for the specific user from the database
    const orders = await OrderModel.find({
      customer: req.session?.customer?._id,
    });

    // Respond with a JSON array of user-specific orders
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

/* FUNCTION THAT FETCHES SPECIFIED ORDER FROM DATABASE
  It checks if the order exists and if the requester has permission to access it.
  */
export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Attempt to find the order in the database using the OrderModel and the specified order ID
    const order = await OrderModel.findOne({ _id: req.params.id });
    // If order is not found, respond with a status of 'not found' and an error message
    if (!order) {
      return res.status(404).json({ error: "Unknown Order ID" });
    }

    // Check if requester has permission to access order data
    if (
      order.customer === req.session?.customer?._id ||
      req.session?.customer?.isAdmin
    ) {
      // if permission, respond with order data
      return res.status(200).json(order);
    } else {
      // if not, respond with a status forbidden
      return res
        .status(403)
        .json("Unable to fetch order. Check permission status");
    }
  } catch (error) {
    next(error);
  }
};

/*  CREATES NEW CHECKOUT WITH STRIPE API TO PROCESS PAYMENT */
export const createCheckoutSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Use Stripe API to create a new checkout session
    const session = await stripe.checkout.sessions.create({
      success_url: "http://localhost:5173/success?id={CHECKOUT_SESSION_ID}", //sets success url
      cancel_url: "http://localhost:5173/failed", // sets url if order fails
      payment_method_types: ["card"], // sets cards as valid payment method
      mode: "payment", //accept one-time payments for cards
      currency: "sek", // sets currencies
      allow_promotion_codes: true, // allows for discount codes
      customer: req.session.customer?.stripe_id, // customer's id that's saved in sessions
      line_items: req.body, // object with the order
    });

    // Respond with the URL of the created checkout session
    res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    next(error);
  }
};

/*  CREATES ORDER IN OFFICIAL DATABASE */
export const createOrderDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {    
    // Attempt to create a new order in database using the OrderModel
    const newProduct = await OrderModel.create(req.body);

    // Respond with a status created and the created order in JSON format
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

/*  MANAGE OR UPDATE VALUES IN AN ORDER FROM DB */
export const manageOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract update data and order ID from the request
    const updateData = req.body;
    const product: string = req.params.id;

    // Find and update the specified order in the database
    const updatedProduct = await OrderModel.findByIdAndUpdate(
      product,
      updateData,
      { new: true }
    );

    // Respond with the updated order
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

/*  DELETE ORDER FROM DB */
export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Find and delete order from database
    await OrderModel.findByIdAndDelete({ _id: req.params.id });

    // Respond with success message
    res.status(200).json("order deleted");
  } catch (error) {
    next(error);
  }
};
