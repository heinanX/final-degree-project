import express from 'express';
import cors from 'cors';
import { customerRouter } from './resources/customers/customersRouter';


export const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/customers', customerRouter);