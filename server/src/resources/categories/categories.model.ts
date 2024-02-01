import { Schema, model, models } from "mongoose";
import Joi from "joi";

// Define the Mongoose schema for the 'categories' collection
const categorySchema = new Schema(
  {
    // Define the 'category' field with type String and make it required
    category: { type: String, required: true },
  },
  { versionKey: false } // Exclude the '__v' field from documents
);

// Define a Joi schema for validating category data
export const catJoiSchema = Joi.object({
  _id: Joi.string(), // Allow for optional _id field in validation
  category: Joi.string().required(), // Ensure 'category' is a required string
});

// Create a Mongoose model for the 'categories' collection
// If the model already exists, use the existing model
export const CategoryModel =
  models.categories || model("categories", categorySchema);
