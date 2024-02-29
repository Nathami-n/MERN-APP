import { User } from "../Models/User.model.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  const { name, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name: name, password: hashedPassword });
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    console.error(err);
  }
};

 export const signIn = async (req, res) => {
  
 }