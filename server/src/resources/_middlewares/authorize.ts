import { NextFunction, Request, Response } from "express";

/* A MIDDLEWARE THAT CONFIRMS USER AUTHORIZATION WHEN MAKING REQUESTS
 * if Admin, allow all access,
 * if session customer id equals requested resource allaw access
 */

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionCustomerIsAdmin = req.session?.customer?.isAdmin;
    const sessionCustomerId = req.session?.customer?._id;
    const paramsCustomerId = req.params.id;
    const paramsKey = req.params.key;

    if (sessionCustomerIsAdmin) {
      return next();
    }

    if (sessionCustomerId === paramsCustomerId || paramsKey) {
      return next();
    }
    return res.status(403).json({ error: "Unauthorized access" });
  } catch (error) {
    next(error);
  }
};
