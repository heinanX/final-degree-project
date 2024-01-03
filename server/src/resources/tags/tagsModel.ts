import { Schema, model, models } from "mongoose";
import Joi from 'joi';

const tagSchema = new Schema(
  {
    tag: { type: String, require: true }
  },
  { versionKey: false }
);

export const tagJoiSchema = Joi.object(
  {
    _id: Joi.string(),
    tag: Joi.string().required()
  }
);

export const TagModel = models.tags || model("tags", tagSchema);