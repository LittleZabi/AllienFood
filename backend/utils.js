import jwt from "jsonwebtoken";
import multer from "multer";
import { MEDIA_STORE } from "./constants.js";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "defaultsecret",
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // auth like: Bearer xxxxxx
    jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultsecret",
      (err, decode) => {
        if (err) {
          res
            .status(401)
            .send({ message: "Invalid Token: Login again to fix the issue" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, MEDIA_STORE + "/users/");
  },
  filename: function (req, file, cb) {
    let extension = file.originalname.split(".");
    extension = extension[extension.length - 1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});
