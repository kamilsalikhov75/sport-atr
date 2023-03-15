import { ProductModel } from '../models/product.js';

export async function createProduct(req, res) {
  try {
    const doc = new ProductModel({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      image: req.body.image,
    });

    const product = await doc.save();

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send('Не удалось добавить товар');
  }
}

export async function getProducts(req, res) {
  try {
    const { category } = req.params;
    let products;
    if (category === 'all') {
      products = await ProductModel.find();
    } else {
      products = await ProductModel.find({ category });
    }

    if (products) {
      res.status(200).json(products);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Не удалось получить товары');
  }
}

export async function getProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(400).send('Не удалось получить товар');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Не удалось получить товар');
  }
}
