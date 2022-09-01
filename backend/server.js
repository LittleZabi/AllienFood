// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import foodsRouter from "./routers/foodsRouter.js";
import orderRouter from "./routers/orderRouter.js";
dotenv.config();
const app = express();
mongoose.connect("mongodb://localhost/alienfood", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/app/users", userRouter);
app.use("/app/foods", foodsRouter);
app.use("/app/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Server is working");
});
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serve at http://127.0.0.1:${PORT}`);
});
