import { Router } from 'express';
import { createProduct, deleteProduct, editProduct, getProduct, getProducts, getProductsByCategory, getProductsByTag } from './product.controller';
import { isAdmin } from '../_middlewares/isAdmin';
import { validate } from '../_middlewares/validate.schema';
import { productJoiSchema } from './product.model';
import { formatData } from '../_middlewares/format.data';
import { createStripeProduct } from '../_middlewares/stripe/product/create.product';
import { archiveStripeProduct } from '../_middlewares/stripe/product/archive.product';
import { updateStripeProduct } from '../_middlewares/stripe/product/update.product';

export const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProduct);
productRouter.get('/category/:id', getProductsByCategory);
productRouter.get('/tag/:id', getProductsByTag);
productRouter.post('/create', isAdmin, validate(productJoiSchema), formatData, createStripeProduct, createProduct);
productRouter.post('/edit-product/:id', isAdmin, validate(productJoiSchema), formatData, /* updateStripeProduct, */ editProduct);
productRouter.delete('/delete/:id', isAdmin, archiveStripeProduct, deleteProduct);