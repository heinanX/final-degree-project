import { Router } from 'express'
import { createCat, deleteCat, getCats, getCat } from './categoriesController';
import { catJoiSchema } from './categoriesModel';
import { validate } from '../_middlewares/validateSchema';
import { isAdmin } from '../_middlewares/isAdmin';
import { formatData } from '../_middlewares/formatData';



export const categoryRouter = Router();

categoryRouter.get('/', getCats);
categoryRouter.get('/:id', getCat);
categoryRouter.post('/create', isAdmin, validate(catJoiSchema), formatData, createCat);
categoryRouter.delete('/:id', isAdmin, deleteCat);