import { validationResult } from "express-validator";
import Sneakers from "../models/Sneakers.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const createSneakers = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const {
      name,
      description,
      category,
      brand,
      image,
      price,
      size,
      color,
      quantity,
      user,
    } = req.body;

    const sneaker = new Sneakers({
      name,
      description,
      category,
      brand,
      image,
      price,
      size,
      color,
      quantity,
      user,
    });

    await sneaker.save();

    res.json(sneaker);
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось зарегистрировать кроссовки",
    });
  }
};

export const deleteFromCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const sneakerId = req.params.sneakerId;

    const sneakerObjectId = new mongoose.Types.ObjectId(sneakerId);

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { cart: { sneaker: sneakerObjectId } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.json({ message: "Товар удалён из корзины", cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при удалении товара из корзины" });
  }
};


export const getAll = async (req, res) => {
  try {
    const sneakers = await Sneakers.find();

    res.json(sneakers);
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось получить все кроссовки",
    });
  }
};

export const getWish = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate("wish");
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    res.json({ wish: user.wish });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Ошибка при получении wish списка" });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate("cart.sneaker");
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    res.json({ cart: user.cart });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Ошибка при получении корзины" });
  }
};

export const getOneSneaker = async (req, res) => {
  try {
    const sneaker = await Sneakers.findById(req.params.id);

    res.json(sneaker);
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось получить определнные кроссовки",
    });
  }
};

export const updateSneaker = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { name, description, category, brand, image, price, size, color } =
      req.body;

    const updatedSneaker = await Sneakers.findByIdAndUpdate(req.params.id, {
      name,
      description,
      category,
      brand,
      image,
      price,
      size,
      color,
    });

    if (!updatedSneaker) {
      return res.status(404).json({ message: "Кроссовка не найдена" });
    }

    res.json(updatedSneaker);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить кроссовку",
    });
  }
};

export const deleteSneaker = async (req, res) => {
  try {
    const deletedSneaker = await Sneakers.findByIdAndDelete(req.params.id);

    if (!deletedSneaker) {
      return res.status(404).json({ message: "Кроссовка не найдена" });
    }

    res.json({ message: "Кроссовка успешно удалена" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось удалить кроссовку",
    });
  }
};

export const addSneakerToWish = async (req, res) => {
  try {
    const userId = req.params.id;
    const sneakerId = req.params.sneakerId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    if (user.wish.includes(sneakerId)) {
      return res.status(400).json({ message: "Кроссовок уже в wish списке" });
    }

    user.wish.push(sneakerId);
    await user.save();

    res.json({ message: "Кроссовок добавлен в wish список", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Ошибка при добавлении в wish список" });
  }
};

export const addSneakerToCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const sneakerId = req.params.sneakerId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const cartItem = user.cart.find(
      (item) => item.sneaker.toString() === sneakerId
    );

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      user.cart.push({ sneaker: sneakerId, quantity: 1 });
    }

    await user.save();

    res.json({ message: "Кроссовок добавлен в корзину", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Ошибка при добавлении в корзину" });
  }
};
