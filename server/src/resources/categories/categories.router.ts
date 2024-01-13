import { Router } from 'express'
import { createCat, deleteCat, getCats, getCat } from './categories.controller';
import { catJoiSchema } from './categories.model';
import { validate } from '../_middlewares/validate.schema';
import { isAdmin } from '../_middlewares/isAdmin';
import { formatData } from '../_middlewares/format.data';



export const categoryRouter = Router();

categoryRouter.get('/', getCats);
categoryRouter.get('/:id', getCat);
categoryRouter.post('/create', isAdmin, validate(catJoiSchema), formatData, createCat);
categoryRouter.delete('/:id', isAdmin, deleteCat);