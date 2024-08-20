// Function to create  signup controller
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);

    // Hash the password asynchronously
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "New user is created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Wrong Credentials!"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const googleSigin = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;
    const revised_name = name.split(" ").join("");
    const user = await User.findOne({ email: email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const newUser = new User({
        username: revised_name + Math.floor(Math.random() * 1000),
        email,
        password: hashedPassword,
        photo,
      });
      newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
