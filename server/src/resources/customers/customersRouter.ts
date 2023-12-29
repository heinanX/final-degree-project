import { Router } from 'express';
import { createCustomer } from './customersController';

export const customerRouter = Router();

customerRouter.post('/create', createCustomer);