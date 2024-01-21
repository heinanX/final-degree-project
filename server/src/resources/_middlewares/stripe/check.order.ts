const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);
import { NextFunction, Request, Response } from "express";

export const checkOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.body.sessionId,
      { expand: ['line_items']});

    if (session.payment_status === "paid") {
      console.log("Payment is paid. Session details:", session);
      req.body.order.discout = session.total_details.discount
      // Assuming that req.body has an 'order' property
      if (req.body && req.body.order) {
        req.body = req.body.order;
        next();
      } else {
        console.error("No 'order' property found in req.body.");
        res.status(400).send("Invalid request: Missing 'order' property.");
      }
    } else {
      console.log("Payment is not yet paid. Session details:", session);
      res.status(400).send("Invalid request: Payment not yet completed.");
    }
  } catch (error) {
    console.error("Error checking order:", error);
    res.status(500).send("Internal Server Error");
  }
};