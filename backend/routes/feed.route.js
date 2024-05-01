const express = require("express");
const { default: newsFeedModel } = require("../models/newsfeed.model");
const router = express.Router();

// parent route = "/feed"

router.get("/", (req, res) => {
  newsFeedModel
    .find({})
    .then((feed) => res.json(feed))
    .catch((err) => res.json("ServerError:"));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  newsFeedModel
    .findById({ _id: id })
    .then((newsfeed) => res.json(newsfeed))
    .catch((err) => res.json(err));
});

router.post("/upload", (req, res) => {
  newsFeedModel
    .create(req.body)
    .then((newsfeed) => res.json(newsfeed))
    .catch((err) => res.json(err));
});

router.put("/update/:id", (req, res) => {
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

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  newsFeedModel
    .findByIdAndDelete({
      _id: id,
    })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

module.exports = router;
