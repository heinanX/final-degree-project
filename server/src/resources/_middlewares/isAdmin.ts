import { NextFunction, Request, Response } from "express";

/* MIDDLEWARE TO CHECK IF THE USER IS AN ADMIN BEFORE GRANTING ACCESS */
export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if the session contains customer information and the customer is an admin
  if (req.session?.customer?.isAdmin) {
    // If the user is an admin, proceed to the next middleware or route handler
    next();
  } else {
    // If the user is not an admin, respond with a 403 Forbidden status and a message
    res.status(403).json(`Access denied. Must be Admin.`);
  }
};
