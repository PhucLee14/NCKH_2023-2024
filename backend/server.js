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

app.get("/newsfeed", (req, res) => {
    newsFeedModel
        .find({})
        .then((newsfeed) => res.json(newsfeed))
        .catch((err) => res.json("loi ben backend"));
});

app.get("/upload", (req, res) => {
    res.send("upload");
});

app.get("/getNews/:id", (req, res) => {
    const id = req.params.id;
    newsFeedModel
        .findById({ _id: id })
        .then((newsfeed) => res.json(newsfeed))
        .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
    const id = req.params.id;
    newsFeedModel
        .findByIdAndUpdate(
            { _id: id },
            {
                type: req.body.type,
                title: req.body.title,
                content: req.body.content,
                images: req.body.images,
            }
        )
        .then((newsfeed) => res.json(newsfeed))
        .catch((err) => res.json(err));
});

app.post("/upload", (req, res) => {
    newsFeedModel
        .create(req.body)
        .then((newsfeed) => res.json(newsfeed))
        .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    newsFeedModel
        .findByIdAndDelete({
            _id: id,
        })
        .then((res) => res.json(res))
        .catch((err) => res.json(err));
});

app.listen(5000, () => {
    connectToMongoDb();
    console.log(`Server is running on port ${PORT}`);
});
