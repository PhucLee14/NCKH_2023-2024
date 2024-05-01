import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";
import connectToMongoDb from "./db/connectToMongoDB.js";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 5000;

app.get("/upload", (req, res) => {
  res.send("upload");
});

/**
    Apply routers
*/

const newsfeedRouter = require("./routes/feed.route.js");
const userRouter = require("./routes/user.route.js");

app.use("/newsfeed", newsfeedRouter);
app.use("/user", userRouter);

app.listen(5000, () => {
  connectToMongoDb();
  console.log(`Server is running on port ${PORT}`);
});
