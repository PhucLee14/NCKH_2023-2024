import User from "../models/user.model.js";

export const getAllUser = async (req, res) => {
    await User.find({})
        .then((user) => res.json(user))
        .catch((err) => res.json("Error on the backend"));
};
