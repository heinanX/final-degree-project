const session = require("express-session");
import express from "express";
import cors from "cors";
import { customerRouter } from "./resources/customers/customers.router";
import { categoryRouter } from "./resources/categories/categories.router";
import { productRouter } from "./resources/products/product.router";
import { tagRouter } from "./resources/tags/tags.router";
import { orderRouter } from "./resources/orders/orders.router";
import {
  errorHandler,
  notFound,
} from "./resources/_middlewares/errorHandler";

export const app = express();
const cookieSecret = process.env.COOKIE_SESSION_KEY;
if (!cookieSecret) {
  throw new Error(
    "The COOKIE_SESSION_KEY environment variable is not defined."
  );
}

app.use(cors(
  {origin: "http://localhost:5173",
  credentials: true,}
));
app.use(express.json());
app.use(
  session({
    secret: cookieSecret,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/api/customers", customerRouter);
app.use("/api/tags", tagRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.use(notFound);
app.use(errorHandler);
