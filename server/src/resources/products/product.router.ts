import { Router } from 'express';
import { createProduct, deleteProduct, editProduct, getProduct, getProducts, getProductBySearchCriteria } from './product.controller';
import { isAdmin } from '../_middlewares/isAdmin';
import { validate } from '../_middlewares/validate.schema';
import { productJoiSchema } from './product.model';
import { formatData } from '../_middlewares/format.data';
import { createStripeProduct } from '../_middlewares/stripe/product/create.product';
import { archiveStripeProduct } from '../_middlewares/stripe/product/archive.product';
import { updateStripeProduct } from '../_middlewares/stripe/product/update.product';

// Create an Express router for product-related routes
export const productRouter = Router();

// Route to get all products
productRouter.get('/', getProducts);

// Route to get a specific product by ID
productRouter.get('/:id', getProduct);

// Route to search for products based on criteria
productRouter.post('/search', getProductBySearchCriteria);

// Route to create a new product
productRouter.post('/create', isAdmin, validate(productJoiSchema), formatData, createStripeProduct, createProduct);

// Route to edit an existing product by ID
productRouter.post('/edit-product/:id', isAdmin, validate(productJoiSchema), formatData, /* updateStripeProduct, */ editProduct);

// Route to delete a product by ID
productRouter.delete('/delete/:id', isAdmin, archiveStripeProduct, deleteProduct);