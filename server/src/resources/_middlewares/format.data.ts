import { NextFunction, Request, Response } from "express";

export const formatData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.mail) {
    req.body.mail = req.body.mail.toLowerCase();
    return next();
  }

  if (req.body.title && req.body.description) {
    req.body.title = req.body.title.toLowerCase();
    //req.body.description = req.body.description.toLowerCase();
    return next();
  }

  const stringifiedData = JSON.stringify(req.body);
  const format = stringifiedData.toLowerCase();
  const formattedData = JSON.parse(format);
  req.body = formattedData;
  next();
};
