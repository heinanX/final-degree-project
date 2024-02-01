import { Schema, model, models } from 'mongoose';
import Joi from 'joi';

// Define the schema for tags
const tagSchema = new Schema(
  {
    tag: { type: String, require: true },
  },
  { versionKey: false }
);

// Define the Joi schema for validating tag data
export const tagJoiSchema = Joi.object({
  _id: Joi.string(),
  tag: Joi.string().required(),
});

// Create the TagModel using the tagSchema
export const TagModel = models.tags || model('tags', tagSchema);