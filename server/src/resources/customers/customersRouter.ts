import { Router } from 'express';
import { activeLogin, createCustomer, deleteCustomer, editCustomer, getCustomer, getCustomers, login, logout } from './customersController';
import { isAdmin } from '../_middlewares/isAdmin';
import { validate } from '../_middlewares/validateSchema';
import { customerJoiSchema, updateCustomerJoiSchema } from './customersModel';
import { formatData } from '../_middlewares/formatData';
import { createStripeCus } from '../_middlewares/stripe/customer/createCustomer';
import { deleteStripeCus } from '../_middlewares/stripe/customer/deleteCustomer';
import { updateStripeCustomer } from '../_middlewares/stripe/customer/updateCustomer';
import { authorization } from '../_middlewares/authorize';
import { authenticateUser } from '../_middlewares/authenticateUser';

export const customerRouter = Router();

customerRouter.get('/active', authenticateUser, activeLogin);
customerRouter.get('/', isAdmin, getCustomers);
customerRouter.get('/:id', authorization, getCustomer);
customerRouter.post('/create', validate(customerJoiSchema), formatData, createStripeCus, createCustomer);
customerRouter.post('/login', login);
customerRouter.post('/logout', logout);
customerRouter.post('/edit-customer/:id', authorization, validate(updateCustomerJoiSchema), updateStripeCustomer, editCustomer);
customerRouter.delete('/delete/:id', authorization, deleteStripeCus, deleteCustomer);