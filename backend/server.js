import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import newsFeedModel from "./models/newsfeed.model.js";
import connectToMongoDb from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import certificateRoutes from "./routes/certification.routes.js";
import activityRoutes from "./routes/activity.routes.js";
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
app.use("/user", userRoutes);
app.use("/comments", commentRoutes);
app.use("/certificate", certificateRoutes);
app.use("/activity", activityRoutes);
app.use("/", newsfeed);

app.listen(5000, () => {
    connectToMongoDb();
    console.log(`Server is running on port ${PORT}`);
});
