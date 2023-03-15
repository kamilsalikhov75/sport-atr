import { OrderModel } from '../models/order.js';
import { ProductModel } from '../models/product.js';
export async function createOrder(req, res) {
  try {
    const doc = new OrderModel({
      products: req.body.products,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      status: req.body.status,
      price: req.body.price,
    });

    const order = await doc.save();

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(400).send('Не удалось создать заказ');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Не удалось создать заказ');
  }
}

export async function getOrder(req, res) {
  try {
    const { id } = req.params;

    const order = await ProductModel.findById(id);

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(400).send('Не удалось получить заказ');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Не удалось получить заказ');
  }
}
