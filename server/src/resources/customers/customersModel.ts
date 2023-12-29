import { Schema, model, models } from "mongoose";
import Joi from "joi";

const customerSchema = new Schema(
  {
    mail: { type: String, require: true },
    password: { type: String, require: true },
    joinDate: { type: Date, default: Date.now()},
    isAdmin: { type: Boolean, require: true, default: false},
    address: [
      {
        _id: String,
        street: String,
        zip: String,
        county: String,
      },
    ],
    orders: [{ type: Schema.Types.ObjectId, ref: "customers" }],
  },
  { versionKey: false }
);

export const customerJoiSchema = Joi.object({
  _id: Joi.string(),
  mail: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),
  joinDate: Joi.date(),
  isAdmin: Joi.boolean(),
  address: Joi.array(),
  orders: Joi.array(),
});

export const CustomerModel =
  models.customers || model("customers", customerSchema);
