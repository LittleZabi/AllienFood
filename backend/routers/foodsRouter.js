import express from "express";
import Foods from "../models/foodsModel.js";
import data from "../data.js";
import expressAsyncHandler from "express-async-handler";
const foodsRouter = express.Router();
foodsRouter.get(
  "/seed123",
  expressAsyncHandler(async (req, res) => {
    await Foods.remove({});
    const createFoods = await Foods.insertMany(data);
    res.send({ foods: createFoods });
  })
);
foodsRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const items = await Foods.find({});
    res.send(items);
  })
);
foodsRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const item = await Foods.findById(req.params.id);

    if (item) {
      res.send(item);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);
export default foodsRouter;
