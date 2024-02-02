import { Router } from 'express';
import {
  activeLogin,
  createCustomer,
  deleteCustomer,
  editCustomer,
  getCustomerById,
  getCustomers,
  login,
  logout,
} from './customers.controller';
import { validate } from '../_middlewares/validate.schema';
import { customerJoiSchema, updateCustomerJoiSchema } from './customers.model';
import { formatData } from '../_middlewares/format.data';
import { createStripeCus } from '../_middlewares/stripe/customer/create.customer';
import { deleteStripeCus } from '../_middlewares/stripe/customer/delete.customer';
import { updateStripeCustomer } from '../_middlewares/stripe/customer/update.customer';
import { authorize } from '../_middlewares/authorize';
import { authenticateLogin } from '../_middlewares/authenticateLogin';

export const customerRouter = Router();

customerRouter.get('/active', authenticateLogin, activeLogin);
customerRouter.get('/', authorize, getCustomers);
customerRouter.get('/:id', authorize, getCustomerById);
customerRouter.post('/create', validate(customerJoiSchema), formatData, createStripeCus, createCustomer);
customerRouter.post('/login', formatData, login);
customerRouter.post('/logout', logout);
customerRouter.post('/edit-customer/:id', formatData, authorize, validate(updateCustomerJoiSchema), updateStripeCustomer, editCustomer);
customerRouter.delete('/delete/:id', authorize, deleteStripeCus, deleteCustomer);
