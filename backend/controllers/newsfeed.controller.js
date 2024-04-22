import newsFeedModel from "../models/newsfeed.model.js";

export const getAllNewsFeed = (req, res) => {
    newsFeedModel
        .find({})
        .then((newsfeed) => res.json(newsfeed))
        .catch((err) => res.json("Error on the backend"));
};

export const getNewsFeedById = async (req, res) => {
    const id = req.params.id;
    newsFeedModel
        .findById({ _id: id })
        .then((newsfeed) => res.json(newsfeed))
        .catch((err) => res.json(err));
};

export const updateNewsFeedById = async (req, res) => {
    const id = req.params.id;
    try {
        const newsfeed = await newsFeedModel.findByIdAndUpdate(
            id,
            {
                type: req.body.type,
                title: req.body.title,
                content: req.body.content,
                images: req.body.images,
            },
            { new: true }
        );
        res.json(newsfeed);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const uploadNewsFeed = async (req, res) => {
    try {
        const newsfeed = await newsFeedModel.create(req.body);
        res.json(newsfeed);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteNewsFeedById = async (req, res) => {
    const id = req.params.id;
    newsFeedModel
        .findByIdAndDelete({
            _id: id,
        })
        .then((res) => res.json(res))
        .catch((err) => res.json(err));
};
