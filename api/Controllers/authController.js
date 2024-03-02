import { User } from "../Models/User.model.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signUp = async (req, res) => {
  const { user_name, name, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      name,
      username: user_name,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      data: `${createdUser.name} created successfully`,
    });
  } catch (err) {
    console.error(err);
  }
};

export const signIn = async (req, res, next) => {
  const { name, password } = req.body;
  const foundUser = await User.findOne({ name });
  if (!foundUser) {
    next({ message: "not found", status: 404 });
    return res.status(404).send({ success: false, message: "user not found" });
  }
  const validPassword = await bcrypt.compare(password, foundUser.password);
  if (!validPassword) {
    next({ message: "invalid credentials", status: 401 });
    return res
      .status(401)
      .json({ success: false, message: "invalid credentials" });
  }
  const token = jsonwebtoken.sign(
    { id: foundUser._id },
    process.env.JWT_ACCESS_TOKEN
  );
  const { password: pass, ...rest } = foundUser.toObject();
  res
    .cookie("access_token", token, { httpOnly: true })
    .status(200)
    .json({ success: true, data: rest });
};
