import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
    {
        authorId: {
            type: String,
            required: true,
            ref: "User",
        },
        type: {
            type: String,
            required: true,
        },
        images: [
            {
                type: String,
            },
        ],
        files: [
            {
                type: String,
            },
        ],
        note: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const certificationModel = mongoose.model("certification", certificationSchema);

export default certificationModel;
