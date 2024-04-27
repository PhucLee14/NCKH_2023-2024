import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import newsFeedModel from "./models/newsfeed.model.js";
import connectToMongoDb from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import newsfeed from "./routes/newsfeed.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello word!");
});

app.use("/api/auth", authRoutes);
app.use("/comments", commentRoutes);
app.use("/", newsfeed);

app.listen(5000, () => {
    connectToMongoDb();
    console.log(`Server is running on port ${PORT}`);
});
