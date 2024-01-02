import { Router } from 'express'
import { validate } from '../_middlewares/validateSchema';
import { isAdmin } from '../_middlewares/isAdmin';
import { formatData } from '../_middlewares/formatData';
import { createTag, deleteTag, getTag, getTags } from './tagsController';
import { tagJoiSchema } from './tagsModel';



export const tagRouter = Router();

tagRouter.get('/', getTags);
tagRouter.get('/:id', getTag);
tagRouter.post('/create', isAdmin, validate(tagJoiSchema), formatData, createTag);
tagRouter.delete('/:id', isAdmin, deleteTag);