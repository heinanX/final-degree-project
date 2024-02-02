import { NextFunction, Request, Response } from "express";

/*  MIDDLEWARE TO FORMAT DATA TO LOWERCASE BEFORE PROCESSING IT */
export const formatData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.mail) {
    req.body.mail = req.body.mail.toLowerCase();
    return next();
  }

  if (req.body.title) {
    req.body.title = req.body.title.toLowerCase();
    return next();
  }

  // If none of the specific properties are found, convert the entire request body to lowercase
  const stringifiedData = JSON.stringify(req.body);
  const format = stringifiedData.toLowerCase();
  const formattedData = JSON.parse(format);
  req.body = formattedData;

  next();
};
