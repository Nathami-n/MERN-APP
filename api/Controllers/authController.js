import { User } from "../Models/User.model.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signUp = async (req, res) => {
  const { name, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({ name: name, password: hashedPassword });
    res.status(201).json({ success: true, data: createdUser });
  } catch (err) {
    console.error(err);
  }
};

export const signIn = async (req, res) => {
  const { name, password } = req.body;
  const foundUser = await User.findOne({ name });
  if (!foundUser) return;
  const validPassord = await bcrypt.compare(password, foundUser.password);
  if (!validPassord) return;
  const token = jsonwebtoken.sign(
    { id: foundUser._id },
    process.env.JWT_ACCESS_TOKEN
  );
  res
    .cookie("access_token", token, { httpOnly: true })
    .status(200)
    .json({ success: true, data: foundUser });
};
