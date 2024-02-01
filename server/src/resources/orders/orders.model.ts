import { Schema, model, models } from "mongoose";
import Joi from "joi";

// Sub-schema for individual order items
const subOrderSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "products",
      require: true,
    },
    quantity: Number,
    vhs: Boolean,
    digital: Boolean
  },
  { _id: false } // Disable the default _id field for sub-order items
);

// Sub-schema for addresses
const addressSchema = new Schema(
  {
    cust_name: String,
    street: String,
    zip_code: String,
    city: String
  },
  { _id: false } // Disable the default _id field for addresses
);

// Main schema for orders
export const orderSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "customers", require: true },
    address: addressSchema,
    order: [subOrderSchema], // Array of sub-order items
    total_price: { type: Number, default: 0, require: true },
    discount: { type: Number, default: 0 },
    date: { type: Date, default: Date.now() },
    shipped: { type: Boolean, default: false },
    returned: { type: Boolean, default: false },
    payment_status: { type: String, default: "pending" },
    order_status: { type: String, default: "active" },
    session_id: String
  },
  { versionKey: false } // Disable the default version key
);

// Joi schema for sub-order items
const subOrderJoiSchema = Joi.object({
  product: Joi.string(),
  quantity: Joi.number(),
  vhs: Joi.boolean(),
  digital: Joi.boolean()
});

// Joi schema for addresses
const addressJoiSchema = Joi.object({
    cust_name: Joi.string(),
    street: Joi.string(),
    zip_code: Joi.string(),
    city: Joi.string()
  });

// Joi schema for marking order status
export const markOrderJoiSchema = Joi.object({
  shipped: Joi.boolean(),
  returned: Joi.boolean(),
  payment_status: Joi.string(),
  order_status: Joi.string(),
  address: addressJoiSchema
});

// Joi schema for complete orders
export const orderJoiSchema = Joi.object({
  customer: Joi.string().required(),
  address: addressJoiSchema.required(),
  order: Joi.array().items(subOrderJoiSchema).required(),
  total_price: Joi.number().required(),
  discount: Joi.number(),
  date: Joi.date(),
  shipped: Joi.boolean(),
  returned: Joi.boolean(),
  payment_status: Joi.string(),
  order_status: Joi.string(),
  session_id: Joi.string()
});

// Mongoose model for orders
export const OrderModel = models.orders || model("orders", orderSchema);
