const session = require('express-session');
import express from 'express';
import cors from 'cors';
import { customerRouter } from './resources/customers/customersRouter';


export const app = express();
const cookieSecret = process.env.COOKIE_SESSION_KEY
if (!cookieSecret) {
    throw new Error('The COOKIE_SESSION_KEY environment variable is not defined.');
}

app.use(cors());
app.use(express.json());
app.use(session({
    secret: cookieSecret,
    resave: false,
    saveUninitialized: true,
  }));



app.use('/api/customers', customerRouter);