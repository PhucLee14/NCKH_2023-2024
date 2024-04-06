import mongoose from "mongoose";

const newsFeedSchema = new mongoose.Schema(
    {
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
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const newsFeedModel = mongoose.model("newsfeed", newsFeedSchema);

export default newsFeedModel;
