import express from "express";
import User from "../models/userModels.js";
// import users from "../users.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generateToken, storage, isAuth } from "../utils.js";
import multer from "multer";
import fs from "fs";
import { MEDIA_ACCESS, MEDIA_STORE } from "./../constants.js";
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
          avatar: user.avatar,
          address: user.address,
          phone: user.phone,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);
const upload = multer({ storage: storage });
userRouter.post(
  "/signup",
  upload.single("avatar"),
  expressAsyncHandler(async (req, res) => {
    try {
      const chckUserExistence = await User.findOne({ email: req.body.email });
      if (chckUserExistence) {
        if (req.file && req.file.path) {
          fs.unlink(req.file.path, (err) => {
            console.log("error on deleting file: ", err);
          });
        }
        throw "Email address is already register use this to login or use another email address.";
      }
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.pass, 8),
        avatar:
          req.file && req.file.filename
            ? MEDIA_ACCESS + "users/" + req.file.filename
            : "",
        address: req.body.address,
        phone: req.body.phone,
      });
      const createdUser = await user.save();
      res.send({
        _id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        avatar: createdUser.avatar,
        address: createdUser.address,
        phone: createdUser.phone,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser),
      });
    } catch (error) {
      let er = error.message ? error.message : error;
      console.log("message: ", er);
      res.send({ message: er });
    }
  })
);
userRouter.post(
  "/update",
  isAuth,
  upload.single("avatar"),
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.body._id);
      if (user) {
        if (req.file && req.file.filename) {
          if (req.body.old_avatar) {
            let old_file = req.body.old_avatar.split("/");
            old_file = old_file[old_file.length - 1];
            fs.unlink(MEDIA_STORE + "/users/" + old_file, (err) => {
              console.log("error on deleting file: ", err);
            });
          }
        }
        user.name = req.body.name || user.name;
        user.phone = req.body.phone || user.phone;
        user.address = req.body.address || user.address;
        user.avatar =
          req.file && req.file.filename
            ? MEDIA_ACCESS + "users/" + req.file.filename
            : user.avatar;
        const updatedUser = await user.save();
        res.send({
          _id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          avatar: updatedUser.avatar,
          address: updatedUser.address,
          phone: updatedUser.phone,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(updatedUser),
        });
      }
    } catch (error) {
      let er = error.message ? error.message : error;
      console.log("message: ", er);
      res.send({ message: er });
    }
  })
);
export default userRouter;
