import express from 'express';
import dotnev from 'dotenv';
import connectDB from '../e-commerce_practise/config/db.js';
import authRoute from './routes/authRoute.js';
import productRoute from './routes/productRoute.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

dotnev.config();
const PORT = process.env.PORT || 4000;

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send(`Welcome to Home page`);
});

app.use('/api/user', authRoute);
app.use('/api/product', productRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on the ${PORT}`);
});
