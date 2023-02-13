import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import views from './config/view';
import errorHandler from './middleware/error.middleware';

import homeRouter from './routes/home/index.routes';
import apiRouter from './routes/api/index.routes';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

views(app);

app.use('/', homeRouter);
app.use('/v1/api', apiRouter);

app.use(errorHandler);

const PORT = process.env.APP_PORT;
const HOST = process.env.APP_HOST;

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
