import { NextFunction, Request, Response } from "express";

/*  MIDDLEWARE TO FORMAT DATA BEFORE PROCESSING IT */
export const formatData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If the request body has a 'mail' property, convert it to lowercase
  if (req.body.mail) {
    req.body.mail = req.body.mail.toLowerCase();
    return next();
  }

  // If the request body has 'title' and 'description' properties, convert 'title' to lowercase
  if (req.body.title && req.body.description) {
    req.body.title = req.body.title.toLowerCase();
    return next();
  }

  // If none of the specific properties are found, convert the entire request body to lowercase
  const stringifiedData = JSON.stringify(req.body);
  const format = stringifiedData.toLowerCase();
  const formattedData = JSON.parse(format);
  req.body = formattedData;

  // Continue with the next middleware or route handler
  next();
};
