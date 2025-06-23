import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

import * as UserController from "./controllers/UserController.js";
import * as OrderController from "./controllers/OrderController.js";
import * as SneakersController from "./controllers/SneakersController.js";

import checkAuth from "./utils/checkAuth.js";

const DBconnect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("DB ok");
    })
    .catch((err) => {
      console.log("DB error", err);
    });
};

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get("/getme", checkAuth, UserController.getme);
app.post("/login", UserController.login);
app.post("/register", UserController.register);

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/getOrders/:id", OrderController.getAll);
app.get("/getAllOrders", OrderController.getAllOrders);
app.post("/createOrder", checkAuth, OrderController.createOrder);

app.get("/getSneakers", SneakersController.getAll);
app.get("/getOneSneaker/:id", SneakersController.getOneSneaker);
app.get("/getWish/:id", checkAuth, SneakersController.getWish);
app.get("/getCart/:id", SneakersController.getCart);
app.delete("/deleteFromCart/:id/:sneakerId", SneakersController.deleteFromCart);
app.post("/createSneaker", checkAuth, SneakersController.createSneakers);
app.post("/addSneakerToWish/:id/:sneakerId", checkAuth, SneakersController.addSneakerToWish);
app.post("/addSneakerToCart/:id/:sneakerId", SneakersController.addSneakerToCart);
app.put("/updateSneaker/:id", checkAuth, SneakersController.updateSneaker);
app.delete("/deleteSneaker/:id", checkAuth, SneakersController.deleteSneaker);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  DBconnect();
  console.log(`Server started: ${PORT}`);
});
