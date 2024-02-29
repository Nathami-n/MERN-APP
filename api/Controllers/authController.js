import { User } from "../Models/User.model.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name: name, password: hashedPassword });
  res.status(201).json({ success: true, data: user });
};

export const signIn = async (req, res, next) => {
  const { name, password } = req.body;
  const foundUser = await User.findOne({ name });
  if (!foundUser) return next({ message: "User not found", status: 404 });
  const validPassord = await bcrypt.compare(password, foundUser.password);
  if (!validPassord) return next({ message: "Inavalid Credentials", status: 401 });
  const token = jsonwebtoken.sign({id:foundUser._id}, process.env.JWT_ACCESS_TOKEN);
  res.cookie('access_token', token, {httpOnly:true}).status(200).json({success:true, data:foundUser})

};
