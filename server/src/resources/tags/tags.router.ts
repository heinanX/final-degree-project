import { Router } from 'express';
import { validate } from '../_middlewares/validate.schema';
import { isAdmin } from '../_middlewares/isAdmin';
import { formatData } from '../_middlewares/format.data';
import { createTag, deleteTag, getTag, getTags } from './tags.controller';
import { tagJoiSchema } from './tags.model';

// Create an Express router for handling tag-related routes
export const tagRouter = Router();

// Define a route to get all tags
tagRouter.get('/', getTags);

// Define a route to get a specific tag by ID
tagRouter.get('/:id', getTag);

// Define a route to create a new tag
tagRouter.post('/create', isAdmin, validate(tagJoiSchema), formatData, createTag);

// Define a route to delete a tag by ID
tagRouter.delete('/:id', isAdmin, deleteTag);