import { Router } from 'express';
import { createOrder, createOrderDB, deleteOrder,getOrder, getOrders, manageOrder } from './ordersController';
import { isAdmin } from '../_middlewares/isAdmin';
import { validate } from '../_middlewares/validateSchema';
import { markOrderJoiSchema, orderJoiSchema } from './ordersModel';
import { formatData } from '../_middlewares/formatData';

export const orderRouter = Router();

orderRouter.get('/', getOrders);
orderRouter.get('/:id', getOrder);
orderRouter.post('/create', validate(orderJoiSchema), formatData, createOrderDB);
orderRouter.post('/create-checkout-session', createOrder)
orderRouter.put('/manage-order/:id', validate(markOrderJoiSchema), formatData, manageOrder);
orderRouter.delete('/delete/:id', isAdmin, deleteOrder);