import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  console.log("At the verify token", req.user);
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) return next(errorHandler(401, "You are not authorized"));

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return next(errorHandler(403, "Token is not valid"));
  }
};
