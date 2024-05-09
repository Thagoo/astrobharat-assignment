import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import astrologerRoute from "./routes/astrologer";
// ENV
dotenv.config();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

// MongoDB connection
mongoose
  .connect(MONGODB_URL as string)
  .then((response) => {
    console.log("mongodb connection successfull ");
  })
  .catch((err) => {
    console.log("mongodb connection failed", err);
  });

mongoose.connection.on("disconnected" as string | "error" as string, (err) => {
  console.log(err);
});

const app = express();
app.use(express.json());

app.use("/api/astrologers", astrologerRoute);

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});