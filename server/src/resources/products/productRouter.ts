import { Router } from 'express';
import { createProduct, deleteProduct, editProduct, getProduct, getProducts } from './productController';
import { isAdmin } from '../_middlewares/isAdmin';
import { validate } from '../_middlewares/validateSchema';
import { productJoiSchema } from './productModel';
import { formatData } from '../_middlewares/formatData';
import { createStripeProduct } from '../_middlewares/stripe/createProduct';
import { archiveStripeProduct } from '../_middlewares/stripe/archiveProduct';

export const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProduct);
productRouter.post('/create', validate(productJoiSchema), formatData, createStripeProduct, createProduct);
productRouter.post('/edit-product/:id', isAdmin, validate(productJoiSchema), formatData, editProduct);
productRouter.delete('/delete/:id', isAdmin, archiveStripeProduct, deleteProduct);