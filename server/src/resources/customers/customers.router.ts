import { Router } from 'express';
import {
  activeLogin,
  createCustomer,
  deleteCustomer,
  editCustomer,
  getCustomer,
  getCustomerDetails,
  getCustomers,
  login,
  logout,
} from './customers.controller';
import { isAdmin } from '../_middlewares/isAdmin';
import { validate } from '../_middlewares/validate.schema';
import { customerJoiSchema, updateCustomerJoiSchema } from './customers.model';
import { formatData } from '../_middlewares/format.data';
import { createStripeCus } from '../_middlewares/stripe/customer/create.customer';
import { deleteStripeCus } from '../_middlewares/stripe/customer/delete.customer';
import { updateStripeCustomer } from '../_middlewares/stripe/customer/update.customer';
import { authorization } from '../_middlewares/authorize';
import { authenticateLogin } from '../_middlewares/authenticateLogin';

// Create a router for handling customer-related routes
export const customerRouter = Router();

// Route to get active customer login status
customerRouter.get('/active', authenticateLogin, activeLogin);

// Route to get customer details
customerRouter.get('/customer-details', getCustomerDetails);

// Route to get all customers (only accessible to admin)
customerRouter.get('/', isAdmin, getCustomers);

// Route to get a specific customer by ID (requires authorization)
customerRouter.get('/:id', authorization, getCustomer);

// Route to create a new customer
customerRouter.post('/create', validate(customerJoiSchema), formatData, createStripeCus, createCustomer);

// Route to log in a customer
customerRouter.post('/login', login);

// Route to log out a customer
customerRouter.post('/logout', logout);

// Route to edit a customer's details (requires authorization)
customerRouter.post('/edit-customer/:id', authorization, validate(updateCustomerJoiSchema), updateStripeCustomer, editCustomer);

// Route to delete a customer (requires authorization)
customerRouter.delete('/delete/:id', authorization, deleteStripeCus, deleteCustomer);
