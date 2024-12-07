import express from 'express';
import dotnev from 'dotenv';
import connectDB from '../e-commerce_practise/config/db.js';
import authRoute from './routes/authRoute.js';
import productRoute from './routes/productRoute.js';
import blogRoute from './routes/blogRoute.js';
import pCategoryroute from './routes/prodCategoryRoute.js';
import blogCategoryRoute from './routes/blogCategoryRoute.js';
import couponRoute from './routes/couponRoute.js';
import cartRoute from './routes/cartRoute.js';
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
app.use('/api/blog', blogRoute);
app.use('/api/productcategory', pCategoryroute);
app.use('/api/blogcategory', blogCategoryRoute);
app.use('/api/coupon', couponRoute);
app.use('/api/cart', cartRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on the ${PORT}`);
});
