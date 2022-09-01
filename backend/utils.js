import jwt from "jsonwebtoken";

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
        console.log(err.message);
        if (err) {
          res
            .status(401)
            .send({ message: "Invalid Token: Login again to fix the issue" });
        } else {
          res.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "No Token" });
  }
};
