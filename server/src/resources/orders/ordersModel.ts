import { Schema, model, models } from "mongoose";
import Joi from "joi";

const orderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "customers" },
  order: [{ type: Schema.Types.ObjectId, ref: "products" }],
  total_price: { type: Number, default: 0 },
  date: [{ type: Date, default: Date.now() }],
  shipped: { type: Boolean, default: "false" },
  returned: { type: Boolean, default: "false" }
}, { versionKey: false });

export const orderJoiSchema = Joi.object({
  customer: Joi.string().required(),
  order: Joi.array().items(Joi.string()).required(),
  total_price: Joi.number().required(),
  date: Joi.date().required(),
  shipped: Joi.boolean(),
  returned: Joi.boolean()
});

export const OrderModel = models.orders || model("orders", orderSchema);