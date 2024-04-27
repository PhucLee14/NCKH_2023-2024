import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
    {
        senderId: {
            type: String,
            required: true,
        },
        newsId: {
            type: String,
            required: true,
        },
        image: [
            {
                type: String,
            },
        ],
        files: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const certificationModel = mongoose.model("certification", certificationSchema);

export default certificationModel;
