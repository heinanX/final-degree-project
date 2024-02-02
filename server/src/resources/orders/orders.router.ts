import { Router } from 'express';
import { createCheckoutSession, createOrderDB, deleteOrder, getOrderById, getOrders, getUserOrders, manageOrder } from './orders.controller';
import { validate } from '../_middlewares/validate.schema';
import { markOrderJoiSchema, orderJoiSchema } from './orders.model';
import { authorize } from '../_middlewares/authorize';
import { authenticateLogin } from '../_middlewares/authenticateLogin';
import { checkOrderStatus } from '../_middlewares/stripe/checkOrderStatus';
import { checkSessionId } from '../_middlewares/stripe/checkSessionId';

export const orderRouter = Router();

orderRouter.get('/', authorize, getOrders);
orderRouter.get('/user-orders/:key', authorize, getUserOrders);
orderRouter.get('/:id', getOrderById);
orderRouter.post('/create', authenticateLogin, checkSessionId, checkOrderStatus, validate(orderJoiSchema), createOrderDB);
orderRouter.post('/create-checkout-session', authenticateLogin, createCheckoutSession);
orderRouter.put('/manage-order/:id', authorize, validate(markOrderJoiSchema), manageOrder);
orderRouter.delete('/delete/:id', authorize, deleteOrder);