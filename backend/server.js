// const express = require("express");
import express from "express";
import data from "./data.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.get("/app/foods/", (req, res) => {
  res.send(data);
});

app.get("/app/get-food/:id", (req, res) => {
  let { id } = req.params;
  id = Number(id);
  let item = data.find((e) => e.id === id);
  res.send(item);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serve at http://127.0.0.1:${PORT}`);
});
