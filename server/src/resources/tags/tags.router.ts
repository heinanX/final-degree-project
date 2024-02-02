import { Router } from 'express';
import { validate } from '../_middlewares/validate.schema';
import { formatData } from '../_middlewares/format.data';
import { createTag, deleteTag, getTag, getTags } from './tags.controller';
import { tagJoiSchema } from './tags.model';
import { authorize } from '../_middlewares/authorize';

export const tagRouter = Router();
tagRouter.get('/', getTags);
tagRouter.get('/:id', getTag);
tagRouter.post('/create', authorize, validate(tagJoiSchema), formatData, createTag);
tagRouter.delete('/:id', authorize, deleteTag);