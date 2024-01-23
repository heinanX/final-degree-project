import { Request, Response, NextFunction } from "express";

//A new class that extends parent class Error
class AppError extends Error {
  status: number; //extends class with status property 

  constructor(message: string, status: number) {
    super(message); //initiates parent class and passes message parameter before adding custom property
    this.status = status; //passes status parameter to status property 
  }
}

//When a client requests a resource that does not exist, this middleware is called.
export const notFound = (req: Request, res: Response) => {
  res.status(404).json("Resource not found");
};

// Error handler for other types of errors
export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const response = {
    error: true, // for clarity and response
    status,
    message: err.message,
  };
  console.error(err);
  res.status(status).json(response);
};
