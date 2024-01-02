import { Schema, model, models } from "mongoose";
import Joi from "joi";

const productSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  category: [{ type: Schema.Types.ObjectId, ref: "categories" }],
  tags: [{ type: Schema.Types.ObjectId, ref: "tags" }],
  content_rating: { type: String, default: 'no rating set'},
  rating: { type: Number, default: 0 },
  year: { type: Number, require: true },
  image: { type: String, default: '' },
  vhs: [
    {
      price: Number,
      available: Boolean,
      quantity: Number,
      inStock: Number,
    }],
  digital: [
    {
      price: Number,
      available: Boolean,
    }],
});

const vhsJoiSchema = Joi.object({
    price: Joi.number().required(),
    available: Joi.boolean().required(),
    quantity: Joi.number().required(),
    inStock: Joi.number().required(),
  });
  
  const digitalJoiSchema = Joi.object({
    price: Joi.number().required(),
    available: Joi.boolean().required(),
  });
  

export const productJoiSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.array().items(Joi.string()).required().min(1),
  tags: Joi.array().items(Joi.string()).required().min(1),
  content_rating: Joi.string().required(),
  rating: Joi.number(),
  year: Joi.number().required(),
  image: Joi.string(),
  vhs: Joi.array().items(vhsJoiSchema),
  digital: Joi.array().items(digitalJoiSchema),
});

export const ProductModel = models.products || model("products", productSchema);
