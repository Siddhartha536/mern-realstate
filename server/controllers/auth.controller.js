// Function to create  signup controller
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
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
