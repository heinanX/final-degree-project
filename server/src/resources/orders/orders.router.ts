import { Router } from 'express';
import { createCheckoutSession, createOrderDB, deleteOrder,getOrder, getOrders, manageOrder } from './orders.controller';
import { isAdmin } from '../_middlewares/isAdmin';
import { validate } from '../_middlewares/validate.schema';
import { markOrderJoiSchema, orderJoiSchema } from './orders.model';
import { formatData } from '../_middlewares/format.data';
import { authorization } from '../_middlewares/authorize';
import { authenticateLogin } from '../_middlewares/authenticateLogin';
import { checkOrderStatus } from '../_middlewares/stripe/checkOrderStatus';

export const orderRouter = Router();

orderRouter.get('/', isAdmin, getOrders);
orderRouter.get('/user-orders/:id', authorization, getOrders);
orderRouter.get('/:id', getOrder);
orderRouter.post('/create', authenticateLogin, checkOrderStatus, validate(orderJoiSchema), createOrderDB);
orderRouter.post('/create-checkout-session', authenticateLogin, createCheckoutSession)
orderRouter.put('/manage-order/:id', validate(markOrderJoiSchema), formatData, manageOrder);
orderRouter.delete('/delete/:id', isAdmin, deleteOrder);