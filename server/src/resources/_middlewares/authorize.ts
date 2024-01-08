import { NextFunction, Request, Response } from "express";
import { isAdmin } from "./isAdmin";

/* A middleware that confirms user authorization when making requests */

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = req.params.id;
    const sessionCustomerId = req.session?.customer?._id;

    // ALLOW ACCESS IF USER IS FETCHING OWN DATA
    if (customerId && sessionCustomerId && customerId === sessionCustomerId) {
      return next();
    }

    // CHECK IF USER IS ADMIN
    return isAdmin(req, res, next);

    return res.status(404).json('Access denied. Only Admins allowed.');
  } catch (error) {
    next(error);
  }
};
