import { Router } from 'express';
import { createProduct, deleteProduct, editProduct, getProductById, getProducts, getProductBySearchCriteria } from './product.controller';
import { validate } from '../_middlewares/validate.schema';
import { productJoiSchema, updateProductJoiSchema } from './product.model';
import { formatData } from '../_middlewares/format.data';
import { createStripeProduct } from '../_middlewares/stripe/product/create.product';
import { archiveStripeProduct } from '../_middlewares/stripe/product/archive.product';
import { updateStripeProduct } from '../_middlewares/stripe/product/update.product';
import { authorize } from '../_middlewares/authorize';

export const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProductById);
productRouter.post('/search', getProductBySearchCriteria);
productRouter.post('/create', authorize, validate(productJoiSchema), formatData, createStripeProduct, createProduct);
productRouter.put('/edit-product/:id', authorize, validate(updateProductJoiSchema), updateStripeProduct, editProduct);
productRouter.delete('/delete/:id', authorize, archiveStripeProduct, deleteProduct);