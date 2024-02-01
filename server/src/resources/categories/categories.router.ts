import { Router } from "express";
import { createCat, deleteCat, getCats, getCat } from "./categories.controller";
import { catJoiSchema } from "./categories.model";
import { validate } from "../_middlewares/validate.schema";
import { isAdmin } from "../_middlewares/isAdmin";
import { formatData } from "../_middlewares/format.data";

// Create an Express router for handling category-related routes
export const categoryRouter = Router();

// Define routes and associated controller functions
categoryRouter.get("/", getCats); // Route to get all categories
categoryRouter.get("/:id", getCat); // Route to get a specific category by ID
categoryRouter.post(
  "/create",
  isAdmin, // Middleware to check if the user is an admin
  validate(catJoiSchema), // Middleware to validate request data against Joi schema
  formatData, // Middleware to format data before processing
  createCat // Controller function to create a new category
);
categoryRouter.delete("/:id", isAdmin, deleteCat); // Route to delete a category by ID
