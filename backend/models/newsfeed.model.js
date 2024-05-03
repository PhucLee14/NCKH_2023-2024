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
        },
        name: {
            type: String,
            require: true,
            // ref: "activity",
        },
        title: {
            type: String,
            require: true,
        },
        content: {
            type: String,
            require: true,
        },
        images: [
            {
                type: Array,
            },
        ],
        comments: [
            {
                type: String,
                ref: "Comment",
            },
        ],
        status: {
            type: String,
            enum: ["approve", "pending", "reject"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const newsFeedModel = mongoose.model("newsfeed", newsFeedSchema);

export default newsFeedModel;
