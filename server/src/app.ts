// Import required modules
const session = require("express-session");
import express from "express";
import cors from "cors";

// Import routers and middleware
import { customerRouter } from "./resources/customers/customers.router";
import { categoryRouter } from "./resources/categories/categories.router";
import { productRouter } from "./resources/products/product.router";
import { tagRouter } from "./resources/tags/tags.router";
import { orderRouter } from "./resources/orders/orders.router";
import { errorHandler, notFound } from "./resources/_middlewares/errorHandler";

// Create an Express application
export const app = express();

// Set up CORS middleware to allow requests from http://localhost:5173 with credentials
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Enable JSON parsing for incoming requests
app.use(express.json());

// Set up Express session middleware
const cookieSecret = process.env.COOKIE_SESSION_KEY;
if (!cookieSecret) {
  throw new Error(
    "The COOKIE_SESSION_KEY environment variable is not defined."
  );
}
app.use(
  session({
    secret: cookieSecret,
    resave: false,
    saveUninitialized: true,
  })
);

// Mount routers to specific paths
app.use("/api/customers", customerRouter);
app.use("/api/tags", tagRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

// Middleware for handling 404 (Not Found) errors
app.use(notFound);

// Middleware for handling other errors
app.use(errorHandler);