import express from "express";
import User from "../models/userModels.js";
// import users from "../users.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";
const userRouter = express.Router();

// userRouter.get(
//   "/seed",
//   expressAsyncHandler(async (req, res) => {
//     const createdUsers = await User.insertMany(users);
//     res.send({ createdUsers });
//   })
// );
userRouter.get(
  "/all",
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send({ users });
  })
);
userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);
userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.pass, 8),
      });
      const createdUser = await user.save();
      res.send({
        _id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser),
      });
    } catch (error) {
      res.send({ message: error.message });
    }
  })
);
export default userRouter;
