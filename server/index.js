import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import listingRoutes from "./routes/listing.routes.js";
import cookieParser from "cookie-parser";
import path from "path";
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


  // create dynamic path 
  const __dirname = path.resolve();


const app = express();
app.listen(3000, () => {
  console.log(
    "Server is running on http://localhost:3000 Backend tested sucessfully"
  );
});

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/listing", listingRoutes);


// static folder
app.use(express.static(path.join(__dirname, "/client/dist")));
aap.get("*", (req , res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

// Middleware to handle errors
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  res.status(statusCode).json({ sucess: false, statusCode, message });
});
