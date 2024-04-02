import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import newsFeedModel from "./models/newsfeed.model.js";

import connectToMongoDb from "./db/connectToMongoDB.js";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello word!");
});
app.get("/upload", (req, res) => {
    res.send("upload");
});

app.post("/upload", (req, res) => {
    newsFeedModel
        .create(req.body)
        .then((newsfeed) => res.json(newsfeed))
        .catch((err) => res.json(err));
});

app.listen(5000, () => {
    connectToMongoDb();
    console.log(`Server is running on port ${PORT}`);
});
