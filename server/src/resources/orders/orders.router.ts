import { Router } from 'express';
import { createCheckoutSession, createOrderDB, deleteOrder,getOrder, getOrders, manageOrder } from './orders.controller';
import { isAdmin } from '../_middlewares/isAdmin';
import { validate } from '../_middlewares/validate.schema';
import { markOrderJoiSchema, orderJoiSchema } from './orders.model';
import { formatData } from '../_middlewares/format.data';
import { authorization } from '../_middlewares/authorize';
import { authenticateLogin } from '../_middlewares/authenticateLogin';
import { checkOrderStatus } from '../_middlewares/stripe/checkOrderStatus';
import { checkSessionId } from '../_middlewares/stripe/checkSessionId';

export const orderRouter = Router();

orderRouter.get('/', isAdmin, getOrders);
orderRouter.get('/user-orders', authorization, getOrders);
orderRouter.get('/:id', getOrder);
orderRouter.post('/create', authenticateLogin, checkSessionId,checkOrderStatus, validate(orderJoiSchema), createOrderDB);
orderRouter.post('/create-checkout-session', authenticateLogin, createCheckoutSession)
orderRouter.put('/manage-order/:id', validate(markOrderJoiSchema), manageOrder);
orderRouter.delete('/delete/:id', isAdmin, deleteOrder);