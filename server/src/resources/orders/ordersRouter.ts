import { Router } from 'express';
import { createOrder, createOrderDB, deleteOrder,getOrder, getOrders, manageOrder } from './ordersController';
import { isAdmin } from '../_middlewares/isAdmin';
import { validate } from '../_middlewares/validateSchema';
import { markOrderJoiSchema, orderJoiSchema } from './ordersModel';
import { formatData } from '../_middlewares/formatData';
import { authorization } from '../_middlewares/authorize';
import { authenticateUser } from '../_middlewares/authenticateUser';

export const orderRouter = Router();

orderRouter.get('/', isAdmin, getOrders);
orderRouter.get('/user-orders/:id', authorization, getOrders);
orderRouter.get('/:id', getOrder);
orderRouter.post('/create', validate(orderJoiSchema), formatData, createOrderDB);
orderRouter.post('/create-checkout-session', authenticateUser, createOrder)
orderRouter.put('/manage-order/:id', validate(markOrderJoiSchema), formatData, manageOrder);
orderRouter.delete('/delete/:id', isAdmin, deleteOrder);