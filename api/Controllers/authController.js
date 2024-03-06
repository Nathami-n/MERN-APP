import { User } from "../Models/User.model.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signUp = async (req, res) => {
  const { user_name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      email,
      username: user_name,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      data: `${createdUser.username} created successfully`,
    });
  } catch (err) {
    console.error(err);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    next({ message: "not found", status: 404 });
    return res.status(404).json({ success: false, message: "user not found" });
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
export const googleAuthentication = async (req, res, next) => {
  const { email, avatar, userName } = req.body;
  try {
    const isUserFound = await User.findOne({ email });
    if (isUserFound) {
      const token = jsonwebtoken.sign(
        { id: isUserFound._id },
        process.env.JWT_ACCESS_TOKEN
      );
      const { password: pass, ...rest } = isUserFound.toObject();
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ success: true, data: rest });
    } else {
      const generatedPassword = Math.random().toString(36).toLowerCase();
      const hashedGeneratedPassword = await bcrypt.hash(generatedPassword, 10);
      const name =
        userName.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);
      const postUser = await User.create({
        username: name,
        email,
        password: hashedGeneratedPassword,
        avatarUrl: avatar,
      });
      const webtoken = jsonwebtoken.sign(
        { id: postUser._id },
        process.env.JWT_ACCESS_TOKEN
      );
      const { password: pass, ...rest } = postUser.toObject();
      res
        .cookie("access_token", webtoken, { httpOnly: true })
        .status(201)
        .json({ success: true, data: rest });
    }
  } catch (e) {
    next({ message: " Internal error", status: 500 });
  }
};

export const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const updateUser = req.body;
  const { password: usrpass, ...rest } = updateUser;
  const userHash = await bcrypt.hash(usrpass, 10);
  const dbUserUpdateData = { rest, password: userHash };
  try {
    const newUpdatedUser = await User.findOneAndUpdate(
      { _id: userId },
      dbUserUpdateData
    );
    const { password: dbPass, ...rest} = newUpdatedUser.toObject();
    res.status(200).json({ success: true, data: rest });
  } catch (err) {
    next(err);
  }
};
