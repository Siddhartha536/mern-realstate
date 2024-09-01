import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const updateUserInfo = async (req, res, next) => {
  console.log("on update user info function", req.user.id);

  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can update only your account"));
  }

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          photo: req.body.photo,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUserInfo = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can delete only your account"));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "null" });
  } catch (error) {
    next(error);
  }
};
