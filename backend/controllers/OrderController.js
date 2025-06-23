import { validationResult } from "express-validator";
import Order from "../models/Order.js";
import User from "../models/User.js";

export const createOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { fullName, addressLine1, city, state, postalCode, country, phone } =
      req.body;

    const order = new Order({
      fullname: fullName,
      address: addressLine1,
      city,
      state,
      code: postalCode,
      country,
      phone,
    });

    await order.save();

    await User.findByIdAndUpdate(req.userId, {
      $push: { order },
    });

    res.json(order);
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось зарегистрировать заказ",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: "Пользователь не авторизован" });
    }

    const user = await User.findById(userId).populate("order");

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.json(user.order); 
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось получить все заказы",
    });
  }
};

export const getOneOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    res.json(order);
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось получить определнный заказ",
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Не удалось получить список заказов",
    });
  }
};
