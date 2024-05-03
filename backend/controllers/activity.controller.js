import activityModel from "../models/activity.model.js";

export const getAllActivity = async (req, res) => {
    await activityModel
        .find({})
        .then((activity) => res.json(activity))
        .catch((err) => res.json("Error on the backend"));
};

export const createActivity = async (req, res) => {
    try {
        const activity = await activityModel.create(req.body);
        res.json(activity);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getActivityById = async (req, res) => {
    const { type } = req.params;
    await activityModel
        .find({ activityCode: type })
        .then((activity) => res.json(activity))
        .catch((err) => res.json(err));
};
