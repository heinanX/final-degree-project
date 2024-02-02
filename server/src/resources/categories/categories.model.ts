import { Schema, model, models } from "mongoose";
import Joi from "joi";

/* DEFINES SCHEMA FOR CATEGORIES MODEL AND JOI SCHEMA FOR VALIDATION */

const categorySchema = new Schema(
  {
    category: { type: String, required: true },
  },
  { versionKey: false }
);

export const catJoiSchema = Joi.object({
  _id: Joi.string(),
  category: Joi.string().required(),
});

export const CategoryModel =
  models.categories || model("categories", categorySchema);
