import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import {
  createProduct,
  getProduct,
  getProducts,
} from './controllers/product-controller.js';
import { createOrder, getOrder } from './controllers/order-controller.js';

const port = process.env.PORT || 3003;

const dbUrl = process.env.DB_URI;
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log('database work');
  })
  .catch((error) => console.log('database error', error));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'images');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use('/images', express.static('images'));

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('server work');
});

app.post('/images', upload.single('image'), (req, res) => {
  res.json({
    url: `/images/${req.file.originalname}`,
  });
});

app.post('/products', createProduct);
app.get('/products/:category', getProducts);
app.get('/product/:id', getProduct);

app.post('/orders', createOrder);
app.get('/orders/:id', getOrder);
