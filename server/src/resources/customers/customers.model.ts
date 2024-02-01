import { Schema, model, models } from "mongoose";
import Joi from "joi";

// Define the customer schema
const customerSchema = new Schema(
  {
    username: String,
    mail: { type: String, require: true }, // Email is required
    password: { type: String, require: true }, // Password is required
    joinDate: { type: Date, default: Date.now() }, // Default join date to the current date
    isAdmin: { type: Boolean, require: true, default: false }, // Default to non-admin
    address: [
      {
        _id: String,
        street: String,
        zip: String,
        city: String,
      },
    ],
    orders: [{ type: Schema.Types.ObjectId, ref: "customers" }], // Reference to orders
    stripe_id: String,
  },
  { versionKey: false } // Exclude version key from the schema
);

// Define the address Joi schema for validation
const addressJoiSchema = Joi.object({
  _id: String,
  street: String,
  zip: String,
  city: String,
});

// Define the customer Joi schema for validation
export const customerJoiSchema = Joi.object({
  _id: Joi.string(),
  username: Joi.string(),
  mail: Joi.string().email({ minDomainSegments: 2 }).required(), // Email is required and should be a valid email
  password: Joi.string().required(), // Password is required
  joinDate: Joi.date(),
  isAdmin: Joi.boolean(),
  address: Joi.array().items(addressJoiSchema),
  orders: Joi.array(),
  stripe_id: Joi.string(),
});

// Define the update customer Joi schema for validation
export const updateCustomerJoiSchema = Joi.object({
  mail: Joi.string().email({ minDomainSegments: 2 }), // Email should be a valid email
  password: Joi.string(),
  isAdmin: Joi.boolean(),
  address: Joi.array().items(addressJoiSchema),
});

// Define the Customer model using the schema
export const CustomerModel =
  models.customers || model("customers", customerSchema);
