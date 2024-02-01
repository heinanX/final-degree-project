import { Router } from 'express';
import { createCheckoutSession, createOrderDB, deleteOrder, getOrder, getOrders, getUserOrders, manageOrder } from './orders.controller';
import { isAdmin } from '../_middlewares/isAdmin';
import { validate } from '../_middlewares/validate.schema';
import { markOrderJoiSchema, orderJoiSchema } from './orders.model';
import { authorization } from '../_middlewares/authorize';
import { authenticateLogin } from '../_middlewares/authenticateLogin';
import { checkOrderStatus } from '../_middlewares/stripe/checkOrderStatus';
import { checkSessionId } from '../_middlewares/stripe/checkSessionId';

// Create an Express router for handling order-related routes
export const orderRouter = Router();

// Route to get all orders (requires admin privileges)
orderRouter.get('/', isAdmin, getOrders);

// Route to get orders specific to a user (requires authorization)
orderRouter.get('/user-orders', authorization, getUserOrders);

// Route to get a specific order
orderRouter.get('/:id', getOrder);

// Route to create a new order (requires authentication, checks session ID and order status)
orderRouter.post('/create', authenticateLogin, checkSessionId, checkOrderStatus, validate(orderJoiSchema), createOrderDB);

// Route to create a new checkout session (requires authentication)
orderRouter.post('/create-checkout-session', authenticateLogin, createCheckoutSession);

// Route to manage or update an order (requires validation of order status changes)
orderRouter.put('/manage-order/:id', validate(markOrderJoiSchema), manageOrder);

// Route to delete an order (requires admin privileges)
orderRouter.delete('/delete/:id', isAdmin, deleteOrder);