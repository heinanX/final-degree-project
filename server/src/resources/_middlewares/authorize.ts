import { NextFunction, Request, Response } from "express";
import { isAdmin } from "./isAdmin";

/* A MIDDLEWARE THAT CONFIRMS USER AUTHORIZATION WHEN MAKING REQUESTS */

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

    // ALLOW ACCESS IF USER IS FETCHING OWN DATA
    if (sessionCustomerId) {
      return next();
    }

    // CHECK IF USER IS ADMIN
    return isAdmin(req, res, next);
  } catch (error) {
    next(error);
  }
};
