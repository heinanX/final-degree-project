import { NextFunction, Request, Response } from "express";

/* MIDDLEWARE THAT AUTHENTICATES A LOGIN */
export const authenticateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.customer?._id) {
    next();
  } else {
    res.status(401).json({ message: `No user in session` });
  }
};
