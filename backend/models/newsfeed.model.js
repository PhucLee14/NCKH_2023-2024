import mongoose from "mongoose";

const newsFeedSchema = new mongoose.Schema(
    {
        author: {
            type: String,
            require: true,
            ref: "User",
        },
        type: {
            type: String,
            require: true,
        },
        title: {
            type: String,
            require: true,
        },
        content: {
            type: String,
            require: true,
        },
        images: {
            type: Array,
        },
        comments: [
            {
                type: String,
                ref: "Comment",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const newsFeedModel = mongoose.model("newsfeed", newsFeedSchema);

export default newsFeedModel;
