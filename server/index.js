import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const app = express();
app.listen(3000, () => {
  console.log(
    "Server is running on http://localhost:3000 Backend tested sucessfully"
  );
});
