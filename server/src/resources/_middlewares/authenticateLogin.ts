import { NextFunction, Request, Response } from "express";

/* MIDDLEWARE THAT AUTHENTICATES A LOGIN */
export const authenticateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.customer?._id) {
    // If a user is found in the session, proceed to the next middleware
    next();
  } else {
    // else respond with an unauthorized status
    res.status(401).json({ message: `No user in session` });
  }
};
