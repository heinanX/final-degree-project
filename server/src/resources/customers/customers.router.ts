import { Router } from 'express';
import { activeLogin, createCustomer, deleteCustomer, editCustomer, getCustomer, getCustomerDetails, getCustomers, login, logout } from './customers.controller';
import { isAdmin } from '../_middlewares/isAdmin';
import { validate } from '../_middlewares/validate.schema';
import { customerJoiSchema, updateCustomerJoiSchema } from './customers.model';
import { formatData } from '../_middlewares/format.data';
import { createStripeCus } from '../_middlewares/stripe/customer/create.customer';
import { deleteStripeCus } from '../_middlewares/stripe/customer/delete.customer';
import { updateStripeCustomer } from '../_middlewares/stripe/customer/update.customer';
import { authorization } from '../_middlewares/authorize';
import { authenticateLogin } from '../_middlewares/authenticateLogin';

export const customerRouter = Router();

customerRouter.get('/active', authenticateLogin, activeLogin);
customerRouter.get('/customer-details', getCustomerDetails);
customerRouter.get('/', isAdmin, getCustomers);
customerRouter.get('/:id', authorization, getCustomer);
customerRouter.post('/create', validate(customerJoiSchema), formatData, createStripeCus, createCustomer);
customerRouter.post('/login', login);
customerRouter.post('/logout', logout);
customerRouter.post('/edit-customer/:id', authorization, validate(updateCustomerJoiSchema), updateStripeCustomer, editCustomer);
customerRouter.delete('/delete/:id', authorization, deleteStripeCus, deleteCustomer);