import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const Authenticated = async (req, res, next) => {
  const token = req.header("Auth");

  if (!token) return res.json({ message: "Login first" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const id = decoded.userId;

  let user = await User.findById(id);

  if (!user) return res.json({ message: "User not exist" });

  req.user = user;
  next();

  // console.log(decoded)
};
