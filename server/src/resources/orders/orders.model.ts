import { Schema, model, models } from "mongoose";
import Joi from "joi";

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
  { _id: false }
);
const addressSchema = new Schema(
  {
    cust_name: String,
    street: String,
    zip_code: String,
    city: String
  },
  { _id: false }
);

export const orderSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "customers", require: true },
    address: [addressSchema],
    order: [subOrderSchema],
    total_price: { type: Number, default: 0, require: true },
    discount: { type: Number, default: 0 },
    date: { type: Date, default: Date.now() },
    shipped: { type: Boolean, default: false },
    returned: { type: Boolean, default: false },
    payment_status: { type: String, default: "pending" },
    order_status: { type: String, default: "active" },
    session_id: String
  },
  { versionKey: false }
);

export const markOrderJoiSchema = Joi.object({
  shipped: Joi.boolean(),
  returned: Joi.boolean(),
  payment_status: Joi.string(),
  order_status: Joi.string()
});

const subOrderJoiSchema = Joi.object({
  product: Joi.string(),
  quantity: Joi.number(),
  vhs: Joi.boolean(),
  digital: Joi.boolean()
});

const addressJoiSchema = Joi.object({
    cust_name: Joi.string(),
    street: Joi.string(),
    zip_code: Joi.string(),
    city: Joi.string()
  });


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

export const OrderModel = models.orders || model("orders", orderSchema);
