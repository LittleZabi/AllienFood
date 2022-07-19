import bcrypt from "bcryptjs";
const users = [
  {
    name: "LittleZabi",
    email: "admin@example.com",
    password: bcrypt.hashSync("123123", 8),
    isAdmin: true,
  },
  {
    name: "John",
    email: "jhon@example.com",
    password: bcrypt.hashSync("123123", 8),
    isAdmin: false,
  },
];
export default users;
