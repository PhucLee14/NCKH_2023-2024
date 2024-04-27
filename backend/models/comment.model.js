import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        senderId: {
            type: String,
            required: true,
            ref: "User",
        },
        newsId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        replies: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const commentModel = mongoose.model("Comment", commentSchema);

export default commentModel;
