import { Schema, model, models } from "mongoose";
import Joi from "joi";

/* DEFINES SCHEMA FOR PRODUCT MODEL AND JOI SCHEMA FOR VALIDATION */

const productSchema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    category: [{ type: Schema.Types.ObjectId, ref: "categories" }],
    tags: [{ type: Schema.Types.ObjectId, ref: "tags" }],
    content_rating: { type: String, default: "tba" },
    rating: { type: Number, default: 0 },
    year: { type: Number, require: true },
    image: { type: String, default: "image" },
    vhs: {
      price: Number,
      available: Boolean,
      quantity: Number,
      inStock: Number,
      stripe_price_id: String,
      stripe_prod_id: String,
    },
    digital: {
      price: Number,
      available: Boolean,
      stripe_price_id: String,
      stripe_prod_id: String,
    },
  },
  { versionKey: false }
);

const vhsJoiSchema = Joi.object({
  price: Joi.number().required(),
  available: Joi.boolean().required(),
  quantity: Joi.number().required(),
  inStock: Joi.number().required(),
  stripe_price_id: Joi.string(),
  stripe_prod_id: String,
});

const digitalJoiSchema = Joi.object({
  price: Joi.number().required(),
  available: Joi.boolean().required(),
  stripe_price_id: Joi.string(),
  stripe_prod_id: String,
});

export const productJoiSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.array().items(Joi.string()).required().min(1),
  tags: Joi.array().items(Joi.string()).required().min(1),
  content_rating: Joi.string(),
  rating: Joi.number(),
  year: Joi.number().required(),
  image: Joi.string(),
  vhs: vhsJoiSchema.required(),
  digital: digitalJoiSchema.required(),
});

const vhsUpdateJoiSchema = Joi.object({
  price: Joi.number(),
  available: Joi.boolean(),
  quantity: Joi.number(),
  inStock: Joi.number(),
  stripe_price_id: Joi.string(),
  stripe_prod_id: String,
});

const digitalUpdateJoiSchema = Joi.object({
  price: Joi.number(),
  available: Joi.boolean(),
  stripe_price_id: Joi.string(),
  stripe_prod_id: String,
});

export const updateProductJoiSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  category: Joi.array().items(Joi.string()).min(1),
  tags: Joi.array().items(Joi.string()).min(1),
  content_rating: Joi.string(),
  rating: Joi.number(),
  year: Joi.number(),
  image: Joi.string(),
  vhs: vhsUpdateJoiSchema,
  digital: digitalUpdateJoiSchema,
});

export const ProductModel = models.products || model("products", productSchema);
