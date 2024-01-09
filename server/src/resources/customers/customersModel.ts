import { Schema, model, models } from "mongoose";
import Joi from "joi";

const customerSchema = new Schema(
  {
    username: String,
    mail: { type: String, require: true },
    password: { type: String, require: true },
    joinDate: { type: Date, default: Date.now() },
    isAdmin: { type: Boolean, require: true, default: false },
    address: [
      {
        _id: String,
        street: String,
        zip: String,
        city: String,
      },
    ],
    orders: [{ type: Schema.Types.ObjectId, ref: "customers" }],
    stripe_id: String,
  },
  { versionKey: false }
);

const addressJoiSchema = Joi.object(
  {
    _id: String,
    street: String,
    zip: String,
    city: String,
  }
);

export const customerJoiSchema = Joi.object({
  _id: Joi.string(),
  username: Joi.string(),
  mail: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),
  joinDate: Joi.date(),
  isAdmin: Joi.boolean(),
  address: Joi.array().items(addressJoiSchema),
  orders: Joi.array(),
  stripe_id: Joi.string(),
});

export const updateCustomerJoiSchema = Joi.object({
  mail: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string(),
  isAdmin: Joi.boolean(),
  address: Joi.array().items(addressJoiSchema),
});

export const CustomerModel =
  models.customers || model("customers", customerSchema);
