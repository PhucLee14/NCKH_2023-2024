import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
    {
        authorId: {
            type: String,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        name: {
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
        status: {
            type: String,
            enum: ["approved", "pending", "rejected"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const certificationModel = mongoose.model("certification", certificationSchema);

export default certificationModel;
