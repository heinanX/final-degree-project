import { Router } from 'express'
import { validate } from '../_middlewares/validate.schema';
import { isAdmin } from '../_middlewares/isAdmin';
import { formatData } from '../_middlewares/format.data';
import { createTag, deleteTag, getTag, getTags } from './tags.controller';
import { tagJoiSchema } from './tags.model';



export const tagRouter = Router();

tagRouter.get('/', getTags);
tagRouter.get('/:id', getTag);
tagRouter.post('/create', isAdmin, validate(tagJoiSchema), formatData, createTag);
tagRouter.delete('/:id', isAdmin, deleteTag);