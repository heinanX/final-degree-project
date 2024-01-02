import { Router } from 'express';
import { createProduct, deleteProduct, editProduct, getProduct, getProducts } from './productController';
import { isAdmin } from '../_middlewares/isAdmin';
import { validate } from '../_middlewares/validateSchema';
import { productJoiSchema } from './productModel';
import { formatData } from '../_middlewares/formatData';

export const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProduct);
productRouter.post('/create', validate(productJoiSchema), formatData, createProduct);
productRouter.post('/edit-product/:id', validate(productJoiSchema), formatData, editProduct);
productRouter.delete('/delete/:id', deleteProduct);