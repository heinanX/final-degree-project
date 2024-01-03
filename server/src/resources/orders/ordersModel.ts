import { Schema, model, models } from "mongoose";
import Joi from "joi";

const orderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "customers", require: true},
  order: [{ type: Schema.Types.ObjectId, ref: "products", require: true }],
  total_price: { type: Number, default: 0, require: true},
  discount: { type: Number, default: 0 },
  date: [{ type: Date, default: Date.now() }],
  shipped: { type: Boolean, default: "false" },
  returned: { type: Boolean, default: "false" },
  payment_status: { type: String, default: "pending" },
  order_status: { type: String, default: "active" }
}, { versionKey: false });

export const markOrderJoiSchema = Joi.object({
  shipped: Joi.boolean(),
  returned: Joi.boolean(),
  payment_status: Joi.string(),
  order_status: Joi.string()
});
export const orderJoiSchema = Joi.object({
  customer: Joi.string().required(),
  order: Joi.array().items(Joi.string()).required(),
  total_price: Joi.number().required(),
  discount: Joi.number(),
  date: Joi.date(),
  shipped: Joi.boolean(),
  returned: Joi.boolean(),
  payment_status: Joi.string(),
  order_status: Joi.string(),
});

export const OrderModel = models.orders || model("orders", orderSchema);