import { NextFunction, Request, Response } from "express";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  

  if (req.session?.customer?.isAdmin) {
    next();
  } else {
    res.status(403).json(`Access denied. Must be Admin.`);
  }
};
