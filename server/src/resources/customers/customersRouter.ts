import { Router } from 'express';
import { createCustomer, deleteCustomer, editCustomer, getCustomer, getCustomers, login, logout } from './customersController';
import { isAdmin } from '../_middlewares/isAdmin';
import { validate } from '../_middlewares/validateSchema';
import { customerJoiSchema } from './customersModel';

export const customerRouter = Router();

customerRouter.get('/', getCustomers);
customerRouter.get('/:id', getCustomer);
customerRouter.post('/create', validate(customerJoiSchema), createCustomer);
customerRouter.post('/login', login);
customerRouter.post('/logout', logout);
customerRouter.post('/edit-customer/:id', validate(customerJoiSchema), editCustomer);
customerRouter.delete('/delete/:id', isAdmin, deleteCustomer);