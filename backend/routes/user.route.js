const express = require("express");
const router = express.Router();
const { default: model } = require("../models/user.model");

router.get("/", (req, res) => {
  model
    .find({})
    .then((feed) => res.json(feed))
    .catch((err) => res.json("ServerError:"));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  model
    .findById({ _id: id })
    .then((newsfeed) => res.json(newsfeed))
    .catch((err) => res.json(err));
});

router.put("/update/:id", (req, res) => {
  const id = req.params.id;
  model
    .findByIdAndUpdate(
      { _id: id },
      {
        userName: req.body.type,
        fullName: req.body.title,
        password: req.body.content,
        profilePicture: req.body.images,
      }
    )
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

module.exports = router;
